import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

// Endpoint para eventos assíncronos da Stripe (ex: confirmação final de pagamento).
// Configure em https://dashboard.stripe.com/test/webhooks apontando para
// <o-seu-dominio>/api/webhooks/stripe e copie o "Signing secret" para
// STRIPE_WEBHOOK_SECRET em .env.local.
//
// Nota: esta loja ainda não tem base de dados própria, por isso este endpoint
// apenas regista os eventos. Para persistir encomendas (ex: guardar em BD e
// enviar e-mail de confirmação), adicione essa lógica no case abaixo.
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
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(
        `[stripe] Pagamento concluído — sessão ${session.id}, total ${session.amount_total} ${session.currency}`
      );
      // TODO: persistir a encomenda numa base de dados e enviar e-mail de confirmação.
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
