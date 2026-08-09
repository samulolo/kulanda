-- Kulanda — deixa explícito, em todas as carteiras magnéticas, que são
-- compatíveis com qualquer iPhone com MagSafe, do 12 ao 17.

update products
set description = 'Carteira porta-cartão oficial em material Finewoven, tom marrom caramelo, com ímã MagSafe forte e vem com caixa. Compatível com todos os iPhone com MagSafe, do iPhone 12 ao iPhone 17.',
    features = array['Material Finewoven premium','Ímã MagSafe forte e preciso','Vem com caixa oficial','Compatível com iPhone 12 ao 17 (todos os modelos com MagSafe)']
where slug = 'carteira-magnetica-couro-marrom';

update products
set description = 'Carteira porta-cartão oficial em material Finewoven, tom azul-marinho profundo, com ímã MagSafe forte e vem com caixa. Compatível com todos os iPhone com MagSafe, do iPhone 12 ao iPhone 17.',
    features = array['Material Finewoven premium','Ímã MagSafe forte e preciso','Vem com caixa oficial','Compatível com iPhone 12 ao 17 (todos os modelos com MagSafe)']
where slug = 'carteira-magnetica-couro-azul-marinho';

update products
set description = 'Carteira porta-cartão oficial em material Finewoven, tom roxo ameixa, com ímã MagSafe forte e vem com caixa. Compatível com todos os iPhone com MagSafe, do iPhone 12 ao iPhone 17.',
    features = array['Material Finewoven premium','Ímã MagSafe forte e preciso','Vem com caixa oficial','Compatível com iPhone 12 ao 17 (todos os modelos com MagSafe)']
where slug = 'carteira-magnetica-couro-roxo';

update products
set description = 'Modelo esportivo em cinza chumbo com sistema de puxador para saque rápido dos cartões, ideal para quem busca praticidade no dia a dia. Compatível com todos os iPhone com MagSafe, do iPhone 12 ao iPhone 17.',
    features = array['Compatível com iPhone 12 ao 17 (todos os modelos com MagSafe)','Puxador para saque rápido dos cartões','Couro sintético resistente a atrito','Guarda até 3 cartões']
where slug = 'carteira-magnetica-gerle-cinza';

update products
set description = 'Porta-cartão magnético de couro premium, compatível com todos os iPhone com MagSafe (do iPhone 12 ao iPhone 17) e com telemóveis Android com anel ou capa magnética, com proteção RFID anti-clonagem para cartões bancários e documentos.',
    features = array['Compatível com iPhone 12 ao 17 (todos os modelos com MagSafe)','Proteção RFID anti-clonagem para cartões e documentos','Couro premium com painel texturizado antiderrapante','Guarda até 3 cartões']
where slug = 'carteira-magnetica-gerle-textura';

update products
set description = 'Mesmo design texturizado bicolor em tom grafite, com dobra reforçada que também funciona como apoio para assistir vídeos com o iPhone na horizontal. Compatível com todos os iPhone com MagSafe, do iPhone 12 ao iPhone 17.',
    features = array['Compatível com iPhone 12 ao 17 (todos os modelos com MagSafe)','Dobra reforçada que vira apoio (stand)','Painel texturizado antiderrapante','Guarda até 3 cartões']
where slug = 'carteira-magnetica-gerle-grafite-apoio';
