-- Kulanda — novo produto: microfone de lapela sem fio individual (1
-- microfone + recetor), conector Lightning. Distinto do já existente
-- "Microfone de Lapela Sem Fio Duplo - Type-C" (2 transmissores).
-- Descrição baseada no anúncio confirmado do fornecedor: "Wireless
-- Neckline Clip Noise Reduction Mini Microphone", mais o que as fotos
-- mostram (esponjas anti-vento sobresselentes incluídas). Sem foto por
-- agora — a adicionar depois de confirmar os ficheiros corretos.

with cat as (select id from categories where slug = 'microfones')
insert into products (category_id, slug, name, price, description, features, badge, min_quantity)
select cat.id,
  'microfone-lapela-sem-fio-lightning',
  'Microfone de Lapela Sem Fio - Lightning',
  20.90,
  'Microfone de lapela sem fio individual, com redução de ruído e conector Lightning para ligação direta ao iPhone. Compacto e plug and play, ideal para vlogs, entrevistas e criação de conteúdo.',
  array['Redução de ruído','Conector Lightning plug and play','Compacto e portátil','Inclui 2 esponjas anti-vento sobresselentes'],
  'Novo', 1
from cat;
