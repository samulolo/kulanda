"use client";

import { useState } from "react";
import Image from "next/image";
import ProductZoom from "./ProductZoom";

interface ProductGalleryProps {
  color: string;
  emoji: string;
  images: string[];
  alt: string;
  className?: string;
  iconClassName?: string;
}

/** Galeria com miniaturas para produtos com mais de uma foto (ex: kits com várias cores). */
export default function ProductGallery({
  color,
  emoji,
  images,
  alt,
  className = "",
  iconClassName,
}: ProductGalleryProps) {
  const [selecionada, setSelecionada] = useState(images[0]);

  return (
    <div className="flex flex-col gap-3">
      <ProductZoom
        color={color}
        emoji={emoji}
        image={selecionada}
        alt={alt}
        className={className}
        iconClassName={iconClassName}
      />

      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img) => (
            <button
              key={img}
              type="button"
              onClick={() => setSelecionada(img)}
              aria-label={`Ver foto ${alt}`}
              aria-current={img === selecionada}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-sm border transition-colors ${
                img === selecionada
                  ? "border-[var(--accent)]"
                  : "border-[var(--border)] hover:border-[var(--muted)]"
              }`}
            >
              <Image src={img} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
