import { Truck, ShieldCheck, CreditCard, RefreshCw } from "lucide-react";

const items = [
  { label: "Frete grátis acima de €50", Icon: Truck },
  { label: "Garantia de 30 dias", Icon: ShieldCheck },
  { label: "Pagamento seguro via Stripe", Icon: CreditCard },
  { label: "Troca fácil em até 7 dias", Icon: RefreshCw },
];

export default function TrustBar() {
  return (
    <div className="grid grid-cols-2 gap-6 border-y border-[var(--border)] py-8 sm:grid-cols-4">
      {items.map(({ label, Icon }) => (
        <div key={label} className="flex flex-col items-center gap-2 text-center">
          <Icon strokeWidth={1.4} className="h-6 w-6 text-[var(--accent)]" />
          <p className="text-xs text-[var(--muted)]">{label}</p>
        </div>
      ))}
    </div>
  );
}
