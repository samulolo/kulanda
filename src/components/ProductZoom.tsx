"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ZoomIn, X, Minus, Plus } from "lucide-react";
import ProductImage from "./ProductImage";

interface ProductZoomProps {
  color: string;
  emoji: string;
  image?: string;
  alt?: string;
  className?: string;
  iconClassName?: string;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;

export default function ProductZoom({
  color,
  emoji,
  image,
  alt = "",
  className = "",
  iconClassName,
}: ProductZoomProps) {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1.8);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function openModal() {
    if (!image) return;
    setScale(1.8);
    setPos({ x: 0, y: 0 });
    setOpen(true);
  }

  function adjustScale(delta: number) {
    setScale((s) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s + delta)));
  }

  function handleWheel(e: React.WheelEvent) {
    e.preventDefault();
    adjustScale(-e.deltaY * 0.0025);
  }

  function handlePointerDown(e: React.PointerEvent) {
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    setPos((p) => ({ x: p.x + dx, y: p.y + dy }));
  }

  function stopDragging() {
    dragging.current = false;
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        disabled={!image}
        aria-label={image ? `Ampliar imagem de ${alt}` : undefined}
        className={`group relative block w-full text-left ${
          image ? "cursor-zoom-in" : "cursor-default"
        }`}
      >
        <ProductImage
          color={color}
          emoji={emoji}
          image={image}
          alt={alt}
          className={className}
          iconClassName={iconClassName}
        />
        {image && (
          <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-[var(--foreground)] opacity-0 shadow-sm backdrop-blur transition-opacity duration-200 group-hover:opacity-100">
            <ZoomIn className="h-3.5 w-3.5" />
            Ampliar
          </span>
        )}
      </button>

      {open && image && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fechar"
            className="absolute right-5 top-5 text-white/70 transition-colors hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className="relative h-full max-h-[80vh] w-full max-w-3xl touch-none overflow-hidden rounded-sm bg-[var(--surface)]"
            onClick={(e) => e.stopPropagation()}
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerLeave={stopDragging}
            style={{ cursor: scale > 1 ? "grab" : "default" }}
          >
            <Image
              src={image}
              alt={alt}
              fill
              draggable={false}
              sizes="90vw"
              className="select-none object-contain transition-transform duration-100 ease-out"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
              }}
            />
          </div>

          <div
            className="mt-4 flex items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => adjustScale(-0.5)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
              aria-label="Diminuir zoom"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-12 text-center text-xs text-white/60">
              {Math.round(
                ((scale - MIN_SCALE) / (MAX_SCALE - MIN_SCALE)) * 100
              )}
              %
            </span>
            <button
              type="button"
              onClick={() => adjustScale(0.5)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
              aria-label="Aumentar zoom"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-xs text-white/40">
            Arraste para mover · Scroll para ampliar · Esc para fechar
          </p>
        </div>
      )}
    </>
  );
}
