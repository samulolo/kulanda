-- Kulanda — nova categoria "Pet" (ainda sem produtos)
-- Criada por pedido do dono da loja: estrutura/categoria já pronta,
-- os produtos entram mais tarde. Como o site é orientado a dados
-- (categorias vêm sempre de getCategories()), esta categoria fica
-- automaticamente visível em: menu do Header, rodapé, filtros de
-- /produtos e sitemap.xml — mesmo sem nenhum produto lá dentro.
-- Nesse estado, /produtos?categoria=pet mostra a página normalmente,
-- só que com a grelha de produtos vazia (estado já tratado pelo
-- componente ProductsCatalog).

insert into categories (name, slug) values
  ('Pet', 'pet');
