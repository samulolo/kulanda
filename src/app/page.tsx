import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import TrustBar from "@/components/TrustBar";
import { products, Product, getCategoryLabel, formatPrice } from "@/lib/products";

const categoryContent: Record<
  Product["category"],
  { title: string; description: string }
> = {
  carteiras: {
    title: "Carteiras Magnéticas",
    description:
      "Material Finewoven, ímã MagSafe forte e caixa oficial inclusa, para diversos modelos de iPhone.",
  },
  microfones: {
    title: "Microfones de Lapela",
    description:
      "Opções sem fio, ideais para vlogs, entrevistas, reuniões e criação de conteúdo.",
  },
  iluminacao: {
    title: "Ring Lights Magnéticos",
    description:
      "Luz de preenchimento com encaixe MagSafe, espelho embutido e design dobrável para selfies e vídeos.",
  },
  gloss: {
    title: "Brilho Labial",
    description:
      "Efeito espelho 3D, fórmula à prova de água e textura não pegajosa. Kit com as cores disponíveis.",
  },
  tripes: {
    title: "Tripés e Suportes",
    description:
      "Tripé e vara de selfie com luz de preenchimento e comando Bluetooth remoto — 3 em 1 para criar conteúdo.",
  },
};

export default function Home() {
  const featuredByCategory = (
    ["carteiras", "microfones", "iluminacao", "gloss", "tripes"] as Product["category"][]
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

  const carteiraDestaque = products.find(
    (p) => p.slug === "carteira-magnetica-gerle-textura-preta"
  );
  const ringLightDestaque = products.find(
    (p) => p.slug === "ring-light-magnetico-3-em-1"
  );
  const glossDestaque = products.find(
    (p) => p.slug === "brilho-labial-3d-kiko"
  );

  return (
    <div className="flex flex-col gap-20">
      <section className="grid items-center gap-10 sm:grid-cols-2">
        <div className="animate-fade-up flex flex-col gap-6">
          <span className="w-fit rounded-full border border-[var(--accent)]/40 bg-[var(--accent-soft)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--accent-dark)]">
            Nova coleção
          </span>
          <h1 className="font-serif text-4xl leading-[1.1] text-[var(--foreground)] sm:text-5xl">
            Detalhes que fazem a diferença no seu dia a dia
          </h1>
          <p className="max-w-md text-[15px] leading-relaxed text-[var(--muted)]">
            Carteiras magnéticas com acabamento premium para o seu iPhone,
            microfones de lapela, ring lights magnéticos e kits de tripé para
            quem cria conteúdo. Qualidade que se sente ao toque.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/produtos"
              className="rounded-full bg-[var(--foreground)] px-6 py-3 text-[13px] font-medium uppercase tracking-wide text-white transition-colors hover:bg-[var(--accent-dark)]"
            >
              Ver Coleção
            </Link>
            <Link
              href="/produtos?categoria=carteiras"
              className="link-underline text-[13px] font-medium uppercase tracking-wide text-[var(--foreground)]"
            >
              Carteiras →
            </Link>
            <Link
              href="/produtos?categoria=microfones"
              className="link-underline text-[13px] font-medium uppercase tracking-wide text-[var(--foreground)]"
            >
              Microfones →
            </Link>
            <Link
              href="/produtos?categoria=iluminacao"
              className="link-underline text-[13px] font-medium uppercase tracking-wide text-[var(--foreground)]"
            >
              Ring Lights →
            </Link>
            <Link
              href="/produtos?categoria=gloss"
              className="link-underline text-[13px] font-medium uppercase tracking-wide text-[var(--foreground)]"
            >
              Brilho Labial →
            </Link>
            <Link
              href="/produtos?categoria=tripes"
              className="link-underline text-[13px] font-medium uppercase tracking-wide text-[var(--foreground)]"
            >
              Tripés →
            </Link>
          </div>
        </div>

        <div className="relative grid grid-cols-2 gap-4">
          <div
            className="pointer-events-none absolute -inset-6 -z-10 rounded-full opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, var(--accent-soft) 0%, transparent 70%)",
            }}
          />

          {carteiraDestaque && (
            <Link
              href={`/produtos/${carteiraDestaque.slug}`}
              className="group relative block"
            >
              <ProductImage
                color={carteiraDestaque.color}
                emoji={carteiraDestaque.emoji}
                image={carteiraDestaque.image}
                alt={carteiraDestaque.name}
                priority
                className="h-64 rounded-sm shadow-[0_25px_50px_-20px_rgba(28,26,23,0.35)] transition-transform duration-500 group-hover:-translate-y-1 sm:h-[21.5rem]"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-medium text-[var(--foreground)] shadow-sm backdrop-blur">
                {getCategoryLabel(carteiraDestaque.category)} · {formatPrice(carteiraDestaque.price)}
              </span>
            </Link>
          )}

          <div className="mt-8 flex flex-col gap-4">
            {ringLightDestaque && (
              <Link
                href={`/produtos/${ringLightDestaque.slug}`}
                className="group relative block"
              >
                <ProductImage
                  color={ringLightDestaque.color}
                  emoji={ringLightDestaque.emoji}
                  image={ringLightDestaque.image}
                  alt={ringLightDestaque.name}
                  className="h-32 rounded-sm shadow-[0_20px_40px_-20px_rgba(28,26,23,0.3)] transition-transform duration-500 group-hover:-translate-y-1 sm:h-40"
                />
                <span className="absolute bottom-2 left-2 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-medium text-[var(--foreground)] shadow-sm backdrop-blur">
                  {getCategoryLabel(ringLightDestaque.category)}
                </span>
              </Link>
            )}
            {glossDestaque && (
              <Link
                href={`/produtos/${glossDestaque.slug}`}
                className="group relative block"
              >
                <ProductImage
                  color={glossDestaque.color}
                  emoji={glossDestaque.emoji}
                  image={glossDestaque.image}
                  alt={glossDestaque.name}
                  className="h-32 rounded-sm shadow-[0_20px_40px_-20px_rgba(28,26,23,0.3)] transition-transform duration-500 group-hover:-translate-y-1 sm:h-40"
                />
                <span className="absolute bottom-2 left-2 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-medium text-[var(--foreground)] shadow-sm backdrop-blur">
                  {getCategoryLabel(glossDestaque.category)}
                </span>
              </Link>
            )}
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="flex flex-col gap-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
              Seleção da casa
            </p>
            <h2 className="mt-1 font-serif text-2xl text-[var(--foreground)]">
              Destaques
            </h2>
          </div>
          <Link
            href="/produtos"
            className="link-underline text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {destaques.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(Object.keys(categoryContent) as Product["category"][]).map(
          (category) => (
            <Link
              key={category}
              href={`/produtos?categoria=${category}`}
              className="group flex flex-col justify-between overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--surface)] p-8 transition-shadow hover:shadow-[0_20px_40px_-15px_rgba(28,26,23,0.18)]"
            >
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
                  Categoria
                </p>
                <h3 className="mt-2 font-serif text-2xl text-[var(--foreground)]">
                  {categoryContent[category].title}
                </h3>
                <p className="mt-2 max-w-sm text-sm text-[var(--muted)]">
                  {categoryContent[category].description}
                </p>
              </div>
              <span className="link-underline mt-6 w-fit text-sm font-medium text-[var(--foreground)]">
                Explorar coleção →
              </span>
            </Link>
          )
        )}
      </section>
    </div>
  );
}
