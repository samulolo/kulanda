import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import TrustBar from "@/components/TrustBar";
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

  const cardProduct = products.find(
    (p) => p.slug === "carteira-magnetica-gerle-cinza"
  );

  return (
    <div className="flex flex-col gap-20">
      <section className="flex flex-col gap-6">
        <div className="animate-fade-up relative isolate overflow-hidden rounded-3xl shadow-[0_30px_60px_-25px_rgba(28,26,23,0.35)]">
          <div className="relative h-[500px] w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1.3fr] gap-0 overflow-hidden">
            {/* Left Content Area */}
            <div className="relative flex flex-col justify-between bg-[var(--background)] p-6 sm:p-10 lg:p-12 z-10">
              {/* Trust Badge */}
              <div className="animate-text-reveal flex items-center gap-2 w-fit mb-8">
                <span className="text-lg">⭐</span>
                <span className="text-xs font-medium text-[var(--muted)] uppercase tracking-widest">
                  Escolha de 1200+ Criadores
                </span>
              </div>

              {/* Headline */}
              <div className="flex-1 flex flex-col justify-center gap-6">
                <h1
                  className="animate-text-reveal font-[var(--font-luxury)] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[var(--foreground)]"
                  style={{ animationDelay: '0.1s' }}
                >
                  Estilo Sem Limites
                </h1>

                <p
                  className="animate-text-reveal text-base sm:text-lg leading-relaxed text-[var(--muted)] max-w-sm"
                  style={{ animationDelay: '0.2s' }}
                >
                  Acessórios premium para criadores e profissionais que não abrem mão de qualidade. Tecnologia MagSafe, design apurado, confiança garantida.
                </p>

                {/* CTA Button */}
                <Link
                  href="/produtos"
                  className="animate-scale-in-up btn-lift w-fit px-8 py-4 rounded-lg bg-[var(--accent-premium)] text-white font-semibold text-base uppercase tracking-wide transition-all duration-300 hover:bg-[var(--accent-dark)] hover:shadow-[0_16px_32px_-8px_rgba(161,98,7,0.3)]"
                  style={{ animationDelay: '0.3s' }}
                >
                  Ver Coleção
                </Link>
              </div>

              {/* Accent Line */}
              <div className="animate-accent-width h-1 w-16 bg-[var(--accent-premium)] rounded-full mt-8 opacity-0" style={{ animationDelay: '0.5s' }} />
            </div>

            {/* Right Visual Area */}
            <div className="relative hidden sm:block lg:flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--accent-premium)]/20 via-[var(--accent-soft)] to-[var(--accent-premium)]/10">
              <Image
                src="/hero/carteira-hero-banner.webp"
                alt="Carteira magnética premium em destaque"
                fill
                priority
                sizes="(max-width: 640px) 0, (max-width: 1024px) 50vw, 65vw"
                className="object-cover object-center scale-110 group-hover:scale-120 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Featured Product Card */}
              {cardProduct && (
                <Link
                  href={`/produtos/${cardProduct.slug}`}
                  className="group card-lift animate-scale-in-up absolute bottom-6 right-6 w-56 items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_20px_40px_-15px_rgba(28,26,23,0.4)] flex"
                  style={{ animationDelay: '0.4s' }}
                >
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[var(--surface)] ring-2 ring-[var(--accent-premium)]/30">
                    <Image
                      src="/hero/carteira-hero-banner.webp"
                      alt={cardProduct.name}
                      fill
                      sizes="64px"
                      className="object-cover object-center"
                    />
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-[var(--foreground)]">
                      {cardProduct.name}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-medium text-[var(--accent-premium)] group-hover:text-[var(--accent-dark)] transition-colors">
                      Ver detalhes
                      <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="flex flex-col gap-8">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-2">
            <p className="animate-text-reveal text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--accent-premium)]">
              Seleção da Casa
            </p>
            <div className="flex items-center gap-4">
              <h2 className="animate-text-reveal font-[var(--font-luxury)] text-4xl sm:text-5xl font-bold text-[var(--foreground)]" style={{ animationDelay: '0.1s' }}>
                Destaques
              </h2>
              <div className="animate-accent-width h-1.5 w-16 bg-[var(--accent-premium)] rounded-full" style={{ animationDelay: '0.3s' }}></div>
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
        <div className="flex flex-col gap-2">
          <p className="animate-text-reveal text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--accent-premium)]">
            Explorar Categorias
          </p>
          <div className="flex items-center gap-4">
            <h2 className="animate-text-reveal font-[var(--font-luxury)] text-4xl sm:text-5xl font-bold text-[var(--foreground)]" style={{ animationDelay: '0.1s' }}>
              Categorias
            </h2>
            <div className="animate-accent-width h-1.5 w-16 bg-[var(--accent-premium)] rounded-full" style={{ animationDelay: '0.3s' }}></div>
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
                <span className="link-underline flex w-fit items-center gap-1.5 text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-300">
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
