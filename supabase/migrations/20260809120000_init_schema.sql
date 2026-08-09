-- Kulanda — schema inicial
-- categories, products, detalhes_produto, product_files
-- Nota: nomes de tabelas/colunas em snake_case minúsculo para evitar
-- dores de cabeça com identificadores case-sensitive no Postgres.

create extension if not exists "pgcrypto";

-- ── categories ──────────────────────────────────────────────
create table categories (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  slug       text not null unique, -- ex: 'gloss', 'tripes' (usado em /produtos?categoria=)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── products ────────────────────────────────────────────────
create table products (
  id                uuid primary key default gen_random_uuid(),
  category_id       uuid not null references categories(id) on delete restrict,
  slug              text not null unique,
  name              text not null,
  price             numeric(10,2) not null,
  compare_at_price  numeric(10,2),
  description       text not null default '',
  features          text[] not null default '{}',
  badge             text,
  min_quantity      integer not null default 1,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index idx_products_category_id on products(category_id);

-- ── detalhes_produto (variantes: cor / tamanho / material) ──
create table detalhes_produto (
  id         uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  cor        text,        -- hex, ex: '#6b7280'
  cor_label  text,        -- nome curto da cor, ex: 'Lilás'
  tamanho    text,
  material   text[] not null default '{}',
  badge      text,        -- opcional: sobrepõe products.badge para esta variante
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_detalhes_produto_product_id on detalhes_produto(product_id);

-- ── product_files (imagens e vídeos, galeria ordenada) ───────
create table product_files (
  id                  uuid primary key default gen_random_uuid(),
  product_id          uuid not null references products(id) on delete cascade,
  detalhe_produto_id  uuid references detalhes_produto(id) on delete cascade, -- null = pertence ao produto todo (não a uma variante específica)
  url                 text not null,
  type                text not null check (type in ('image', 'video')),
  position            integer not null default 0,
  video_title         text, -- só relevante quando type = 'video'
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index idx_product_files_product_id on product_files(product_id);
create index idx_product_files_detalhe_produto_id on product_files(detalhe_produto_id);

-- ── updated_at automático ────────────────────────────────────
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_categories_updated_at
  before update on categories
  for each row execute function set_updated_at();

create trigger trg_products_updated_at
  before update on products
  for each row execute function set_updated_at();

create trigger trg_detalhes_produto_updated_at
  before update on detalhes_produto
  for each row execute function set_updated_at();

create trigger trg_product_files_updated_at
  before update on product_files
  for each row execute function set_updated_at();
