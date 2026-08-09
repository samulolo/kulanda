import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "session_id em falta." }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Devolve apenas os campos necessários para a página de confirmação —
    // nunca expor o objeto completo da sessão ao cliente.
    return NextResponse.json({
      status: session.payment_status,
      amountTotal: session.amount_total,
      currency: session.currency,
      email: session.customer_details?.email ?? null,
      reference: session.id.replace("cs_", "").slice(-8).toUpperCase(),
    });
  } catch (error) {
    console.error("[stripe] Erro ao consultar sessão:", error);
    return NextResponse.json({ error: "Sessão não encontrada." }, { status: 404 });
  }
}
