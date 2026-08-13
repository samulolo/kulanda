import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import TrustBar from "@/components/TrustBar";
import HeroCarousel, { type HeroSlide } from "@/components/HeroCarousel";
import { getAllProducts, type Product } from "@/lib/products";

const categoryTiles: {
  id: Product["category"];
  title: string;
  image: string;
}[] = [
  {
    id: "carteiras",
    title: "Carteiras Magnéticas",
    image: "/products/carteira-magnetica-gerle-textura-preta.webp",
  },
  {
    id: "microfones",
    title: "Microfones de Lapela",
    image: "/products/microfone-lapela-duplo-typec.webp",
  },
  {
    id: "iluminacao",
    title: "Ring Lights Magnéticos",
    image: "/products/ring-light-magnetico.webp",
  },
  {
    id: "tripes",
    title: "Tripés e Suportes",
    image: "/products/tripe-selfie-stick-produto.webp",
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
        <div className="flex flex-col gap-1">
          <p className="animate-text-reveal text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
            Explorar
          </p>
          <h2 className="animate-text-reveal font-serif text-3xl font-semibold text-[var(--foreground)]" style={{ animationDelay: '0.1s' }}>
            Categorias
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-4">
          {categoryTiles.map((category, index) => (
            <Link
              key={category.id}
              href={`/produtos?categoria=${category.id}`}
              className="animate-fade-up group flex flex-col items-center gap-3 text-center"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-[var(--border)] transition-transform duration-300 group-hover:scale-105 sm:h-24 sm:w-24">
                <span className="absolute inset-3">
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-contain"
                  />
                </span>
              </span>
              <span className="text-sm font-medium leading-snug text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                {category.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <p className="animate-text-reveal text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
              Seleção da casa
            </p>
            <h2 className="animate-text-reveal font-serif text-3xl font-semibold text-[var(--foreground)]" style={{ animationDelay: '0.1s' }}>
              Destaques
            </h2>
          </div>
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
    </div>
  );
}
