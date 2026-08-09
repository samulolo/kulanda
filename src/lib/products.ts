export type Category = "microfones" | "carteiras" | "iluminacao" | "gloss" | "tripes";

export interface Product {
  slug: string;
  name: string;
  category: Category;
  price: number;
  compareAtPrice?: number;
  description: string;
  features: string[];
  color: string; // usado no placeholder visual (e no glow atrás da foto)
  emoji: string; // usado para escolher o ícone quando não há foto
  image?: string; // caminho em /public para a foto real do produto
  images?: string[]; // galeria de fotos adicionais (produto principal usa "image")
  video?: string; // caminho em /public para vídeo de apresentação do produto
  videoTitle?: string; // título exibido junto ao vídeo
  badge?: string;
  stock: number;
  variantGroup?: string; // agrupa variações de cor do mesmo produto
  colorLabel?: string; // nome curto da cor, usado no seletor de variantes
  minQuantity?: number; // quantidade mínima de compra (padrão: 1)
}

export const categories: { id: Category; label: string }[] = [
  { id: "carteiras", label: "Carteiras Magnéticas" },
  { id: "microfones", label: "Microfones de Lapela" },
  { id: "iluminacao", label: "Ring Lights Magnéticos" },
  { id: "gloss", label: "Brilho Labial" },
  { id: "tripes", label: "Tripés e Suportes" },
];

export const products: Product[] = [
  {
    slug: "carteira-magnetica-couro-marrom",
    name: "Carteira Magnética Finewoven - Marrom Caramelo",
    category: "carteiras",
    price: 18.65,
    description:
      "Carteira porta-cartão oficial em material Finewoven, tom marrom caramelo, com ímã MagSafe forte e vem com caixa. Compatível com iPhone 15 Pro Max, 15 Plus, 14, 13 e 12 Pro.",
    features: [
      "Material Finewoven premium",
      "Ímã MagSafe forte e preciso",
      "Vem com caixa oficial",
      "Compatível com iPhone 15 Pro Max, 15 Plus, 14, 13 e 12 Pro",
    ],
    color: "#8a5a34",
    emoji: "👛",
    image: "/products/carteira-magnetica-marrom.webp",
    badge: "Mais vendido",
    stock: 20,
  },
  {
    slug: "carteira-magnetica-couro-azul-marinho",
    name: "Carteira Magnética Finewoven - Azul-Marinho",
    category: "carteiras",
    price: 18.65,
    description:
      "Carteira porta-cartão oficial em material Finewoven, tom azul-marinho profundo, com ímã MagSafe forte e vem com caixa. Compatível com iPhone 15 Pro Max, 15 Plus, 14, 13 e 12 Pro.",
    features: [
      "Material Finewoven premium",
      "Ímã MagSafe forte e preciso",
      "Vem com caixa oficial",
      "Compatível com iPhone 15 Pro Max, 15 Plus, 14, 13 e 12 Pro",
    ],
    color: "#26374d",
    emoji: "👛",
    image: "/products/carteira-magnetica-azul-marinho.webp",
    stock: 16,
  },
  {
    slug: "carteira-magnetica-couro-roxo",
    name: "Carteira Magnética Finewoven - Roxo Ameixa",
    category: "carteiras",
    price: 18.65,
    description:
      "Carteira porta-cartão oficial em material Finewoven, tom roxo ameixa, com ímã MagSafe forte e vem com caixa. Compatível com iPhone 15 Pro Max, 15 Plus, 14, 13 e 12 Pro.",
    features: [
      "Material Finewoven premium",
      "Ímã MagSafe forte e preciso",
      "Vem com caixa oficial",
      "Compatível com iPhone 15 Pro Max, 15 Plus, 14, 13 e 12 Pro",
    ],
    color: "#4b2138",
    emoji: "👛",
    image: "/products/carteira-magnetica-roxo.webp",
    badge: "Novo",
    stock: 14,
  },
  {
    slug: "carteira-magnetica-gerle-cinza",
    name: "Carteira Magnética GERLE com Puxador - Cinza",
    category: "carteiras",
    price: 25.8,
    description:
      "Modelo esportivo em cinza chumbo com sistema de puxador para saque rápido dos cartões, ideal para quem busca praticidade no dia a dia.",
    features: [
      "Ímãs de alta potência compatíveis com MagSafe",
      "Puxador para saque rápido dos cartões",
      "Couro sintético resistente a atrito",
      "Guarda até 3 cartões",
    ],
    color: "#6b7280",
    emoji: "👛",
    image: "/products/carteira-magnetica-cinza-gerle.webp",
    stock: 25,
  },
  {
    slug: "carteira-magnetica-gerle-lilas",
    name: "Carteira Magnética GERLE Textura - Lilás",
    category: "carteiras",
    price: 25.8,
    description:
      "Porta-cartão magnético de couro premium para iPhone e Samsung Galaxy, compatível com MagSafe, com proteção RFID anti-clonagem para cartões bancários e documentos.",
    features: [
      "Compatível com MagSafe (iPhone e Samsung Galaxy)",
      "Proteção RFID anti-clonagem para cartões e documentos",
      "Couro premium com painel texturizado antiderrapante",
      "Guarda até 3 cartões",
    ],
    color: "#c9c3e0",
    emoji: "👛",
    image: "/products/carteira-magnetica-lilas.webp",
    video: "/products/carteira-magnetica-gerle-textura.mp4",
    videoTitle: "Carteira Magnética GERLE Textura - Lilás em ação",
    badge: "Novo",
    stock: 18,
    variantGroup: "gerle-textura",
    colorLabel: "Lilás",
  },
  {
    slug: "carteira-magnetica-gerle-textura-cinza",
    name: "Carteira Magnética GERLE Textura - Cinza",
    category: "carteiras",
    price: 25.8,
    description:
      "Porta-cartão magnético de couro premium para iPhone e Samsung Galaxy, compatível com MagSafe, com proteção RFID anti-clonagem para cartões bancários e documentos.",
    features: [
      "Compatível com MagSafe (iPhone e Samsung Galaxy)",
      "Proteção RFID anti-clonagem para cartões e documentos",
      "Couro premium com painel texturizado antiderrapante",
      "Guarda até 3 cartões",
    ],
    color: "#6b6b63",
    emoji: "👛",
    image: "/products/carteira-magnetica-gerle-textura-cinza.webp",
    video: "/products/carteira-magnetica-gerle-textura.mp4",
    videoTitle: "Carteira Magnética GERLE Textura - Cinza em ação",
    stock: 20,
    variantGroup: "gerle-textura",
    colorLabel: "Cinza",
  },
  {
    slug: "carteira-magnetica-gerle-textura-verde",
    name: "Carteira Magnética GERLE Textura - Verde",
    category: "carteiras",
    price: 25.8,
    description:
      "Porta-cartão magnético de couro premium para iPhone e Samsung Galaxy, compatível com MagSafe, com proteção RFID anti-clonagem para cartões bancários e documentos.",
    features: [
      "Compatível com MagSafe (iPhone e Samsung Galaxy)",
      "Proteção RFID anti-clonagem para cartões e documentos",
      "Couro premium com painel texturizado antiderrapante",
      "Guarda até 3 cartões",
    ],
    color: "#3f5245",
    emoji: "👛",
    image: "/products/carteira-magnetica-gerle-textura-verde.webp",
    video: "/products/carteira-magnetica-gerle-textura.mp4",
    videoTitle: "Carteira Magnética GERLE Textura - Verde em ação",
    stock: 20,
    variantGroup: "gerle-textura",
    colorLabel: "Verde",
  },
  {
    slug: "carteira-magnetica-gerle-textura-preta",
    name: "Carteira Magnética GERLE Textura - Preta",
    category: "carteiras",
    price: 25.8,
    description:
      "Porta-cartão magnético de couro premium para iPhone e Samsung Galaxy, compatível com MagSafe, com proteção RFID anti-clonagem para cartões bancários e documentos.",
    features: [
      "Compatível com MagSafe (iPhone e Samsung Galaxy)",
      "Proteção RFID anti-clonagem para cartões e documentos",
      "Couro premium com acabamento costurado em contraste",
      "Guarda até 3 cartões",
    ],
    color: "#1c1c1c",
    emoji: "👛",
    image: "/products/carteira-magnetica-gerle-textura-preta.webp",
    video: "/products/carteira-magnetica-gerle-textura.mp4",
    videoTitle: "Carteira Magnética GERLE Textura - Preta em ação",
    badge: "Novo",
    stock: 20,
    variantGroup: "gerle-textura",
    colorLabel: "Preta",
  },
  {
    slug: "carteira-magnetica-gerle-grafite-apoio",
    name: "Carteira Magnética GERLE com Apoio - Grafite",
    category: "carteiras",
    price: 25.8,
    description:
      "Mesmo design texturizado bicolor em tom grafite, com dobra reforçada que também funciona como apoio para assistir vídeos com o iPhone na horizontal.",
    features: [
      "Ímãs de alta potência compatíveis com MagSafe",
      "Dobra reforçada que vira apoio (stand)",
      "Painel texturizado antiderrapante",
      "Guarda até 3 cartões",
    ],
    color: "#4b4b4d",
    emoji: "👛",
    image: "/products/carteira-magnetica-grafite-apoio.webp",
    stock: 18,
  },
  {
    slug: "microfone-lapela-sem-fio-duplo",
    name: "Microfone de Lapela Sem Fio Duplo - Type-C",
    category: "microfones",
    price: 15.99,
    description:
      "Microfone de lapela sem fio profissional com conector Type-C, compatível com smartphones, computadores e tablets. Plug and play, sem necessidade de aplicativo.",
    features: [
      "Conector Type-C plug and play",
      "2 microfones transmissores + 1 receptor",
      "Compatível com smartphones, computadores e tablets (entrada USB-C)",
      "Protetores de vento em pelúcia e espuma inclusos",
    ],
    color: "#1f2937",
    emoji: "🎙️",
    image: "/products/microfone-lapela-duplo-typec.webp",
    video: "/products/microfone-lapela-duplo-typec.mp4",
    videoTitle: "Microfone de Lapela Sem Fio Duplo - vídeo comercial",
    badge: "Mais vendido",
    stock: 15,
  },
  {
    slug: "ring-light-magnetico-3-em-1",
    name: "Ring Light Magnético 3 em 1 com Espelho",
    category: "iluminacao",
    price: 25.99,
    description:
      "Luz de preenchimento LED magnética 3 em 1, com espelho embutido e desenho dobrável. Encaixa direto no MagSafe do iPhone para selfies e vídeos com boa iluminação em qualquer lugar.",
    features: [
      "Compatível com MagSafe (encaixe magnético)",
      "Espelho embutido para ajustar o enquadramento",
      "Design dobrável e portátil",
      "Brilho ajustável para retrato ou paisagem",
    ],
    color: "#1c1c1c",
    emoji: "💡",
    image: "/products/ring-light-magnetico.webp",
    video: "/products/ring-light-magnetico.mp4",
    videoTitle: "Ring Light Magnético 3 em 1 - vídeo demonstrativo",
    badge: "Novo",
    stock: 30,
  },
  {
    slug: "brilho-labial-3d-kiko",
    name: "Brilho Labial 3D Espelhado Kiko",
    category: "gloss",
    price: 9.42,
    description:
      "Brilho labial original Kiko com efeito espelho 3D: fórmula à prova de água, cor duradoura que não desbota e textura não pegajosa que não gruda no copo. Acabamento fino e brilhante, com toque suave tipo gel. Disponível nas 3 cores mostradas — rosa brilhante, transparente espelhado e rosa dourado com glitter. Compra mínima de 4 unidades.",
    features: [
      "Efeito espelho 3D de alto brilho",
      "Fórmula à prova de água e de longa duração",
      "Textura não pegajosa — não gruda no copo",
      "Disponível em 3 tons — compra mínima de 4 unidades",
    ],
    color: "#e8a9c2",
    emoji: "💄",
    image: "/products/brilho-labial-3d-kiko-rosa.webp",
    images: [
      "/products/brilho-labial-3d-kiko-rosa.webp",
      "/products/brilho-labial-3d-kiko-transparente.webp",
      "/products/brilho-labial-3d-kiko-glitter-dourado.webp",
    ],
    badge: "Novo",
    stock: 40,
    minQuantity: 4,
  },
  {
    slug: "kit-content-creator-tripe-selfie-stick",
    name: "Kit Content Creator - Tripé Selfie Stick com Luz e Controlo Remoto",
    category: "tripes",
    price: 18.96,
    description:
      "Kit tudo-em-um para criação de conteúdo: tripé e vara de selfie portáteis, com luz de preenchimento incorporada e comando Bluetooth remoto. A luz tem tom quente e rotação de 360°, o suporte abre até 740mm e aceita telemóveis até 185mm de comprimento, e o comando Bluetooth funciona a uma distância de até 10 metros. Serve como tripé de mesa, suporte para transmissões em direto e vara de selfie, tudo dobrável e fácil de transportar.",
    features: [
      "Luz de preenchimento com tom quente e rotação 360°",
      "Comando Bluetooth remoto com alcance até 10 metros",
      "Extensível até 740mm, aceita telemóveis até 185mm",
      "3 em 1: tripé de mesa, suporte para diretos e vara de selfie",
    ],
    color: "#1c1c1c",
    emoji: "🎥",
    image: "/products/tripe-selfie-stick-produto.webp",
    images: [
      "/products/tripe-selfie-stick-produto.webp",
      "/products/tripe-selfie-stick-em-uso.webp",
    ],
    video: "/products/tripe-selfie-stick-luz-controlo.mp4",
    videoTitle: "Kit Content Creator - Tripé Selfie Stick - vídeo demonstrativo",
    badge: "Novo",
    stock: 25,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category?: Category): Product[] {
  if (!category) return products;
  return products.filter((p) => p.category === category);
}

export function getCategoryLabel(category: Category): string {
  return categories.find((c) => c.id === category)?.label ?? category;
}

export function getVariants(product: Product): Product[] {
  if (!product.variantGroup) return [];
  return products.filter((p) => p.variantGroup === product.variantGroup);
}

export function formatPrice(value: number): string {
  return value.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
}
