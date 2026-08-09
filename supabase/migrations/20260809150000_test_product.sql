-- Kulanda — produto de teste para validar o fluxo de compra em produção
-- (checkout Stripe → webhook → gravação da encomenda → emails Resend).
-- REMOVER depois do teste com:
--   delete from products where slug = 'produto-teste-050';
--   delete from categories where slug = 'teste';

insert into categories (name, slug) values
  ('Teste (remover)', 'teste')
on conflict (slug) do nothing;

with cat as (select id from categories where slug = 'teste')
insert into products (category_id, slug, name, price, description, features, min_quantity)
select cat.id,
  'produto-teste-050',
  'Produto de Teste — 0,50€',
  0.50,
  'Produto interno para validar o fluxo de pagamento em produção. Não é um produto real — remover após o teste.',
  array['Apenas para teste de checkout'],
  1
from cat;
