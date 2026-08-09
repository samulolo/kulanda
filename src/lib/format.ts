// Utilitário puro, sem dependências de servidor — seguro para importar em
// componentes "use client" (ao contrário de products.ts, que fala com o
// Supabase e só pode ser usado no servidor).
export function formatPrice(value: number): string {
  return value.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
}
