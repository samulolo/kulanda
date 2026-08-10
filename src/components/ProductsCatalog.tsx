"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { Product } from "@/lib/products";
import ProductCard from "./ProductCard";

interface ProductsCatalogProps {
  products: Product[];
}

export default function ProductsCatalog({ products }: ProductsCatalogProps) {
  const [termo, setTermo] = useState("");

  const filtrados = useMemo(() => {
    const query = termo.trim().toLowerCase();
    if (!query) return products;
    return products.filter((p) =>
      [p.name, p.description, ...p.features].some((texto) =>
        texto.toLowerCase().includes(query)
      )
    );
  }, [termo, products]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            strokeWidth={1.6}
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]"
          />
          <input
            type="search"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            placeholder="Pesquisar produtos…"
            aria-label="Pesquisar produtos"
            className="w-full rounded-full border border-[var(--border)] bg-[var(--surface)] py-2.5 pl-9 pr-9 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
          />
          {termo && (
            <button
              type="button"
              onClick={() => setTermo("")}
              aria-label="Limpar pesquisa"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              <X className="h-4 w-4" strokeWidth={1.8} />
            </button>
          )}
        </div>

        <p className="text-sm text-[var(--muted)]">
          {filtrados.length} produto{filtrados.length !== 1 ? "s" : ""}{" "}
          encontrado{filtrados.length !== 1 ? "s" : ""}
        </p>
      </div>

      {filtrados.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <p className="text-sm text-[var(--muted)]">
            Sem resultados para "{termo}".
          </p>
          <button
            type="button"
            onClick={() => setTermo("")}
            className="link-underline text-sm text-[var(--foreground)]"
          >
            Limpar pesquisa
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {filtrados.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
