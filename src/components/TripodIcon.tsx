/** Ícone de tripé desenhado à mão (lucide-react não tem nenhum) — mesmo
 * estilo outline dos ícones lucide usados no resto do site (viewBox 24x24,
 * traço arredondado), para ficar visualmente consistente com Wallet, Mic
 * e Lightbulb nos cartões de categoria da homepage. */
export default function TripodIcon({
  className,
  strokeWidth = 1.6,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="7" y="2" width="10" height="6" rx="1.5" />
      <circle cx="12" cy="5" r="1.3" fill="currentColor" stroke="none" />
      <path d="M12 8v3" />
      <path d="M12 11 5 21" />
      <path d="M12 11v10" />
      <path d="M12 11 19 21" />
    </svg>
  );
}
