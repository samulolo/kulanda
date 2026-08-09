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
      "Material Finewoven, ímã MagSafe forte e caixa oficial inclusa, para diversos modelos de iPhone.",
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
    span: "lg:col-span-2",
  },
  {
    id: "gloss",
    title: "Brilho Labial",
    description:
      "Efeito espelho 3D, fórmula à prova de água e textura não pegajosa. Kit com as cores disponíveis.",
    image: "/products/brilho-labial-3d-kiko-rosa.webp",
    span: "lg:col-span-2",
  },
  {
    id: "tripes",
    title: "Tripés e Suportes",
    description:
      "Tripé e vara de selfie com luz de preenchimento e comando Bluetooth remoto — 3 em 1 para criar conteúdo.",
    image: "/products/tripe-selfie-stick-em-uso.webp",
    span: "lg:col-span-2",
  },
];

export default async function Home() {
  const products = await getAllProducts();

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

  const cardProduct = products.find(
    (p) => p.slug === "carteira-magnetica-gerle-cinza"
  );

  return (
    <div className="flex flex-col gap-20">
      <section className="flex flex-col gap-6">
        <div className="animate-fade-up relative isolate overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-25px_rgba(28,26,23,0.35)]">
          <div className="relative h-[440px] w-full sm:h-[540px]">
            <Image
              src="/hero/carteira-hero-banner.webp"
              alt="Carteira magnética Kulanda em destaque"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

            <span className="absolute left-6 top-6 w-fit rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur sm:left-8 sm:top-8">
              Nova coleção
            </span>

            <h1
              className="pointer-events-none absolute inset-x-0 top-[40%] -translate-y-1/2 select-none whitespace-nowrap text-center font-sans text-[19vw] font-extrabold uppercase leading-none tracking-tight text-white sm:text-[8.5vw]"
              style={{ mixBlendMode: "overlay" }}
            >
              Estilo Sem Limites
            </h1>

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:max-w-xs sm:p-10">
              <p className="text-[15px] leading-relaxed text-white/90">
                Carteiras magnéticas com acabamento premium, ímã MagSafe
                forte e design que acompanha o seu ritmo.
              </p>
              <Link
                href="/produtos"
                className="btn-lift w-fit rounded-full bg-white px-6 py-3 text-[13px] font-medium uppercase tracking-wide text-[var(--foreground)] transition-colors hover:bg-[var(--accent-soft)]"
              >
                Ver Coleção
              </Link>
            </div>

            {cardProduct && (
              <Link
                href={`/produtos/${cardProduct.slug}`}
                className="group absolute bottom-6 right-6 hidden w-56 items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_20px_40px_-15px_rgba(28,26,23,0.4)] transition-transform duration-300 hover:-translate-y-1 sm:flex"
              >
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[var(--surface)]">
                  <Image
                    src="/hero/carteira-hero-banner.webp"
                    alt={cardProduct.name}
                    fill
                    sizes="56px"
                    className="object-cover object-center"
                  />
                </span>
                <span className="flex items-center gap-1.5 text-[13px] font-medium leading-snug text-[var(--foreground)]">
                  Ver Detalhes do Produto
                  <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
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
            href="/produtos?categoria=gloss"
            className="rounded-full border border-[var(--border)] px-4 py-2 text-[13px] font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-dark)]"
          >
            Brilho Labial
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
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
            Explorar
          </p>
          <h2 className="mt-1 font-serif text-2xl text-[var(--foreground)]">
            Categorias
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {categoryTiles.map((category, index) => (
            <Link
              key={category.id}
              href={`/produtos?categoria=${category.id}`}
              className={`animate-fade-up group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_50px_-20px_rgba(28,26,23,0.25)] ${category.span}`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="relative h-48 w-full overflow-hidden sm:h-56">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-4 p-6">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
                    Categoria
                  </p>
                  <h3 className="mt-1 font-serif text-xl text-[var(--foreground)] transition-colors group-hover:text-[var(--accent-dark)]">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    {category.description}
                  </p>
                </div>
                <span className="link-underline flex w-fit items-center gap-1 text-sm font-medium text-[var(--foreground)]">
                  Explorar coleção
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
