import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import TrustBar from "@/components/TrustBar";
import { products, Product } from "@/lib/products";

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
};

export default function Home() {
  const featuredByCategory = (
    ["carteiras", "microfones", "iluminacao", "gloss"] as Product["category"][]
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
    (p) => p.slug === "carteira-magnetica-couro-marrom"
  );
  const ringLightDestaque = products.find(
    (p) => p.slug === "ring-light-magnetico-3-em-1"
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
            microfones de lapela com áudio de estúdio e ring lights
            magnéticos para quem cria conteúdo. Qualidade que se sente ao
            toque.
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
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {carteiraDestaque && (
            <ProductImage
              color={carteiraDestaque.color}
              emoji={carteiraDestaque.emoji}
              image={carteiraDestaque.image}
              alt={carteiraDestaque.name}
              className="h-64 rounded-sm sm:h-72"
            />
          )}
          {ringLightDestaque && (
            <ProductImage
              color={ringLightDestaque.color}
              emoji={ringLightDestaque.emoji}
              image={ringLightDestaque.image}
              alt={ringLightDestaque.name}
              className="mt-8 h-64 rounded-sm sm:h-72"
            />
          )}
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

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
