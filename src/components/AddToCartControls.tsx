"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, Check } from "lucide-react";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

export default function AddToCartControls({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();
  const minQuantity = product.minQuantity ?? 1;
  const [quantity, setQuantity] = useState(minQuantity);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  function handleBuyNow() {
    addItem(product, quantity);
    router.push("/carrinho");
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-full border border-[var(--border)]">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(minQuantity, q - 1))}
            className="flex items-center justify-center px-4 py-2.5 text-[var(--foreground)] transition-colors hover:text-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Diminuir quantidade"
            disabled={quantity <= minQuantity}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-sm font-medium">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() =>
              setQuantity((q) => Math.min(product.stock, q + 1))
            }
            className="flex items-center justify-center px-4 py-2.5 text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
            aria-label="Aumentar quantidade"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <span className="text-sm text-[var(--muted)]">
          {product.stock} em estoque
          {minQuantity > 1 && ` · mínimo de ${minQuantity} unidades`}
        </span>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleAdd}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[var(--foreground)] px-5 py-3.5 text-[13px] font-medium uppercase tracking-wide text-[var(--foreground)] transition-colors hover:bg-[var(--foreground)] hover:text-white"
        >
          {added && <Check className="h-3.5 w-3.5" />}
          {added ? "Adicionado" : "Adicionar ao carrinho"}
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          className="flex-1 rounded-full bg-[var(--foreground)] px-5 py-3.5 text-[13px] font-medium uppercase tracking-wide text-white transition-colors hover:bg-[var(--accent-dark)]"
        >
          Comprar agora
        </button>
      </div>
    </div>
  );
}
