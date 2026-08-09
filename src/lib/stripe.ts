import Stripe from "stripe";

// A chave secreta vive apenas no servidor (nunca prefixada com NEXT_PUBLIC_).
// Configure-a em .env.local — veja .env.example para o formato esperado.
const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey && process.env.NODE_ENV !== "production") {
  console.warn(
    "[stripe] STRIPE_SECRET_KEY não está definida. Copie .env.example para .env.local e adicione a sua chave de teste (sk_test_...) para ativar os pagamentos."
  );
}

export const stripe = new Stripe(secretKey ?? "sk_test_placeholder");
