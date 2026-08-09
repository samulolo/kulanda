import Link from "next/link";
import { Product } from "@/lib/products";

interface ColorSwatchesProps {
  current: Product;
  variants: Product[];
}

export default function ColorSwatches({ current, variants }: ColorSwatchesProps) {
  if (variants.length <= 1) return null;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
        Cores disponíveis
      </p>
      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => {
          const isActive = variant.slug === current.slug;
          return (
            <Link
              key={variant.slug}
              href={`/produtos/${variant.slug}`}
              aria-label={variant.colorLabel ?? variant.name}
              title={variant.colorLabel ?? variant.name}
              className={`group flex flex-col items-center gap-1.5 ${
                isActive ? "" : "opacity-80 hover:opacity-100"
              }`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors ${
                  isActive
                    ? "border-[var(--accent)]"
                    : "border-transparent group-hover:border-[var(--border)]"
                }`}
              >
                <span
                  className="h-7 w-7 rounded-full border border-black/10"
                  style={{ background: variant.color }}
                />
              </span>
              <span
                className={`text-[11px] ${
                  isActive
                    ? "font-medium text-[var(--foreground)]"
                    : "text-[var(--muted)]"
                }`}
              >
                {variant.colorLabel ?? variant.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
