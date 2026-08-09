import { Lock, ShieldCheck, BadgeCheck } from "lucide-react";

const paymentMethods = ["Visa", "Mastercard", "MB WAY", "PayPal", "Apple Pay"];

/** Fila de métodos de pagamento aceites, usada no footer e no checkout. */
export function PaymentMethods({
  className = "",
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const pillClasses =
    variant === "dark"
      ? "border-white/15 text-white/60"
      : "border-[var(--border)] text-[var(--muted)]";

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {paymentMethods.map((method) => (
        <span
          key={method}
          className={`rounded-sm border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide ${pillClasses}`}
        >
          {method}
        </span>
      ))}
    </div>
  );
}

/** Selo compacto de pagamento seguro, usado perto de botões de compra. */
export function SecureCheckoutBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-2 text-xs text-[var(--muted)] ${className}`}
    >
      <Lock strokeWidth={1.6} className="h-3.5 w-3.5 text-[var(--accent)]" />
      Pagamento seguro e encriptado (SSL)
    </div>
  );
}

/** Bloco de selos de confiança usado na página de produto, acima do botão comprar. */
export function ProductTrustBadges({ className = "" }: { className?: string }) {
  const items = [
    { label: "Compra garantida", Icon: ShieldCheck },
    { label: "Pagamento seguro", Icon: Lock },
    { label: "Qualidade verificada", Icon: BadgeCheck },
  ];

  return (
    <div className={`flex flex-wrap gap-x-5 gap-y-2 ${className}`}>
      {items.map(({ label, Icon }) => (
        <div key={label} className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
          <Icon strokeWidth={1.6} className="h-3.5 w-3.5 text-[var(--accent)]" />
          {label}
        </div>
      ))}
    </div>
  );
}
