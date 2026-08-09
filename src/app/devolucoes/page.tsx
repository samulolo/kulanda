import type { Metadata } from "next";
import { ShieldCheck, RefreshCw, PackageCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Trocas, Devoluções e Garantia",
  description:
    "Como funcionam as trocas, devoluções e a garantia de 30 dias na Kulanda.",
  alternates: { canonical: "/devolucoes" },
};

const passos = [
  {
    title: "Garantia de 30 dias",
    description:
      "Todos os produtos têm 30 dias de garantia contra defeitos de fabrico, a contar da data de receção.",
    Icon: ShieldCheck,
  },
  {
    title: "Troca ou devolução em 14 dias",
    description:
      "Ao abrigo do direito de livre resolução, tem até 14 dias após a receção para pedir troca ou devolução, sem necessidade de indicar motivo, desde que o produto esteja por usar e na embalagem original.",
    Icon: RefreshCw,
  },
  {
    title: "Como pedir",
    description:
      "Envie um e-mail para geral@kulanda-store.com com o número da encomenda e o motivo da troca ou devolução. Indicamos os passos seguintes.",
    Icon: PackageCheck,
  },
];

export default function DevolucoesPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="max-w-2xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
          Legal
        </p>
        <h1 className="mt-1 font-serif text-3xl text-[var(--foreground)] sm:text-4xl">
          Trocas, Devoluções e Garantia
        </h1>
      </div>

      <div className="grid gap-8 sm:grid-cols-3">
        {passos.map(({ title, description, Icon }) => (
          <div key={title} className="flex flex-col gap-3">
            <Icon strokeWidth={1.4} className="h-6 w-6 text-[var(--accent)]" />
            <h2 className="font-serif text-lg text-[var(--foreground)]">
              {title}
            </h2>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              {description}
            </p>
          </div>
        ))}
      </div>

      <p className="max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        O valor da devolução é reembolsado através do mesmo método de
        pagamento utilizado na compra, após a receção e verificação do
        produto devolvido.
      </p>
    </div>
  );
}
