/**
 * Fotos de produto com fundo removido (recorte por chroma-key, feito porque
 * o fundo original era liso/uniforme — não há acesso a modelos de IA de
 * remoção de fundo a partir deste ambiente). Usadas nos cartões de produto
 * (grid da homepage e da página de produtos), onde o cartão já não tem
 * fundo branco: sem o recorte, a foto ficava com um rectângulo branco
 * visível por cima do bege do cartão.
 *
 * Só os produtos com fundo de foto realmente liso estão aqui — fotos com
 * fundo escuro/texturado ou fotos de "em uso" (lifestyle) ficaram de fora
 * porque o recorte por cor não dá resultado limpo nesses casos; esses
 * produtos continuam com fundo branco no cartão (ProductCard trata o
 * fallback automaticamente).
 */
const CUTOUTS: Record<string, string> = {
  "/products/carteira-magnetica-azul-marinho.webp":
    "/products/cutouts/carteira-magnetica-azul-marinho.png",
  "/products/carteira-magnetica-grafite-apoio.webp":
    "/products/cutouts/carteira-magnetica-grafite-apoio.png",
  "/products/carteira-magnetica-lilas.webp":
    "/products/cutouts/carteira-magnetica-lilas.png",
  "/products/carteira-magnetica-marrom.webp":
    "/products/cutouts/carteira-magnetica-marrom.png",
  "/products/carteira-magnetica-roxo.webp":
    "/products/cutouts/carteira-magnetica-roxo.png",
  "/products/microfone-lapela-duplo-typec.webp":
    "/products/cutouts/microfone-lapela-duplo-typec.png",
  "/products/microfone-lapela-lightning-produto.webp":
    "/products/cutouts/microfone-lapela-lightning-produto.png",
  "/products/ring-light-magnetico.webp":
    "/products/cutouts/ring-light-magnetico.png",
  "/products/tripe-selfie-stick-produto.webp":
    "/products/cutouts/tripe-selfie-stick-produto.png",
};

export interface CardImage {
  src: string;
  /** true quando é a versão recortada (fundo transparente). */
  transparent: boolean;
}

/** Devolve a versão para usar num cartão com fundo colorido: a foto
 * recortada quando existe, senão a original (o cartão faz fallback para
 * fundo branco nesse caso, para não haver "costura"). */
export function getCardImage(image?: string): CardImage | undefined {
  if (!image) return undefined;
  const cutout = CUTOUTS[image];
  return cutout ? { src: cutout, transparent: true } : { src: image, transparent: false };
}
