import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { getProductBySlug } from "@/lib/products";

export const runtime = "nodejs";

const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_FEE_CENTS = 490;

const CUPOES: Record<string, { tipo: "percentagem" | "envio-gratis"; percentOff?: number }> = {
  BEMVINDO10: { tipo: "percentagem", percentOff: 10 },
  FRETEGRATIS: { tipo: "envio-gratis" },
};

interface CarrinhoItemInput {
  slug: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      {
        error:
          "A loja ainda não tem uma chave Stripe configurada. Adicione STRIPE_SECRET_KEY em .env.local.",
      },
      { status: 500 }
    );
  }

  let body: { items?: CarrinhoItemInput[]; cupom?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }

  const itemsInput = Array.isArray(body.items) ? body.items : [];
  if (itemsInput.length === 0) {
    return NextResponse.json({ error: "O carrinho está vazio." }, { status: 400 });
  }

  // Nunca confiar em preços vindos do cliente — recalcula tudo a partir do catálogo.
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  let subtotalCents = 0;
  const origin = new URL(req.url).origin;

  for (const raw of itemsInput) {
    const produto = getProductBySlug(raw?.slug ?? "");
    if (!produto) continue;

    const minimo = produto.minQuantity ?? 1;
    const quantidade = Math.max(
      minimo,
      Math.min(Math.floor(raw.quantity || minimo), produto.stock)
    );
    const unitAmount = Math.round(produto.price * 100);
    subtotalCents += unitAmount * quantidade;

    line_items.push({
      price_data: {
        currency: "eur",
        product_data: {
          name: produto.name,
          images: produto.image ? [`${origin}${produto.image}`] : undefined,
        },
        unit_amount: unitAmount,
      },
      quantity: quantidade,
    });
  }

  if (line_items.length === 0) {
    return NextResponse.json({ error: "Nenhum produto válido no carrinho." }, { status: 400 });
  }

  const codigoCupom = body.cupom?.trim().toUpperCase();
  const cupom = codigoCupom ? CUPOES[codigoCupom] : undefined;

  const envioGratis =
    subtotalCents >= FREE_SHIPPING_THRESHOLD * 100 || cupom?.tipo === "envio-gratis";

  const shipping_options: Stripe.Checkout.SessionCreateParams.ShippingOption[] = [
    {
      shipping_rate_data: {
        type: "fixed_amount",
        fixed_amount: { amount: envioGratis ? 0 : SHIPPING_FEE_CENTS, currency: "eur" },
        display_name: envioGratis ? "Envio grátis" : "Portes de envio",
      },
    },
  ];

  let discounts: Stripe.Checkout.SessionCreateParams.Discount[] | undefined;
  if (cupom?.tipo === "percentagem" && cupom.percentOff) {
    const coupon = await stripe.coupons.create({
      percent_off: cupom.percentOff,
      duration: "once",
      name: `Cupão ${codigoCupom}`,
    });
    discounts = [{ coupon: coupon.id }];
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // MB WAY só está disponível para pagamentos em EUR — todos os preços
      // desta loja já são em euros, por isso é seguro incluir sempre.
      payment_method_types: ["card", "mb_way"],
      line_items,
      shipping_options,
      discounts,
      customer_email: body.email || undefined,
      shipping_address_collection: { allowed_countries: ["PT", "ES"] },
      locale: "pt",
      success_url: `${origin}/checkout/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[stripe] Erro ao criar sessão de checkout:", error);
    return NextResponse.json(
      { error: "Não foi possível iniciar o pagamento. Tente novamente." },
      { status: 500 }
    );
  }
}
