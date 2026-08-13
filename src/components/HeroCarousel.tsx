"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export interface HeroSlide {
  id: string;
  image: string;
  imageAlt: string;
  badge: string;
  headline: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
  card?: {
    href: string;
    image?: string;
    name: string;
  };
}

const AUTO_ADVANCE_MS = 6000;

/** Hero rotativo da homepage — mostra várias categorias em vez de apostar
 * tudo numa só. Avança sozinho, mas pára em hover/foco e tem navegação por
 * pontos para quem quiser controlar. */
export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paused, slides.length]);

  const slide = slides[index];
  if (!slide) return null;

  return (
    <div
      className="animate-fade-up relative isolate overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-20px_rgba(28,26,23,0.4)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative h-[440px] w-full sm:h-[540px]">
        <Image
          key={slide.image}
          src={slide.image}
          alt={slide.imageAlt}
          fill
          priority={index === 0}
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent opacity-30" />

        <div key={slide.id}>
          <span className="animate-text-reveal absolute left-6 top-6 w-fit rounded-full border border-white/40 bg-white/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur sm:left-8 sm:top-8">
            {slide.badge}
          </span>

          <h1
            className="pointer-events-none absolute inset-x-0 top-[40%] -translate-y-1/2 select-none whitespace-nowrap text-center font-sans text-[19vw] font-extrabold uppercase leading-none tracking-tight text-white sm:text-[8.5vw] animate-text-reveal"
            style={{ mixBlendMode: "overlay" }}
          >
            {slide.headline}
          </h1>

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:max-w-xs sm:p-10 animate-slide-in-right">
            <p className="text-[15px] leading-relaxed text-white/95">{slide.description}</p>
            <Link
              href={slide.ctaHref}
              className="btn-lift w-fit rounded-full bg-white px-6 py-3 text-[13px] font-medium uppercase tracking-wide text-[var(--foreground)] transition-colors hover:bg-[var(--accent-soft)] hover:shadow-[0_12px_24px_-12px_rgba(28,26,23,0.35)]"
            >
              {slide.ctaLabel}
            </Link>
          </div>

          {slide.card && (
            <Link
              href={slide.card.href}
              className="group card-lift absolute bottom-6 right-6 hidden w-56 items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_20px_40px_-15px_rgba(28,26,23,0.4)] sm:flex animate-scale-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              {slide.card.image && (
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[var(--surface)] ring-1 ring-[var(--border)]">
                  <Image
                    src={slide.card.image}
                    alt={slide.card.name}
                    fill
                    sizes="56px"
                    className="object-cover object-center"
                  />
                </span>
              )}
              <span className="flex items-center gap-1.5 text-[13px] font-medium leading-snug text-[var(--foreground)]">
                Ver Detalhes do Produto
                <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          )}
        </div>

        {slides.length > 1 && (
          <div className="absolute right-6 top-6 z-10 flex gap-2 sm:right-8 sm:top-8">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ver destaque ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
