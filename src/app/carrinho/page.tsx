"use client";

import Link from "next/link";
import { ShoppingBag, Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import ProductImage from "@/components/ProductImage";

export default function CarrinhoPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-28 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border)]">
          <ShoppingBag strokeWidth={1.4} className="h-6 w-6 text-[var(--accent)]" />
        </div>
        <h1 className="font-serif text-2xl text-[var(--foreground)]">Seu carrinho está vazio</h1>
        <p className="text-sm text-[var(--muted)]">
          Explore nossos produtos e encontre algo para você.
        </p>
        <Link
          href="/produtos"
          className="mt-2 rounded-full bg-[var(--foreground)] px-6 py-3 text-[13px] font-medium uppercase tracking-wide text-white transition-colors hover:bg-[var(--accent-dark)]"
        >
          Ver produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
          Sua sacola
        </p>
        <h1 className="mt-1 font-serif text-3xl text-[var(--foreground)]">Carrinho</h1>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="flex flex-col divide-y divide-[var(--border)] border-y border-[var(--border)] lg:col-span-2">
          {items.map((item) => (
            <div key={item.slug} className="flex flex-wrap items-center gap-3 py-4 sm:flex-nowrap sm:gap-4 sm:py-5">
              <ProductImage
                color={item.color}
                emoji={item.emoji}
                image={item.image}
                alt={item.name}
                className="h-16 w-16 shrink-0 rounded-sm sm:h-20 sm:w-20"
                iconClassName="h-7 w-7 sm:h-9 sm:w-9"
                sizes="80px"
              />
              <div className="flex min-w-[140px] flex-1 flex-col gap-1">
                <Link
                  href={`/produtos/${item.slug}`}
                  className="link-underline line-clamp-2 font-serif text-sm text-[var(--foreground)] sm:text-base"
                >
                  {item.name}
                </Link>
                <span className="text-xs text-[var(--muted)] sm:text-sm">
                  {formatPrice(item.price)} / un.
                  {item.minQuantity && item.minQuantity > 1
                    ? ` · mínimo ${item.minQuantity} un.`
                    : ""}
                </span>
              </div>

              <div className="flex items-center rounded-full border border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                  className="flex items-center justify-center px-2.5 py-1.5 text-[var(--foreground)] hover:text-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-40 sm:px-3"
                  aria-label="Diminuir quantidade"
                  disabled={item.quantity <= (item.minQuantity ?? 1)}
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-7 text-center text-xs font-medium sm:w-8 sm:text-sm">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                  className="flex items-center justify-center px-2.5 py-1.5 text-[var(--foreground)] hover:text-[var(--accent)] sm:px-3"
                  aria-label="Aumentar quantidade"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <span className="ml-auto text-right text-sm font-medium text-[var(--foreground)] sm:ml-0 sm:w-24 sm:text-base">
                {formatPrice(item.price * item.quantity)}
              </span>

              <button
                type="button"
                onClick={() => removeItem(item.slug)}
                className="flex items-center justify-center text-[var(--muted)] hover:text-red-600"
                aria-label="Remover item"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex h-fit flex-col gap-4 border border-[var(--border)] bg-[var(--surface)] p-7">
          <h2 className="font-serif text-lg text-[var(--foreground)]">Resumo do pedido</h2>
          <div className="flex justify-between text-sm text-[var(--muted)]">
            <span>Subtotal</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-sm text-[var(--muted)]">
            <span>Frete</span>
            <span>A calcular</span>
          </div>
          <div className="flex justify-between border-t border-[var(--border)] pt-4 font-semibold text-[var(--foreground)]">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <Link
            href="/checkout"
            className="btn-lift mt-2 rounded-full bg-[var(--foreground)] px-5 py-3.5 text-center text-[13px] font-medium uppercase tracking-wide text-white transition-colors hover:bg-[var(--accent-dark)]"
          >
            Finalizar compra
          </Link>
        </div>
      </div>
    </div>
  );
}
