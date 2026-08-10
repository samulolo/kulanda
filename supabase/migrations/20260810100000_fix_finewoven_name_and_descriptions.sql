-- Kulanda — corrige nome e descrição da carteira que estava rotulada
-- "Finewoven". "Finewoven" é o nome do material têxtil exclusivo da
-- Apple para os seus próprios acessórios oficiais — o produto real,
-- confirmado com o fornecedor (anúncio original: "Magnetic PU Leather
-- Wallet... Card Bag Holder"), é pele sintética (PU), genérico, sem
-- ligação à Apple. Usar "Finewoven" seria apropriação indevida do nome
-- de um material de marca registada. A foto do fornecedor confirma
-- tratar-se mesmo de um porta-cartão fino (não uma capa que envolve o
-- telemóvel), por isso mantém-se a categorização atual do site.
--
-- Também corrige o nome, que tinha a cor "Marrom Caramelo" embutida de
-- antes de ter sido fundido com as variantes Azul-Marinho e Roxo (dava
-- nomes duplicados tipo "... - Marrom Caramelo - Azul-Marinho"). O
-- sufixo de cor já é acrescentado dinamicamente pelo código
-- (mapFlatProduct em src/lib/products.ts) a partir de
-- detalhes_produto.cor_label, por isso o nome base fica genérico.
--
-- E remove as alegações de "oficial" e "vem com caixa": não é um
-- acessório com licença da Apple, e o produto não vem em caixa nenhuma
-- — confirmado com o dono da loja. As alegações de proteção do anúncio
-- do fornecedor (anti-queda, à prova de água, etc.) vinham de um resumo
-- gerado por IA, marcado no próprio anúncio como não representando a
-- opinião do vendedor — não são usadas aqui por não estarem confirmadas.
update products
set name = 'Carteira Magnética em Pele Sintética',
    description = 'Carteira magnética porta-cartão em pele sintética (PU), com ímã forte compatível com MagSafe. Fixa-se com segurança nas costas do iPhone para transportar os seus cartões. Compatível com todos os iPhone com MagSafe, do iPhone 12 ao iPhone 17.',
    features = array['Pele sintética (PU) resistente','Ímã forte compatível com MagSafe','Guarda até 3 cartões','Compatível com iPhone 12 ao 17 (todos os modelos com MagSafe)']
where slug = 'carteira-magnetica-couro-marrom';

-- Brilho labial: "Kiko" é uma marca de cosmética real (Kiko Milano) e o
-- produto vendido é genérico (confirmado com o dono da loja) — usar o
-- nome da marca no título e na descrição é risco de infração de marca
-- registada e de publicidade enganosa. Remove todas as referências.
update products
set name = 'Brilho Labial 3D Espelhado',
    description = 'Brilho labial com efeito espelho 3D: fórmula à prova de água, cor duradoura que não desbota e textura não pegajosa que não gruda no copo. Acabamento fino e brilhante, com toque suave tipo gel. Disponível nas 3 cores mostradas — rosa brilhante, transparente espelhado e rosa dourado com glitter. Compra mínima de 4 unidades.'
where slug = 'brilho-labial-3d-kiko';
