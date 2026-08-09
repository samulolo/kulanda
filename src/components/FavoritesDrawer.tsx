"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, Heart, ShoppingBag } from "lucide-react";
import { useFavorites } from "@/lib/favorites-context";
import { formatPrice } from "@/lib/format";
import ProductImage from "./ProductImage";

export default function FavoritesDrawer() {
  const { favorites, isOpen, closeFavorites, removeFavorite } = useFavorites();

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeFavorites();
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeFavorites]);

  return (
    <>
      <div
        onClick={closeFavorites}
        aria-hidden
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Favoritos"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-[var(--background)] shadow-[-20px_0_60px_-20px_rgba(28,26,23,0.35)] transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-[var(--accent)]" strokeWidth={1.8} />
            <h2 className="font-serif text-lg text-[var(--foreground)]">Favoritos</h2>
          </div>
          <button
            type="button"
            onClick={closeFavorites}
            aria-label="Fechar favoritos"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--foreground)] transition-colors hover:bg-[var(--surface)]"
          >
            <X className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)]">
              <Heart strokeWidth={1.4} className="h-5 w-5 text-[var(--accent)]" />
            </div>
            <p className="text-sm text-[var(--muted)]">
              Ainda não guardaste nenhum produto nos favoritos.
            </p>
            <Link
              href="/produtos"
              onClick={closeFavorites}
              className="mt-1 rounded-full bg-[var(--foreground)] px-5 py-2.5 text-[13px] font-medium uppercase tracking-wide text-white transition-colors hover:bg-[var(--accent-dark)]"
            >
              Ver produtos
            </Link>
          </div>
        ) : (
          <div className="flex flex-1 flex-col divide-y divide-[var(--border)] overflow-y-auto">
            {favorites.map((product) => (
              <div key={product.slug} className="flex items-center gap-3 px-6 py-4">
                <Link
                  href={`/produtos/${product.slug}`}
                  onClick={closeFavorites}
                  className="shrink-0"
                >
                  <ProductImage
                    color={product.color}
                    emoji={product.emoji}
                    image={product.image}
                    alt={product.name}
                    bordered={false}
                    fit="contain"
                    imagePadding="p-2"
                    className="h-16 w-16 rounded-lg bg-[var(--surface)]"
                    iconClassName="h-7 w-7"
                    sizes="64px"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <Link
                    href={`/produtos/${product.slug}`}
                    onClick={closeFavorites}
                    className="link-underline line-clamp-2 text-sm text-[var(--foreground)]"
                  >
                    {product.name}
                  </Link>
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFavorite(product.slug)}
                  aria-label="Remover dos favoritos"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {favorites.length > 0 && (
          <div className="border-t border-[var(--border)] p-6">
            <Link
              href="/produtos"
              onClick={closeFavorites}
              className="btn-lift flex items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3.5 text-[13px] font-medium uppercase tracking-wide text-white transition-colors hover:bg-[var(--accent-dark)]"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.8} />
              Continuar a comprar
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
