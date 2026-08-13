import Link from "next/link";
import Image from "next/image";

export interface CategoryCircleItem {
  id: string;
  title: string;
  image: string;
  /** Rótulo curto para o "selo" sobre o cartão (ex.: "Tripés" em vez de
   * "Tripés e Suportes"). Cai para `title` se não for indicado. */
  shortTitle?: string;
}

/** Cartões de categoria em "cápsula" com a foto a preencher o cartão e um
 * selo branco sobreposto na base com o nome — estilo app de marketplace
 * (referência enviada pelo dono da loja: cartão "CÃES" com foto a sair por
 * cima e selo em nuvem por baixo). Em telas pequenas faz scroll lateral com
 * snap em vez de quebrar linha; a partir de "sm" vira grelha. */
export default function CategoryCircles({
  categories,
}: {
  categories: CategoryCircleItem[];
}) {
  return (
    <div className="scrollbar-hide flex snap-x snap-mandatory gap-x-4 gap-y-4 overflow-x-auto px-1 pb-4 pt-1 sm:grid sm:grid-cols-4 sm:gap-x-5 sm:overflow-visible sm:pb-2">
      {categories.map((category, index) => (
        <Link
          key={category.id}
          href={`/produtos?categoria=${category.id}`}
          className="animate-fade-up group relative w-32 shrink-0 snap-start sm:w-auto"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <span className="relative block aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-white ring-1 ring-[var(--border)] transition-transform duration-300 group-hover:scale-[1.03] sm:rounded-[2.5rem]">
            <Image
              src={category.image}
              alt={category.title}
              fill
              sizes="(min-width: 640px) 220px, 128px"
              className="object-cover object-center"
            />
          </span>
          <span className="absolute inset-x-3 -bottom-3 flex min-h-11 items-center justify-center rounded-full bg-white px-3 py-2 text-center text-xs font-bold leading-tight text-[var(--accent-dark)] shadow-[0_10px_20px_-8px_rgba(28,26,23,0.3)] transition-colors duration-300 group-hover:text-[var(--accent)]">
            {category.shortTitle ?? category.title}
          </span>
        </Link>
      ))}
    </div>
  );
}
