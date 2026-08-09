# Kulanda — Loja de Capas Magnéticas e Microfones de Lapela

E-commerce em Next.js (App Router + TypeScript + Tailwind) para venda de:

- Capas magnéticas para iPhone (compatíveis com MagSafe)
- Microfones de lapela (sem fio, com fio, USB-C)

Identidade visual premium: paleta em tons de marfim/grafite com acento dourado,
tipografia serifada (Fraunces) para títulos + Manrope para o restante,
ícones de linha autorais nos cards de produto e microanimações sutis.

Status atual: **vitrine/catálogo**, com carrinho funcional e checkout **simulado**
(nenhum pagamento real é processado ainda).

## Como rodar

```bash
npm install
npm run dev
```

Abra http://localhost:3000

As fontes (Fraunces e Manrope) são carregadas via `@fontsource` (self-hosted),
então funcionam offline, sem depender do Google Fonts.

## Estrutura

- `src/lib/products.ts` — catálogo de produtos (editar aqui para adicionar/remover itens, preços, fotos)
- `src/lib/cart-context.tsx` — carrinho (estado + persistência em localStorage)
- `src/app/globals.css` — paleta de cores e tokens de design (`--background`, `--accent`, etc.)
- `src/components/` — Header, Footer, TrustBar, ProductCard, ProductImage (ícones SVG), controles de carrinho
- `src/app/` — páginas:
  - `/` — home
  - `/produtos` — catálogo com filtro por categoria (`?categoria=capas` ou `?categoria=microfones`)
  - `/produtos/[slug]` — página de produto
  - `/carrinho` — carrinho de compras
  - `/checkout` — checkout simulado (gera número de pedido, sem cobrança real)

## Próximos passos sugeridos

- Trocar os placeholders visuais (`ProductImage`) por fotos reais dos produtos
- Integrar gateway de pagamento real (ex: Stripe) quando for vender de verdade
- Adicionar banco de dados/CMS para gerenciar estoque e pedidos
- Configurar domínio e deploy (Vercel é o caminho mais simples para Next.js)
