import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export const runtime = "nodejs";

// Chamado pelo cron do Vercel (ver vercel.json) uma vez por dia, só para
// manter o projeto Supabase "acordado" — o plano gratuito pausa projetos
// ao fim de 7 dias sem qualquer pedido à API.
export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }
  }

  // Leitura leve e pública (RLS de leitura pública em categories) — não
  // precisa da service_role key só para isto.
  const { error } = await supabaseServer.from("categories").select("id").limit(1);

  if (error) {
    console.error("[cron] Falha ao pingar o Supabase:", error.message);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, timestamp: new Date().toISOString() });
}
