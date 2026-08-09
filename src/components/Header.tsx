"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <>
      <div className="bg-[var(--foreground)] py-2 text-center text-[11px] uppercase tracking-[0.18em] text-white/70">
        Frete grátis em compras acima de €50 · Garantia de 30 dias
      </div>
      <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
          <Link
            href="/"
            className="font-serif text-xl tracking-tight text-[var(--foreground)]"
          >
            Kul<span className="italic text-[var(--accent)]">anda</span>
          </Link>

          <Link
            href="/carrinho"
            className="relative flex items-center gap-2 rounded-full border border-[var(--foreground)] px-5 py-2 text-[13px] font-medium uppercase tracking-wide text-[var(--foreground)] transition-colors hover:bg-[var(--foreground)] hover:text-white"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.6} />
            Carrinho
            {totalItems > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-[11px] text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </header>
    </>
  );
}
