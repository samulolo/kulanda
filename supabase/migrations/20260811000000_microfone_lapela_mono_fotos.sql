-- Kulanda — adiciona as fotos ao "Microfone de Lapela Sem Fio - Lightning".
-- Imagem principal: microfone com pelo anti-vento + conector Lightning
-- (fundo branco, limpo). Imagem secundária: composição de fundo escuro
-- mostrando os dois conectores (Lightning e USB-C) lado a lado — mantida
-- a pedido do dono da loja mesmo mostrando o USB-C, que não vem incluído
-- nesta variante (só Lightning).

with prod as (select id from products where slug = 'microfone-lapela-sem-fio-lightning')
insert into product_files (product_id, url, type, position)
select id, v.url, 'image', v.pos
from prod, (values
  ('/products/microfone-lapela-lightning-produto.webp', 0),
  ('/products/microfone-lapela-lightning-detalhe.webp', 1)
) as v(url, pos);
