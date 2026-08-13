import type { Metadata } from "next";
import Link from "next/link";
import ProductsCatalog from "@/components/ProductsCatalog";
import { getCategories, getProductsByCategory, getCategoryLabel, type Category } from "@/lib/products";
import { SITE_NAME } from "@/lib/site";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}): Promise<Metadata> {
  const { categoria } = await searchParams;
  const categories = await getCategories();
  const categoriaValida = categories.some((c) => c.id === categoria)
    ? (categoria as Category)
    : undefined;

  const title = categoriaValida
    ? await getCategoryLabel(categoriaValida)
    : "Todos os produtos";
  const description = categoriaValida
    ? `Confira a coleção de ${(await getCategoryLabel(categoriaValida)).toLowerCase()} da ${SITE_NAME}.`
    : `Explore toda a coleção ${SITE_NAME}: carteiras magnéticas, microfones de lapela e ring lights magnéticos.`;
  const canonical = categoriaValida
    ? `/produtos?categoria=${categoriaValida}`
    : "/produtos";

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
  };
}

export default async function ProdutosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const categories = await getCategories();
  const categoriaValida = categories.some((c) => c.id === categoria)
    ? (categoria as Category)
    : undefined;

  const produtos = await getProductsByCategory(categoriaValida);
  const tituloCategoria = categoriaValida
    ? categories.find((c) => c.id === categoriaValida)?.label ?? categoriaValida
    : "Todos os produtos";

  return (
    <div className="flex flex-col gap-10">
      <div className="border-b border-[var(--border)] pb-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
          Catálogo
        </p>
        <h1 className="mt-1 font-serif text-3xl text-[var(--foreground)]">
          {tituloCategoria}
        </h1>

        <div className="mt-5 flex overflow-x-scroll gap-2">
          <Link
            href="/produtos"
            className={`rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide transition-colors ${
              !categoriaValida
                ? "border-[var(--foreground)] bg-[var(--foreground)] text-white"
                : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            Todos
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/produtos?categoria=${c.id}`}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide transition-colors ${
                categoriaValida === c.id
                  ? "border-[var(--foreground)] bg-[var(--foreground)] text-white"
                  : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>

      <ProductsCatalog products={produtos} />
    </div>
  );
}
