-- Kulanda — encomendas
-- Guarda o que foi pago na Stripe (webhook checkout.session.completed) para
-- termos histórico de encomendas e podermos enviar a confirmação por e-mail.
--
-- IMPORTANTE: estas tabelas têm dados pessoais (nome, e-mail, morada de
-- entrega). RLS fica ativo SEM nenhuma política — ou seja, nem a chave
-- anon/publishable consegue ler ou escrever aqui. Só a service_role key
-- (usada apenas no webhook, nunca no browser) consegue aceder, porque essa
-- chave ignora RLS.

create table orders (
  id                          uuid primary key default gen_random_uuid(),
  stripe_session_id           text not null unique,
  reference                   text not null, -- código curto mostrado ao cliente (#XXXXXXXX)
  email                       text not null,
  customer_name               text,
  shipping_address            jsonb,
  subtotal                    numeric(10,2) not null,
  shipping_fee                numeric(10,2) not null default 0,
  discount                    numeric(10,2) not null default 0,
  total                       numeric(10,2) not null,
  currency                    text not null default 'eur',
  cupom                       text,
  status                      text not null default 'paid', -- paid | fulfilled | cancelled | refunded
  confirmation_email_sent_at  timestamptz,
  created_at                  timestamptz not null default now(),
  updated_at                  timestamptz not null default now()
);

create index idx_orders_email on orders(email);

create table order_items (
  id            uuid primary key default gen_random_uuid(),
  order_id      uuid not null references orders(id) on delete cascade,
  product_slug  text not null,
  name          text not null,
  unit_price    numeric(10,2) not null,
  quantity      integer not null,
  line_total    numeric(10,2) not null,
  created_at    timestamptz not null default now()
);

create index idx_order_items_order_id on order_items(order_id);

create trigger trg_orders_updated_at
  before update on orders
  for each row execute function set_updated_at();

alter table orders enable row level security;
alter table order_items enable row level security;
-- (sem "create policy" propositadamente — leitura e escrita só via service_role)
