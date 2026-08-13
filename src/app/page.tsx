import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import TrustBar from "@/components/TrustBar";
import HeroCarousel, { type HeroSlide } from "@/components/HeroCarousel";
import CategoryCircles, { type CategoryCircleItem } from "@/components/CategoryCircles";
import PromoBanner from "@/components/PromoBanner";
import { getAllProducts, type Product } from "@/lib/products";
import { getCardImage } from "@/lib/product-cutouts";

const categoryTiles: CategoryCircleItem[] = [
  {
    id: "carteiras",
    title: "Carteiras Magnéticas",
    shortTitle: "Carteiras",
    image: "/products/cutouts/carteira-magnetica-grafite-apoio.png",
  },
  {
    id: "microfones",
    title: "Microfones de Lapela",
    shortTitle: "Microfones",
    image: "/products/cutouts/microfone-lapela-duplo-typec.png",
  },
  {
    id: "iluminacao",
    title: "Ring Lights Magnéticos",
    shortTitle: "Ring Lights",
    image: "/products/cutouts/ring-light-magnetico.png",
  },
  {
    id: "tripes",
    title: "Tripés e Suportes",
    shortTitle: "Tripés",
    image: "/products/cutouts/tripe-selfie-stick-produto.png",
  },
  {
    id: "pet",
    title: "Pet",
    shortTitle: "Pet",
    image: "/products/cutouts/pet.png",
  },
];

export default async function Home() {
  const products = await getAllProducts();

  const featuredByCategory = (
    ["carteiras", "microfones", "iluminacao", "tripes"] as Product["category"][]
  )
    .map(
      (category) =>
        products.find((p) => p.category === category && p.badge) ??
        products.find((p) => p.category === category)
    )
    .filter((p): p is Product => Boolean(p));

  const extra = products.find(
    (p) => p.badge === "Novo" && !featuredByCategory.some((f) => f.slug === p.slug)
  );

  const destaques = extra ? [...featuredByCategory, extra] : featuredByCategory;

  const promoProducts = products.filter(
    (p) => p.compareAtPrice != null && p.compareAtPrice > p.price
  );

  // Desconto máximo real entre os produtos em promoção, para o banner nunca
  // anunciar um valor inventado — se amanhã os descontos mudarem no admin,
  // o texto acompanha sozinho.
  const maxDiscountPct = promoProducts.reduce((max, p) => {
    const pct = Math.round((1 - p.price / (p.compareAtPrice as number)) * 100);
    return Math.max(max, pct);
  }, 0);
  const promoHighlight = promoProducts[0];
  const promoImage = promoHighlight ? getCardImage(promoHighlight.image)?.src : undefined;

  const carteiraCard = products.find(
    (p) => p.slug === "carteira-magnetica-gerle-cinza"
  );
  const ringLightCard = products.find(
    (p) => p.slug === "ring-light-magnetico-3-em-1"
  );

  // Hero rotativo: a carteira teve o hero só para ela durante um tempo, mas
  // as campanhas mostraram mais interesse real no ring light/tripé do que
  // nas carteiras — por isso o hero passa a mostrar mais do que uma
  // categoria. O tripé fica de fora por agora: a única foto que temos dele
  // é quase quadrada e baixa resolução (822×826px), ficaria desfocada
  // esticada a 100% da largura — entra quando houver uma foto à altura.
  const heroSlides: HeroSlide[] = [
    {
      id: "carteiras",
      image: "/hero/carteira-hero-banner.webp",
      imageAlt: "Carteira magnética Kulanda em destaque",
      badge: "Nova coleção",
      headline: "Estilo Sem Limites",
      description:
        "Carteiras magnéticas com acabamento premium, ímã MagSafe forte e design que acompanha o seu ritmo.",
      ctaHref: "/produtos?categoria=carteiras",
      ctaLabel: "Ver Coleção",
      card: carteiraCard
        ? {
            href: `/produtos/${carteiraCard.slug}`,
            image: "/hero/carteira-hero-banner.webp",
            name: carteiraCard.name,
          }
        : undefined,
    },
    {
      id: "iluminacao",
      image: "/products/ring-light-magnetico.webp",
      imageAlt: "Ring light magnético Kulanda em destaque",
      badge: "Novo",
      headline: "Luz Sem Limites",
      description:
        "Luz de preenchimento LED magnética 3 em 1, com espelho embutido e encaixe direto no MagSafe do iPhone.",
      ctaHref: "/produtos?categoria=iluminacao",
      ctaLabel: "Ver Coleção",
      card: ringLightCard
        ? {
            href: `/produtos/${ringLightCard.slug}`,
            image: ringLightCard.image,
            name: ringLightCard.name,
          }
        : undefined,
    },
  ];

  return (
    <div className="flex flex-col gap-20">
      <section className="flex flex-col gap-6">
        <HeroCarousel slides={heroSlides} />
      </section>

      <TrustBar />

      <section className="flex flex-col gap-6">
        <CategoryCircles categories={categoryTiles} />
      </section>

      <section className="flex flex-col gap-8">
        <div className="flex items-end justify-between">
          <h2 className="animate-text-reveal font-serif text-3xl font-semibold text-[var(--foreground)]">
            Destaques
          </h2>
          <Link
            href="/produtos"
            className="link-underline text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] hover:text-[var(--accent)]"
          >
            Ver todos →
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/produtos"
            className="rounded-full bg-[var(--foreground)] px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[var(--accent-dark)]"
          >
            Todas
          </Link>
          <Link
            href="/produtos?categoria=carteiras"
            className="rounded-full border border-[var(--border)] px-4 py-2 text-[13px] font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-dark)]"
          >
            Carteiras
          </Link>
          <Link
            href="/produtos?categoria=microfones"
            className="rounded-full border border-[var(--border)] px-4 py-2 text-[13px] font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-dark)]"
          >
            Microfones
          </Link>
          <Link
            href="/produtos?categoria=iluminacao"
            className="rounded-full border border-[var(--border)] px-4 py-2 text-[13px] font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-dark)]"
          >
            Ring Lights
          </Link>
          <Link
            href="/produtos?categoria=tripes"
            className="rounded-full border border-[var(--border)] px-4 py-2 text-[13px] font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-dark)]"
          >
            Tripés
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {destaques.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      </section>

      {promoProducts.length > 0 && (
        <section className="flex flex-col gap-8">
          <PromoBanner
            eyebrow="Promoção em produtos selecionados"
            headline={
              maxDiscountPct > 0
                ? `Até ${maxDiscountPct}% de desconto direto`
                : "Descontos diretos"
            }
            description="Numa seleção de acessórios para criadores de conteúdo."
            ctaHref="/produtos"
            ctaLabel="Ver produtos"
            image={promoImage}
            imageAlt={promoHighlight?.name}
          />
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {promoProducts.map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
