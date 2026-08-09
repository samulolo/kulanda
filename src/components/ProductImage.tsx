import Image from "next/image";
import { Smartphone, Mic, Wallet, Aperture, Sparkles, Video } from "lucide-react";

interface ProductImageProps {
  color: string;
  emoji: string;
  image?: string;
  alt?: string;
  className?: string;
  iconClassName?: string;
  sizes?: string;
  priority?: boolean;
}

export default function ProductImage({
  color,
  emoji,
  image,
  alt = "",
  className = "",
  iconClassName = "h-24 w-24",
  sizes = "(max-width: 768px) 50vw, 400px",
  priority = false,
}: ProductImageProps) {
  if (image) {
    return (
      <div
        className={`relative overflow-hidden border border-[var(--border)] bg-[var(--surface)] ${className}`}
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
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
      className={`grain-panel relative flex items-center justify-center border border-[var(--border)] ${className}`}
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
