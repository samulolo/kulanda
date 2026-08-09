-- Kulanda — slugs por variante + agrupar as 3 carteiras Finewoven + RLS
--
-- 1) detalhes_produto ganha uma coluna slug: como decidimos manter, por
--    agora, um URL por cor (em vez do seletor de cor numa única página),
--    cada variante precisa do seu próprio slug para as rotas atuais
--    (/produtos/[slug]) continuarem a funcionar sem tocar no frontend.
-- 2) As 3 carteiras Finewoven (Marrom, Azul-Marinho, Roxo) foram seedadas
--    como 3 produtos separados, sem grupo — o mesmo problema que já
--    tínhamos corrigido no products.ts estático. Aqui fundimo-las num
--    único produto com 3 variantes, tal como a GERLE Textura.
-- 3) Ativa Row Level Security com leitura pública nas 4 tabelas — hoje o
--    servidor lê com a service_role key (ignora RLS), mas isto protege
--    já o catálogo caso um dia se use a anon key no cliente.

alter table detalhes_produto add column if not exists slug text unique;

-- ── slugs da GERLE Textura (grupo já existente) ──────────────
update detalhes_produto d
set slug = v.slug
from products p,
     (values
       ('Lilás', 'carteira-magnetica-gerle-lilas'),
       ('Cinza', 'carteira-magnetica-gerle-textura-cinza'),
       ('Verde', 'carteira-magnetica-gerle-textura-verde'),
       ('Preta', 'carteira-magnetica-gerle-textura-preta')
     ) as v(cor_label, slug)
where d.product_id = p.id
  and p.slug = 'carteira-magnetica-gerle-textura'
  and d.cor_label = v.cor_label;

-- ── fundir as 3 carteiras Finewoven num produto com variantes ─
with target as (
  select id from products where slug = 'carteira-magnetica-couro-marrom'
),
azul as (
  select id from products where slug = 'carteira-magnetica-couro-azul-marinho'
),
roxo as (
  select id from products where slug = 'carteira-magnetica-couro-roxo'
),
v_marrom as (
  insert into detalhes_produto (product_id, cor, cor_label, slug, badge)
  select target.id, '#8a5a34', 'Marrom Caramelo', 'carteira-magnetica-couro-marrom', 'Mais vendido'
  from target
  returning id, product_id
),
v_azul as (
  insert into detalhes_produto (product_id, cor, cor_label, slug)
  select target.id, '#26374d', 'Azul-Marinho', 'carteira-magnetica-couro-azul-marinho'
  from target
  returning id, product_id
),
v_roxo as (
  insert into detalhes_produto (product_id, cor, cor_label, slug, badge)
  select target.id, '#4b2138', 'Roxo Ameixa', 'carteira-magnetica-couro-roxo', 'Novo'
  from target
  returning id, product_id
),
-- as fotos que já pertenciam ao "marrom" (produto alvo) passam a pertencer à sua própria variante
moved_marrom_files as (
  update product_files pf
  set detalhe_produto_id = v_marrom.id
  from v_marrom
  where pf.product_id = v_marrom.product_id
    and pf.detalhe_produto_id is null
  returning pf.id
),
-- as fotos do azul e do roxo mudam-se para o produto alvo, presas à sua variante
moved_azul_files as (
  update product_files pf
  set product_id = target.id, detalhe_produto_id = v_azul.id
  from target, v_azul, azul
  where pf.product_id = azul.id
  returning pf.id
),
moved_roxo_files as (
  update product_files pf
  set product_id = target.id, detalhe_produto_id = v_roxo.id
  from target, v_roxo, roxo
  where pf.product_id = roxo.id
  returning pf.id
),
del_azul_products as (
  delete from products where id in (select id from azul) returning id
),
del_roxo_products as (
  delete from products where id in (select id from roxo) returning id
)
-- o badge fica só nas variantes agora, para o marrom e o roxo não "vazarem" para o azul
update products set badge = null where slug = 'carteira-magnetica-couro-marrom';

-- ── RLS: leitura pública, escrita só para service_role ────────
alter table categories enable row level security;
alter table products enable row level security;
alter table detalhes_produto enable row level security;
alter table product_files enable row level security;

create policy "Leitura pública" on categories for select using (true);
create policy "Leitura pública" on products for select using (true);
create policy "Leitura pública" on detalhes_produto for select using (true);
create policy "Leitura pública" on product_files for select using (true);
