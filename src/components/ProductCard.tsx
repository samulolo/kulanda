import Link from "next/link";
import { Product, formatPrice, getCategoryLabel } from "@/lib/products";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/produtos/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(28,26,23,0.18)]"
    >
      <div className="relative">
        <ProductImage
          color={product.color}
          emoji={product.emoji}
          image={product.image}
          alt={product.name}
          className="h-56 w-full"
          iconClassName="h-20 w-20 transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-2 top-2 rounded-full bg-[var(--foreground)] px-2.5 py-1 text-[9px] font-medium uppercase tracking-wide text-white sm:left-3 sm:top-3 sm:px-3 sm:text-[11px]">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:gap-2 sm:p-5">
        <p className="text-[9px] font-medium uppercase tracking-[0.1em] text-[var(--accent)] sm:text-[11px] sm:tracking-[0.12em]">
          {getCategoryLabel(product.category)}
        </p>
        <h3 className="line-clamp-2 font-serif text-sm leading-snug text-[var(--foreground)] sm:text-lg">
          {product.name}
        </h3>
        <div className="mt-auto flex flex-wrap items-baseline gap-1.5 pt-1 sm:gap-2 sm:pt-2">
          {product.compareAtPrice && (
            <span className="text-xs text-[var(--muted)] line-through sm:text-sm">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
          <span className="text-sm font-semibold text-[var(--foreground)] sm:text-base">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </Link>
  );
}
