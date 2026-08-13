"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import { Heart, Check } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart-context";
import { useFavorites } from "@/lib/favorites-context";
import { getCardImage } from "@/lib/product-cutouts";
import ProductImage from "./ProductImage";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [added, setAdded] = useState(false);
  const wishlisted = isFavorite(product.slug);
  const hoverImage = product.images?.find((img) => img !== product.image);
  const cardImage = getCardImage(product.image);
  const cardHoverImage = getCardImage(hoverImage)?.src;

  function handleAddToCart(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.minQuantity ?? 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  function handleWishlist(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  }

  return (
    <Link
      href={`/produtos/${product.slug}`}
      className="animate-fade-up group flex flex-col gap-3 rounded-3xl border border-[var(--border)] p-3 shadow-[0_6px_16px_-10px_rgba(28,26,23,0.22)] transition-all duration-300 hover:border-[var(--accent)]/40 hover:shadow-[0_16px_30px_-14px_rgba(28,26,23,0.3)] sm:p-4"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <div className="relative">
        <ProductImage
          color={product.color}
          emoji={product.emoji}
          image={cardImage?.src ?? product.image}
          hoverImage={cardHoverImage ?? hoverImage}
          alt={product.name}
          bordered={false}
          fit="contain"
          imagePadding="p-6 sm:p-8"
          className="h-56 w-full rounded-2xl sm:h-72"
          iconClassName="h-20 w-20 transition-transform duration-500 group-hover:scale-105"
        />
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={wishlisted ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          aria-pressed={wishlisted}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[var(--foreground)] shadow-sm backdrop-blur transition-colors hover:text-red-500"
        >
          <Heart
            className={wishlisted ? "h-4 w-4 fill-red-500 text-red-500" : "h-4 w-4"}
            strokeWidth={1.8}
          />
        </button>
      </div>

      <div className="flex flex-col gap-1.5 px-1 pb-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-sm text-[var(--foreground)] transition-colors group-hover:text-[var(--muted)]">
            {product.name}
          </h3>
          <div className="flex shrink-0 flex-col items-end">
            {product.compareAtPrice && (
              <span className="text-xs text-[var(--muted)] line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            <span className="text-sm font-semibold text-[var(--foreground)]">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

        {product.features[0] && (
          <p className="line-clamp-1 text-xs text-[var(--muted)]">
            {product.features[0]}
          </p>
        )}

        <button
          type="button"
          onClick={handleAddToCart}
          className={`btn-lift mt-1 flex w-fit items-center justify-center gap-1.5 self-start rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
            added
              ? "border-[var(--accent)] bg-[var(--accent)] text-white"
              : "border-[var(--foreground)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-white"
          }`}
        >
          {added && <Check className="h-3 w-3" />}
          {added ? "Adicionado" : "Adicionar ao carrinho"}
        </button>
      </div>
    </Link>
  );
}
