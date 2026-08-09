import { createClient } from "@supabase/supabase-js";

// Cliente com a service_role key — ignora RLS. Só deve ser usado em sítios
// de total confiança e nunca expostos ao cliente: hoje só o webhook da
// Stripe (para gravar encomendas, que têm dados pessoais e RLS sem
// políticas de leitura pública). Nunca importar isto num "use client".
if (typeof window !== "undefined") {
  throw new Error(
    "src/lib/supabase-admin.ts foi importado no browser. Isto não deve acontecer."
  );
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Supabase (admin) não está configurado: defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY em .env.local."
  );
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});
