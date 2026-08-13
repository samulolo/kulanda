import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import TrustBar from "@/components/TrustBar";
import HeroCarousel, { type HeroSlide } from "@/components/HeroCarousel";
import { getAllProducts, type Product } from "@/lib/products";

const categoryTiles: {
  id: Product["category"];
  title: string;
  description: string;
  image: string;
  span: string;
}[] = [
  {
    id: "carteiras",
    title: "Carteiras Magnéticas",
    description:
      "Ímã forte compatível com MagSafe, para diversos modelos de iPhone.",
    image: "/products/carteira-magnetica-gerle-textura-preta.webp",
    span: "lg:col-span-3",
  },
  {
    id: "microfones",
    title: "Microfones de Lapela",
    description:
      "Opções sem fio, ideais para vlogs, entrevistas, reuniões e criação de conteúdo.",
    image: "/products/microfone-lapela-duplo-typec.webp",
    span: "lg:col-span-3",
  },
  {
    id: "iluminacao",
    title: "Ring Lights Magnéticos",
    description:
      "Luz de preenchimento com encaixe MagSafe, espelho embutido e design dobrável para selfies e vídeos.",
    image: "/products/ring-light-magnetico.webp",
    span: "lg:col-span-3",
  },
  {
    id: "tripes",
    title: "Tripés e Suportes",
    description:
      "Tripé e vara de selfie com luz de preenchimento e comando Bluetooth remoto — 3 em 1 para criar conteúdo.",
    image: "/products/tripe-selfie-stick-em-uso.webp",
    span: "lg:col-span-3",
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

      <section className="flex flex-col gap-8">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <p className="animate-text-reveal text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
              Seleção da casa
            </p>
            <div className="flex items-center gap-3">
              <h2 className="animate-text-reveal font-serif text-3xl font-semibold text-[var(--foreground)]" style={{ animationDelay: '0.1s' }}>
                Destaques
              </h2>
              <div className="animate-accent-width h-1 w-12 bg-[var(--accent)] rounded-full"></div>
            </div>
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

      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <p className="animate-text-reveal text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
            Explorar
          </p>
          <div className="flex items-center gap-3">
            <h2 className="animate-text-reveal font-serif text-3xl font-semibold text-[var(--foreground)]" style={{ animationDelay: '0.1s' }}>
              Categorias
            </h2>
            <div className="animate-accent-width h-1 w-12 bg-[var(--accent)] rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {categoryTiles.map((category, index) => (
            <Link
              key={category.id}
              href={`/produtos?categoria=${category.id}`}
              className={`card-lift animate-fade-up group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] ${category.span}`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="relative h-48 w-full overflow-hidden sm:h-56">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/5 transition-opacity duration-300 group-hover:from-black/50" />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-4 p-6">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
                    Categoria
                  </p>
                  <h3 className="mt-2 font-serif text-lg font-semibold text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                    {category.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors duration-300">
                    {category.description}
                  </p>
                </div>
                <span className="flex w-fit items-center gap-1.5 text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-300">
                  Explorar coleção
                  <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
