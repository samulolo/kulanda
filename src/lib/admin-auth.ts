// Autenticação simples da área /admin — uma password única (ADMIN_PASSWORD),
// sem utilizadores nem base de dados própria. O cookie de sessão guarda um
// hash SHA-256 da password (nunca a password em texto simples), calculado
// com Web Crypto (disponível tanto no runtime Node como no Edge, usado
// pelo middleware).

export const ADMIN_SESSION_COOKIE = "kulanda_admin_session";

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Token esperado no cookie de sessão, derivado da ADMIN_PASSWORD atual.
 * Devolve null se a variável de ambiente não estiver configurada — nesse
 * caso a área /admin fica inacessível (falha fechada, não aberta). */
export async function getExpectedAdminSessionToken(): Promise<string | null> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return sha256Hex(`kulanda-admin-session:${password}`);
}
