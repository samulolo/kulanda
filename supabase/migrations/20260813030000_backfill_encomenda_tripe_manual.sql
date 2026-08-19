-- Backfill manual de uma encomenda real que se perdeu por causa do bug do
-- webhook (coluna "phone" em falta na tabela orders antes desta sessão —
-- ver 20260812000000_orders_add_phone.sql). O pagamento foi confirmado na
-- Stripe mas a gravação da encomenda falhou silenciosamente, por isso
-- nunca ficou registada nem o e-mail de confirmação automático saiu.
--
-- stripe_session_id é um valor manual (não é uma sessão real da Stripe) só
-- para satisfazer a coluna "not null unique" — se tiveres o ID real da
-- sessão no dashboard da Stripe, diz-me para corrigir.
with novo_pedido as (
  insert into orders (
    stripe_session_id, reference, email, customer_name, shipping_address,
    subtotal, shipping_fee, discount, total, currency, status,
    confirmation_email_sent_at
  )
  values (
    'manual_kambolongunga_tripe_01',
    'MANUAL01',
    'kambolongunga@gmail.com',
    null,
    null,
    18.96, 0, 0, 18.96, 'eur', 'paid',
    now()
  )
  returning id
)
insert into order_items (order_id, product_slug, name, unit_price, quantity, line_total)
select id, 'kit-content-creator-tripe-selfie-stick',
  'Kit Content Creator - Tripé Selfie Stick com Luz e Controlo Remoto',
  18.96, 1, 18.96
from novo_pedido;
