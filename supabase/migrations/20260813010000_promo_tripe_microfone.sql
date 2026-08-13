-- Marca o Tripé e o Microfone de Lapela Duplo (Type-C) como "em promoção"
-- na homepage. Pedido do dono da loja: o preço de venda não muda — só se
-- define um "compare_at_price" (preço "de") 25% acima do preço atual, para
-- o preço já existente passar a aparecer como 20% de desconto direto.
-- (preço / 0.8 = preço + 25%; visto ao contrário, preço = "de" - 20%.)
--
-- Calculado a partir do preço atual na base de dados, não de um valor fixo
-- — se o preço tiver mudado desde o seed inicial, isto continua correto.
update products
set compare_at_price = round(price / 0.8, 2)
where slug in (
  'kit-content-creator-tripe-selfie-stick',
  'microfone-lapela-sem-fio-duplo'
);
