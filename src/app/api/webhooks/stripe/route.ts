import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { getProductBySlug } from "@/lib/products";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { resend, RESEND_FROM_EMAIL, ADMIN_NOTIFICATION_EMAIL } from "@/lib/resend";
import {
  orderConfirmationSubject,
  renderOrderConfirmationEmail,
} from "@/lib/emails/order-confirmation";
import {
  adminNotificationSubject,
  renderAdminNotificationEmail,
} from "@/lib/emails/admin-notification";

export const runtime = "nodejs";

// Endpoint para eventos assíncronos da Stripe (confirmação final de
// pagamento). Configure em https://dashboard.stripe.com/test/webhooks
// apontando para <o-seu-dominio>/api/webhooks/stripe e copie o "Signing
// secret" para STRIPE_WEBHOOK_SECRET em .env.local.
export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get("stripe-signature");
  const payload = await req.text();

  if (!webhookSecret || !signature) {
    console.warn("[stripe] Webhook recebido sem STRIPE_WEBHOOK_SECRET configurado.");
    return NextResponse.json({ error: "Webhook não configurado." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    console.error("[stripe] Assinatura de webhook inválida:", error);
    return NextResponse.json({ error: "Assinatura inválida." }, { status: 400 });
  }

  switch (event.type) {
    // "completed" dispara assim que o cliente termina o checkout — para
    // métodos síncronos (cartão) já vem com o pagamento confirmado, mas
    // para métodos assíncronos (ex.: MB WAY) pode vir com payment_status
    // "unpaid" enquanto aguarda a confirmação no telemóvel do cliente.
    case "checkout.session.completed":
    // "async_payment_succeeded" é o evento que confirma mesmo o pagamento
    // nesses casos assíncronos — é aqui que o MB WAY normalmente conclui.
    case "checkout.session.async_payment_succeeded": {
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
      break;
    }
    case "checkout.session.async_payment_failed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.warn(`[stripe] Pagamento assíncrono falhou para a sessão ${session.id}.`);
      break;
    }
    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(`[stripe] Sessão ${session.id} expirou sem pagamento — nada a fazer.`);
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(sessionFromEvent: Stripe.Checkout.Session) {
  // Voltamos a pedir a sessão à Stripe (em vez de confiar só no payload do
  // webhook) para termos a morada de entrega e os dados do cliente completos.
  const session = await stripe.checkout.sessions.retrieve(sessionFromEvent.id);

  // Proteção essencial para métodos de pagamento assíncronos (MB WAY):
  // "completed" pode disparar antes da confirmação real do pagamento. Só
  // gravamos a encomenda quando a Stripe confirma que o dinheiro entrou —
  // caso contrário aguardamos o evento async_payment_succeeded, que volta
  // a chamar esta mesma função já com payment_status "paid".
  if (session.payment_status !== "paid") {
    console.log(`[stripe] Sessão ${session.id} ainda não paga (status: ${session.payment_status}) — a aguardar confirmação.`);
    return;
  }

  const reference = session.id.replace("cs_", "").slice(-8).toUpperCase();
  const email = session.customer_details?.email;

  if (!email) {
    console.error(`[stripe] Sessão ${session.id} concluída sem e-mail — a ignorar.`);
    return;
  }

  const shipping = session.collected_information?.shipping_details;
  const shippingAddress = shipping?.address ?? session.customer_details?.address ?? null;
  const customerName = shipping?.name ?? session.customer_details?.name ?? null;

  const itemTokens = reconstructItemTokens(session.metadata);
  const items = await resolveOrderItems(itemTokens);

  if (items.length === 0) {
    console.error(`[stripe] Sessão ${session.id} sem itens reconhecíveis — a ignorar.`);
    return;
  }

  const subtotal = (session.amount_subtotal ?? 0) / 100;
  const total = (session.amount_total ?? 0) / 100;
  const shippingFee = (session.shipping_cost?.amount_total ?? session.total_details?.amount_shipping ?? 0) / 100;
  const discount = (session.total_details?.amount_discount ?? 0) / 100;
  const currency = session.currency ?? "eur";
  const cupom = session.metadata?.cupom || null;

  const { data: order, error: orderError } = await supabaseAdmin
    .from("orders")
    .insert({
      stripe_session_id: session.id,
      reference,
      email,
      customer_name: customerName,
      shipping_address: shippingAddress,
      subtotal,
      shipping_fee: shippingFee,
      discount,
      total,
      currency,
      cupom,
      status: "paid",
    })
    .select("id")
    .single();

  if (orderError) {
    // 23505 = violação de unicidade — a Stripe reenviou o mesmo evento
    // (é normal, retries) e a encomenda já tinha sido gravada.
    if (orderError.code === "23505") {
      console.log(`[stripe] Sessão ${session.id} já tinha sido processada — a ignorar.`);
      return;
    }
    console.error(`[stripe] Erro ao gravar encomenda ${session.id}:`, orderError.message);
    return;
  }

  const { error: itemsError } = await supabaseAdmin.from("order_items").insert(
    items.map((item) => ({
      order_id: order.id,
      product_slug: item.slug,
      name: item.name,
      unit_price: item.unitPrice,
      quantity: item.quantity,
      line_total: item.lineTotal,
    }))
  );

  if (itemsError) {
    console.error(`[stripe] Erro ao gravar itens da encomenda ${session.id}:`, itemsError.message);
  }

  await sendConfirmationEmail({
    orderId: order.id,
    email,
    reference,
    customerName,
    items,
    subtotal,
    shippingFee,
    discount,
    total,
    shippingAddress,
  });

  await sendAdminNotification({
    email,
    reference,
    customerName,
    items,
    total,
    shippingAddress,
  });
}

function reconstructItemTokens(metadata: Stripe.Metadata | null): string[] {
  if (!metadata) return [];

  const chunks: string[] = [];
  for (let i = 0; metadata[`items_${i}`] !== undefined; i++) {
    chunks.push(metadata[`items_${i}`]);
  }

  const joined = chunks.join("");
  if (!joined) return [];

  return joined.split("|").filter(Boolean);
}

async function resolveOrderItems(tokens: string[]) {
  const items: {
    slug: string;
    name: string;
    unitPrice: number;
    quantity: number;
    lineTotal: number;
  }[] = [];

  for (const token of tokens) {
    const [slug, quantityRaw] = token.split(":");
    const quantity = Number(quantityRaw) || 1;
    const produto = await getProductBySlug(slug);

    if (!produto) {
      console.warn(`[stripe] Produto "${slug}" não encontrado ao gravar a encomenda.`);
      continue;
    }

    items.push({
      slug: produto.slug,
      name: produto.name,
      unitPrice: produto.price,
      quantity,
      lineTotal: Math.round(produto.price * quantity * 100) / 100,
    });
  }

  return items;
}

async function sendConfirmationEmail(params: {
  orderId: string;
  email: string;
  reference: string;
  customerName: string | null;
  items: { name: string; quantity: number; lineTotal: number }[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  shippingAddress: Stripe.Address | null;
}) {
  if (!resend) {
    console.warn(
      "[resend] RESEND_API_KEY não configurada — a encomenda foi gravada mas o e-mail de confirmação não foi enviado."
    );
    return;
  }

  try {
    await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: params.email,
      subject: orderConfirmationSubject(params.reference),
      html: renderOrderConfirmationEmail({
        reference: params.reference,
        customerName: params.customerName,
        items: params.items,
        subtotal: params.subtotal,
        shippingFee: params.shippingFee,
        discount: params.discount,
        total: params.total,
        shippingAddress: params.shippingAddress,
      }),
    });

    await supabaseAdmin
      .from("orders")
      .update({ confirmation_email_sent_at: new Date().toISOString() })
      .eq("id", params.orderId);
  } catch (error) {
    console.error(`[resend] Falha ao enviar e-mail de confirmação (encomenda ${params.orderId}):`, error);
  }
}

async function sendAdminNotification(params: {
  email: string;
  reference: string;
  customerName: string | null;
  items: { name: string; quantity: number; lineTotal: number }[];
  total: number;
  shippingAddress: Stripe.Address | null;
}) {
  if (!resend) {
    console.warn(
      "[resend] RESEND_API_KEY não configurada — notificação interna de nova encomenda não enviada."
    );
    return;
  }

  try {
    await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: ADMIN_NOTIFICATION_EMAIL,
      subject: adminNotificationSubject(params.reference),
      html: renderAdminNotificationEmail({
        reference: params.reference,
        email: params.email,
        customerName: params.customerName,
        items: params.items,
        total: params.total,
        shippingAddress: params.shippingAddress,
      }),
    });
  } catch (error) {
    console.error(`[resend] Falha ao enviar notificação interna (encomenda ${params.reference}):`, error);
  }
}
