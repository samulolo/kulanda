import Link from "next/link";
import Image from "next/image";

export interface CategoryCircleItem {
  id: string;
  title: string;
  image: string;
}

/** Fila de categorias em círculo (foto do produto + nome por baixo), usada
 * na homepage. Em telas pequenas faz scroll lateral com snap em vez de
 * quebrar linha; a partir de "sm" vira grelha. */
export default function CategoryCircles({
  categories,
}: {
  categories: CategoryCircleItem[];
}) {
  return (
    <div className="scrollbar-hide flex snap-x snap-mandatory gap-x-5 gap-y-4 overflow-x-auto pb-1 sm:grid sm:grid-cols-4 sm:overflow-visible sm:pb-0">
      {categories.map((category, index) => (
        <Link
          key={category.id}
          href={`/produtos?categoria=${category.id}`}
          className="animate-fade-up group flex w-16 shrink-0 snap-start flex-col items-center gap-2 text-center sm:w-auto"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-[var(--border)] transition-transform duration-300 group-hover:scale-105 sm:h-20 sm:w-20">
            <span className="absolute inset-2">
              <Image
                src={category.image}
                alt=""
                fill
                sizes="80px"
                className="object-contain"
              />
            </span>
          </span>
          <span className="text-xs font-medium leading-snug text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--accent)]">
            {category.title}
          </span>
        </Link>
      ))}
    </div>
  );
}
