-- Primeiro produto real da categoria Pet (criada em
-- 20260813000000_add_pet_category.sql, até agora sem produtos).
-- Foto enviada pelo dono da loja já sem fundo (mostra as duas cores —
-- bege e verde — disponíveis no fornecedor; vende-se como produto único,
-- sem seletor de cor, por não haver fotos separadas de cada cor).
with cat as (select id from categories where slug = 'pet'),
prod as (
  insert into products (category_id, slug, name, price, description, features, badge, min_quantity)
  select cat.id,
    'garrafa-bebedouro-portatil-pet',
    'Garrafa-Bebedouro Portátil para Cães',
    19.90,
    'Garrafa de água portátil com bebedouro dobrável integrado na tampa, ideal para passeios, viagens e treino ao ar livre. Basta pressionar o botão para a água encher o bebedouro, sem derrames nem desperdício. Inclui compartimento inferior amovível para snacks ou ração.',
    array['Bebedouro dobrável integrado — pressiona o botão para encher com água','Compartimento inferior amovível para snacks ou ração','Alça de transporte ajustável, ideal para passeios e viagens','Design leve e prático para o dia a dia ao ar livre'],
    'Novo', 1
  from cat
  returning id
)
insert into product_files (product_id, url, type, position)
select id, '/products/pet-garrafa-bebedouro-portatil.png', 'image', 0 from prod;
