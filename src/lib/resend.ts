import { Resend } from "resend";

// undefined em vez de rebentar já no import — o webhook decide o que fazer
// (regista e segue em frente) se a chave não estiver configurada, tal como
// já acontece com o STRIPE_SECRET_KEY.
export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// "onboarding@resend.dev" só funciona em modo de testes (entrega-se só à
// própria conta Resend). Definir RESEND_FROM_EMAIL com um domínio
// verificado no dashboard do Resend antes de ir para produção.
export const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "Kulanda <onboarding@resend.dev>";

// Endereço que recebe a notificação interna de "nova encomenda". Por
// omissão usa o e-mail do dono da loja; defina ADMIN_NOTIFICATION_EMAIL em
// .env.local para mudar (ou uma lista separada por vírgulas).
export const ADMIN_NOTIFICATION_EMAIL =
  process.env.ADMIN_NOTIFICATION_EMAIL ?? "eliseusamulolo@gmail.com";
