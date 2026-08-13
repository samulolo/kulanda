import Link from "next/link";
import Image from "next/image";

export interface PromoBannerProps {
  eyebrow: string;
  headline: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
  image?: string;
  imageAlt?: string;
}

/** Banner de promoção estilo "grande retalhista" (referência enviada pelo
 * dono da loja: bloco de cor cheia, produto sobre uma forma de contraste,
 * texto curto e directo, botão branco em pílula) — usado para anunciar a
 * secção "Em Promoção" na homepage em vez de um título simples. */
export default function PromoBanner({
  eyebrow,
  headline,
  description,
  ctaHref,
  ctaLabel,
  image,
  imageAlt = "",
}: PromoBannerProps) {
  return (
    <Link
      href={ctaHref}
      className="animate-fade-up group relative flex flex-col items-start gap-6 overflow-hidden rounded-[2rem] bg-[var(--accent)] px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-10"
    >
      <div className="flex items-center gap-5 sm:gap-6">
        {image && (
          <span className="relative hidden h-32 w-32 shrink-0 items-center justify-center rounded-[1.75rem] bg-[var(--accent-soft)] sm:flex sm:h-40 sm:w-40">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="160px"
              className="object-contain p-6 drop-shadow-[0_14px_12px_rgba(28,26,23,0.3)] transition-transform duration-300 group-hover:scale-105"
            />
          </span>
        )}
        <div className="flex flex-col gap-2 text-white">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/85">
            {eyebrow}
          </span>
          <h2 className="font-serif text-2xl font-bold leading-tight sm:text-3xl">
            {headline}
          </h2>
          <p className="text-sm text-white/90 sm:text-[15px]">{description}</p>
        </div>
      </div>

      <span className="btn-lift w-fit shrink-0 rounded-full bg-white px-6 py-3 text-[13px] font-semibold uppercase tracking-wide text-[var(--accent-dark)] transition-colors group-hover:bg-[var(--accent-soft)]">
        {ctaLabel}
      </span>
    </Link>
  );
}
