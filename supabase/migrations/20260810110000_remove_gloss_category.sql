-- Kulanda — remove a categoria "Brilho Labial" e o respetivo produto.
-- Sem risco para o histórico de encomendas: order_items.product_slug é
-- só texto, sem chave estrangeira para products.

delete from product_files
where product_id in (select id from products where slug = 'brilho-labial-3d-kiko');

delete from products where slug = 'brilho-labial-3d-kiko';

delete from categories where slug = 'gloss';
