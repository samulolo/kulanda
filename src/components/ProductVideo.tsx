interface ProductVideoProps {
  src: string;
  title: string;
  poster?: string;
  className?: string;
}

export default function ProductVideo({
  src,
  title,
  poster,
  className = "",
}: ProductVideoProps) {
  return (
    <div
      className={`relative overflow-hidden border border-[var(--border)] bg-[var(--surface)] ${className}`}
    >
      <video
        title={title}
        aria-label={title}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        controls
        className="h-full w-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
