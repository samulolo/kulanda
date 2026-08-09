"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ShoppingBag, Heart, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useFavorites } from "@/lib/favorites-context";
import type { CategoryInfo } from "@/lib/products";

interface HeaderProps {
  categories: CategoryInfo[];
}

export default function Header({ categories }: HeaderProps) {
  const { totalItems } = useCart();
  const { totalFavorites, openFavorites } = useFavorites();
  const [pulse, setPulse] = useState(false);
  const prevTotal = useRef(totalItems);

  const [categoriasAbertas, setCategoriasAbertas] = useState(false);
  const categoriasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (totalItems > prevTotal.current) {
      setPulse(true);
      const timeout = setTimeout(() => setPulse(false), 400);
      prevTotal.current = totalItems;
      return () => clearTimeout(timeout);
    }
    prevTotal.current = totalItems;
  }, [totalItems]);

  useEffect(() => {
    if (!categoriasAbertas) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        categoriasRef.current &&
        !categoriasRef.current.contains(e.target as Node)
      ) {
        setCategoriasAbertas(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setCategoriasAbertas(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [categoriasAbertas]);

  return (
    <>
      <div className="bg-[var(--foreground)] py-2 text-center text-[11px] uppercase tracking-[0.18em] text-white/70">
        Frete grátis em compras acima de €50 · Garantia de 30 dias
      </div>
      <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="font-serif text-xl tracking-tight text-[var(--foreground)] transition-opacity hover:opacity-80"
            >
              Kul<span className="italic text-[var(--accent)]">anda</span>
            </Link>

            <div ref={categoriasRef} className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setCategoriasAbertas((v) => !v)}
                aria-haspopup="true"
                aria-expanded={categoriasAbertas}
                className="flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-wide text-[var(--foreground)] transition-colors hover:text-[var(--accent-dark)]"
              >
                Categorias
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    categoriasAbertas ? "rotate-180" : ""
                  }`}
                  strokeWidth={1.8}
                />
              </button>

              {categoriasAbertas && (
                <div className="absolute left-0 top-full z-30 mt-3 w-64 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] py-2 shadow-[0_25px_50px_-20px_rgba(28,26,23,0.3)]">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/produtos?categoria=${category.id}`}
                      onClick={() => setCategoriasAbertas(false)}
                      className="flex items-center justify-between px-4 py-2.5 text-sm text-[var(--foreground)] transition-colors hover:bg-[var(--background)] hover:text-[var(--accent-dark)]"
                    >
                      {category.label}
                      <span className="text-[var(--muted)]">→</span>
                    </Link>
                  ))}
                  <div className="mt-1 border-t border-[var(--border)] pt-1">
                    <Link
                      href="/produtos"
                      onClick={() => setCategoriasAbertas(false)}
                      className="flex items-center px-4 py-2.5 text-sm font-medium text-[var(--accent-dark)] transition-colors hover:bg-[var(--background)]"
                    >
                      Ver todos os produtos
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openFavorites}
              aria-label="Ver favoritos"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)] transition-colors hover:border-[var(--foreground)]"
            >
              <Heart className="h-4 w-4" strokeWidth={1.6} />
              {totalFavorites > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-[11px] text-white">
                  {totalFavorites}
                </span>
              )}
            </button>

            <Link
              href="/carrinho"
              className="relative flex items-center gap-2 rounded-full border border-[var(--foreground)] px-5 py-2 text-[13px] font-medium uppercase tracking-wide text-[var(--foreground)] transition-colors hover:bg-[var(--foreground)] hover:text-white"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.6} />
              Carrinho
              {totalItems > 0 && (
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-[11px] text-white ${
                    pulse ? "animate-pulse-pop" : ""
                  }`}
                >
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
