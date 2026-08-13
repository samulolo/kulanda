import Image from "next/image";
import { Smartphone, Mic, Wallet, Aperture, Sparkles, Video } from "lucide-react";

interface ProductImageProps {
  color: string;
  emoji: string;
  image?: string;
  hoverImage?: string;
  alt?: string;
  className?: string;
  iconClassName?: string;
  sizes?: string;
  priority?: boolean;
  bordered?: boolean;
  /** "cover" preenche a caixa (pode cortar); "contain" mostra o produto inteiro. */
  fit?: "cover" | "contain";
  /** Respiro interno antes da foto — só faz sentido com fit="contain". */
  imagePadding?: string;
  /** Cor de fundo por trás da foto. Por omissão a superfície neutra branca;
   * pode passar-se um tom diferente (ex.: o mesmo bege suave dos cartões de
   * categoria) para os cartões de produto. */
  bgClassName?: string;
}

export default function ProductImage({
  color,
  emoji,
  image,
  hoverImage,
  alt = "",
  className = "",
  iconClassName = "h-24 w-24",
  sizes = "(max-width: 768px) 50vw, 400px",
  priority = false,
  bordered = true,
  fit = "cover",
  imagePadding = "",
  bgClassName = "bg-[var(--surface)]",
}: ProductImageProps) {
  if (image) {
    const fitClass = fit === "contain" ? "object-contain" : "object-cover";
    return (
      <div
        className={`relative overflow-hidden ${bgClassName} ${
          bordered ? "border border-[var(--border)]" : ""
        } ${className}`}
      >
        <div className={`absolute inset-0 ${imagePadding}`}>
          <div className="relative h-full w-full">
            <Image
              src={image}
              alt={alt}
              fill
              sizes={sizes}
              priority={priority}
              className={
                hoverImage
                  ? `${fitClass} transition-opacity duration-500 ease-out group-hover:opacity-0`
                  : `${fitClass} transition-transform duration-500 ease-out group-hover:scale-[1.06]`
              }
            />
            {hoverImage && (
              <Image
                src={hoverImage}
                alt=""
                aria-hidden
                fill
                sizes={sizes}
                className={`absolute inset-0 ${fitClass} opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100`}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  const Icon =
    emoji === "🎙️"
      ? Mic
      : emoji === "👛"
        ? Wallet
        : emoji === "💡"
          ? Aperture
          : emoji === "💄"
            ? Sparkles
            : emoji === "🎥"
              ? Video
              : Smartphone;

  return (
    <div
      className={`grain-panel relative flex items-center justify-center ${
        bordered ? "border border-[var(--border)]" : ""
      } ${className}`}
      style={{
        background: `linear-gradient(155deg, ${color}12 0%, var(--surface) 55%, ${color}22 100%)`,
      }}
    >
      <div
        className="absolute inset-4 rounded-full opacity-40 blur-2xl"
        style={{ background: color }}
      />
      <Icon
        className={`relative text-[var(--foreground)] ${iconClassName}`}
        strokeWidth={1.4}
      />
    </div>
  );
}
