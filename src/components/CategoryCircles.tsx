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

/** Cartões de categoria com efeito 3D: o produto (foto recortada, sem
 * fundo) "sai" para fora do cartão por cima em vez de ficar contido lá
 * dentro — pedido do dono da loja depois de ver referências de apps de
 * pet shop/marketplace com esse efeito de figura a saltar do cartão. A
 * sombra acompanha o contorno real do produto (drop-shadow, não box-shadow)
 * para reforçar a sensação de profundidade. Em telas pequenas faz scroll
 * lateral com snap em vez de quebrar linha; a partir de "sm" vira grelha. */
export default function CategoryCircles({
  categories,
}: {
  categories: CategoryCircleItem[];
}) {
  return (
    <div className="scrollbar-hide flex snap-x snap-mandatory gap-x-4 gap-y-4 overflow-x-auto px-1 pb-4 pt-6 sm:grid sm:grid-cols-3 sm:gap-x-5 sm:overflow-visible sm:pb-2 md:grid-cols-5">
      {categories.map((category, index) => (
        <Link
          key={category.id}
          href={`/produtos?categoria=${category.id}`}
          className="animate-fade-up group relative w-32 shrink-0 snap-start sm:w-auto"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          {/* Base do cartão: fica atrás, só a parte inferior do produto
             "pousa" visualmente dentro dela. */}
          <span className="relative block h-36 w-full rounded-[1.75rem] bg-[var(--accent-soft)]/70 ring-1 ring-[var(--border)] transition-transform duration-300 group-hover:scale-[1.03] sm:h-44 sm:rounded-[2rem]">
            {/* Imagem: maior que o cartão e deslocada para cima, para
               "escapar" pelo topo. overflow visível de propósito. */}
            <span className="absolute inset-x-2 -top-7 bottom-3 sm:-top-9 sm:bottom-4">
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="(min-width: 640px) 220px, 128px"
                className="object-contain object-bottom drop-shadow-[0_18px_14px_rgba(28,26,23,0.35)]"
              />
            </span>
          </span>
          <span className="absolute inset-x-3 -bottom-3 flex min-h-11 items-center justify-center rounded-full bg-white px-3 py-2 text-center text-xs font-bold leading-tight text-[var(--accent-dark)] shadow-[0_10px_20px_-8px_rgba(28,26,23,0.3)] transition-colors duration-300 group-hover:text-[var(--accent)]">
            {category.shortTitle ?? category.title}
          </span>
        </Link>
      ))}
    </div>
  );
}
