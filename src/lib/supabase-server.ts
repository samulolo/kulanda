import { createClient } from "@supabase/supabase-js";

// Este ficheiro só deve ser importado a partir de Server Components, Route
// Handlers ou Server Actions — nunca a partir de um ficheiro "use client".
if (typeof window !== "undefined") {
  throw new Error(
    "src/lib/supabase-server.ts foi importado no browser. Isto não deve acontecer."
  );
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase não está configurado: defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY em .env.local."
  );
}

// Usa a chave pública (anon/publishable): as tabelas do catálogo têm RLS
// ativo com leitura pública (ver supabase/migrations), por isso não é
// necessária a service_role key só para ler produtos.
export const supabaseServer = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});
