-- Kulanda — seed com o catálogo atual (migrado de src/lib/products.ts)
-- Decisões tomadas na migração (sem stock, sem perguntar de novo):
--  · O grupo de variantes "gerle-textura" (4 slugs separados no TS) vira
--    1 produto ("carteira-magnetica-gerle-textura") + 4 linhas em
--    detalhes_produto (uma por cor), com o vídeo partilhado ligado ao
--    produto (detalhe_produto_id nulo) e a imagem de cada cor ligada à
--    sua variante.
--  · O badge "Novo" que só aparecia em duas das quatro cores foi movido
--    para detalhes_produto.badge (sobrepõe products.badge nessa variante).
--  · Os campos `color`/`emoji` do TS (fallback visual para quando não há
--    foto) foram descartados — todos os produtos atuais têm foto real.

-- ── categories ──────────────────────────────────────────────
insert into categories (name, slug) values
  ('Carteiras Magnéticas',   'carteiras'),
  ('Microfones de Lapela',   'microfones'),
  ('Ring Lights Magnéticos', 'iluminacao'),
  ('Brilho Labial',          'gloss'),
  ('Tripés e Suportes',      'tripes');

-- ── 1. Carteira Finewoven — Marrom Caramelo ──────────────────
with cat as (select id from categories where slug = 'carteiras'),
prod as (
  insert into products (category_id, slug, name, price, description, features, badge, min_quantity)
  select cat.id,
    'carteira-magnetica-couro-marrom',
    'Carteira Magnética Finewoven - Marrom Caramelo',
    18.65,
    'Carteira porta-cartão oficial em material Finewoven, tom marrom caramelo, com ímã MagSafe forte e vem com caixa. Compatível com iPhone 15 Pro Max, 15 Plus, 14, 13 e 12 Pro.',
    array['Material Finewoven premium','Ímã MagSafe forte e preciso','Vem com caixa oficial','Compatível com iPhone 15 Pro Max, 15 Plus, 14, 13 e 12 Pro'],
    'Mais vendido', 1
  from cat
  returning id
)
insert into product_files (product_id, url, type, position)
select id, '/products/carteira-magnetica-marrom.webp', 'image', 0 from prod;

-- ── 2. Carteira Finewoven — Azul-Marinho ─────────────────────
with cat as (select id from categories where slug = 'carteiras'),
prod as (
  insert into products (category_id, slug, name, price, description, features, badge, min_quantity)
  select cat.id,
    'carteira-magnetica-couro-azul-marinho',
    'Carteira Magnética Finewoven - Azul-Marinho',
    18.65,
    'Carteira porta-cartão oficial em material Finewoven, tom azul-marinho profundo, com ímã MagSafe forte e vem com caixa. Compatível com iPhone 15 Pro Max, 15 Plus, 14, 13 e 12 Pro.',
    array['Material Finewoven premium','Ímã MagSafe forte e preciso','Vem com caixa oficial','Compatível com iPhone 15 Pro Max, 15 Plus, 14, 13 e 12 Pro'],
    null, 1
  from cat
  returning id
)
insert into product_files (product_id, url, type, position)
select id, '/products/carteira-magnetica-azul-marinho.webp', 'image', 0 from prod;

-- ── 3. Carteira Finewoven — Roxo Ameixa ──────────────────────
with cat as (select id from categories where slug = 'carteiras'),
prod as (
  insert into products (category_id, slug, name, price, description, features, badge, min_quantity)
  select cat.id,
    'carteira-magnetica-couro-roxo',
    'Carteira Magnética Finewoven - Roxo Ameixa',
    18.65,
    'Carteira porta-cartão oficial em material Finewoven, tom roxo ameixa, com ímã MagSafe forte e vem com caixa. Compatível com iPhone 15 Pro Max, 15 Plus, 14, 13 e 12 Pro.',
    array['Material Finewoven premium','Ímã MagSafe forte e preciso','Vem com caixa oficial','Compatível com iPhone 15 Pro Max, 15 Plus, 14, 13 e 12 Pro'],
    'Novo', 1
  from cat
  returning id
)
insert into product_files (product_id, url, type, position)
select id, '/products/carteira-magnetica-roxo.webp', 'image', 0 from prod;

-- ── 4. Carteira GERLE com Puxador — Cinza ────────────────────
with cat as (select id from categories where slug = 'carteiras'),
prod as (
  insert into products (category_id, slug, name, price, description, features, badge, min_quantity)
  select cat.id,
    'carteira-magnetica-gerle-cinza',
    'Carteira Magnética GERLE com Puxador - Cinza',
    25.80,
    'Modelo esportivo em cinza chumbo com sistema de puxador para saque rápido dos cartões, ideal para quem busca praticidade no dia a dia.',
    array['Ímãs de alta potência compatíveis com MagSafe','Puxador para saque rápido dos cartões','Couro sintético resistente a atrito','Guarda até 3 cartões'],
    null, 1
  from cat
  returning id
)
insert into product_files (product_id, url, type, position)
select id, '/products/carteira-magnetica-cinza-gerle.webp', 'image', 0 from prod;

-- ── 5. Carteira GERLE Textura (Lilás / Cinza / Verde / Preta) ─
with cat as (select id from categories where slug = 'carteiras'),
prod as (
  insert into products (category_id, slug, name, price, description, features, badge, min_quantity)
  select cat.id,
    'carteira-magnetica-gerle-textura',
    'Carteira Magnética GERLE Textura',
    25.80,
    'Porta-cartão magnético de couro premium para iPhone e Samsung Galaxy, compatível com MagSafe, com proteção RFID anti-clonagem para cartões bancários e documentos.',
    array['Compatível com MagSafe (iPhone e Samsung Galaxy)','Proteção RFID anti-clonagem para cartões e documentos','Couro premium com painel texturizado antiderrapante','Guarda até 3 cartões'],
    null, 1
  from cat
  returning id
),
v_lilas as (
  insert into detalhes_produto (product_id, cor, cor_label, badge)
  select id, '#c9c3e0', 'Lilás', 'Novo' from prod
  returning id, product_id
),
v_cinza as (
  insert into detalhes_produto (product_id, cor, cor_label)
  select id, '#6b6b63', 'Cinza' from prod
  returning id, product_id
),
v_verde as (
  insert into detalhes_produto (product_id, cor, cor_label)
  select id, '#3f5245', 'Verde' from prod
  returning id, product_id
),
v_preta as (
  insert into detalhes_produto (product_id, cor, cor_label, badge)
  select id, '#1c1c1c', 'Preta', 'Novo' from prod
  returning id, product_id
),
f_lilas as (
  insert into product_files (product_id, detalhe_produto_id, url, type, position)
  select product_id, id, '/products/carteira-magnetica-lilas.webp', 'image', 0 from v_lilas
),
f_cinza as (
  insert into product_files (product_id, detalhe_produto_id, url, type, position)
  select product_id, id, '/products/carteira-magnetica-gerle-textura-cinza.webp', 'image', 0 from v_cinza
),
f_verde as (
  insert into product_files (product_id, detalhe_produto_id, url, type, position)
  select product_id, id, '/products/carteira-magnetica-gerle-textura-verde.webp', 'image', 0 from v_verde
),
f_preta as (
  insert into product_files (product_id, detalhe_produto_id, url, type, position)
  select product_id, id, '/products/carteira-magnetica-gerle-textura-preta.webp', 'image', 0 from v_preta
)
insert into product_files (product_id, url, type, position, video_title)
select id, '/products/carteira-magnetica-gerle-textura.mp4', 'video', 1, 'Carteira Magnética GERLE Textura em ação' from prod;

-- ── 6. Carteira GERLE com Apoio — Grafite ─────────────────────
with cat as (select id from categories where slug = 'carteiras'),
prod as (
  insert into products (category_id, slug, name, price, description, features, badge, min_quantity)
  select cat.id,
    'carteira-magnetica-gerle-grafite-apoio',
    'Carteira Magnética GERLE com Apoio - Grafite',
    25.80,
    'Mesmo design texturizado bicolor em tom grafite, com dobra reforçada que também funciona como apoio para assistir vídeos com o iPhone na horizontal.',
    array['Ímãs de alta potência compatíveis com MagSafe','Dobra reforçada que vira apoio (stand)','Painel texturizado antiderrapante','Guarda até 3 cartões'],
    null, 1
  from cat
  returning id
)
insert into product_files (product_id, url, type, position)
select id, '/products/carteira-magnetica-grafite-apoio.webp', 'image', 0 from prod;

-- ── 7. Microfone de Lapela Sem Fio Duplo — Type-C ─────────────
with cat as (select id from categories where slug = 'microfones'),
prod as (
  insert into products (category_id, slug, name, price, description, features, badge, min_quantity)
  select cat.id,
    'microfone-lapela-sem-fio-duplo',
    'Microfone de Lapela Sem Fio Duplo - Type-C',
    15.99,
    'Microfone de lapela sem fio profissional com conector Type-C, compatível com smartphones, computadores e tablets. Plug and play, sem necessidade de aplicativo.',
    array['Conector Type-C plug and play','2 microfones transmissores + 1 receptor','Compatível com smartphones, computadores e tablets (entrada USB-C)','Protetores de vento em pelúcia e espuma inclusos'],
    'Mais vendido', 1
  from cat
  returning id
),
files as (
  insert into product_files (product_id, url, type, position)
  select id, '/products/microfone-lapela-duplo-typec.webp', 'image', 0 from prod
)
insert into product_files (product_id, url, type, position, video_title)
select id, '/products/microfone-lapela-duplo-typec.mp4', 'video', 1, 'Microfone de Lapela Sem Fio Duplo - vídeo comercial' from prod;

-- ── 8. Ring Light Magnético 3 em 1 com Espelho ────────────────
with cat as (select id from categories where slug = 'iluminacao'),
prod as (
  insert into products (category_id, slug, name, price, description, features, badge, min_quantity)
  select cat.id,
    'ring-light-magnetico-3-em-1',
    'Ring Light Magnético 3 em 1 com Espelho',
    25.99,
    'Luz de preenchimento LED magnética 3 em 1, com espelho embutido e desenho dobrável. Encaixa direto no MagSafe do iPhone para selfies e vídeos com boa iluminação em qualquer lugar.',
    array['Compatível com MagSafe (encaixe magnético)','Espelho embutido para ajustar o enquadramento','Design dobrável e portátil','Brilho ajustável para retrato ou paisagem'],
    'Novo', 1
  from cat
  returning id
),
files as (
  insert into product_files (product_id, url, type, position)
  select id, '/products/ring-light-magnetico.webp', 'image', 0 from prod
)
insert into product_files (product_id, url, type, position, video_title)
select id, '/products/ring-light-magnetico.mp4', 'video', 1, 'Ring Light Magnético 3 em 1 - vídeo demonstrativo' from prod;

-- ── 9. Brilho Labial 3D Espelhado Kiko (min. 4 un., galeria) ──
with cat as (select id from categories where slug = 'gloss'),
prod as (
  insert into products (category_id, slug, name, price, description, features, badge, min_quantity)
  select cat.id,
    'brilho-labial-3d-kiko',
    'Brilho Labial 3D Espelhado Kiko',
    9.42,
    'Brilho labial original Kiko com efeito espelho 3D: fórmula à prova de água, cor duradoura que não desbota e textura não pegajosa que não gruda no copo. Acabamento fino e brilhante, com toque suave tipo gel. Disponível nas 3 cores mostradas — rosa brilhante, transparente espelhado e rosa dourado com glitter. Compra mínima de 4 unidades.',
    array['Efeito espelho 3D de alto brilho','Fórmula à prova de água e de longa duração','Textura não pegajosa — não gruda no copo','Disponível em 3 tons — compra mínima de 4 unidades'],
    'Novo', 4
  from cat
  returning id
)
insert into product_files (product_id, url, type, position)
select id, v.url, 'image', v.pos
from prod, (values
  ('/products/brilho-labial-3d-kiko-rosa.webp', 0),
  ('/products/brilho-labial-3d-kiko-transparente.webp', 1),
  ('/products/brilho-labial-3d-kiko-glitter-dourado.webp', 2)
) as v(url, pos);

-- ── 10. Kit Content Creator - Tripé Selfie Stick ──────────────
with cat as (select id from categories where slug = 'tripes'),
prod as (
  insert into products (category_id, slug, name, price, description, features, badge, min_quantity)
  select cat.id,
    'kit-content-creator-tripe-selfie-stick',
    'Kit Content Creator - Tripé Selfie Stick com Luz e Controlo Remoto',
    18.96,
    'Kit tudo-em-um para criação de conteúdo: tripé e vara de selfie portáteis, com luz de preenchimento incorporada e comando Bluetooth remoto. A luz tem tom quente e rotação de 360°, o suporte abre até 740mm e aceita telemóveis até 185mm de comprimento, e o comando Bluetooth funciona a uma distância de até 10 metros. Serve como tripé de mesa, suporte para transmissões em direto e vara de selfie, tudo dobrável e fácil de transportar.',
    array['Luz de preenchimento com tom quente e rotação 360°','Comando Bluetooth remoto com alcance até 10 metros','Extensível até 740mm, aceita telemóveis até 185mm','3 em 1: tripé de mesa, suporte para diretos e vara de selfie'],
    'Novo', 1
  from cat
  returning id
),
imgs as (
  insert into product_files (product_id, url, type, position)
  select id, v.url, 'image', v.pos
  from prod, (values
    ('/products/tripe-selfie-stick-produto.webp', 0),
    ('/products/tripe-selfie-stick-em-uso.webp', 1)
  ) as v(url, pos)
)
insert into product_files (product_id, url, type, position, video_title)
select id, '/products/tripe-selfie-stick-luz-controlo.mp4', 'video', 2, 'Kit Content Creator - Tripé Selfie Stick - vídeo demonstrativo' from prod;
