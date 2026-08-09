import type { Metadata } from "next";
import { ShieldCheck, Gem, Package } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre nós",
  description:
    "Conheça a Kulanda: uma marca focada em acessórios essenciais para iPhone e criadores de conteúdo, com atenção ao detalhe em cada produto.",
  alternates: { canonical: "/sobre" },
};

const pilares = [
  {
    title: "Curadoria cuidadosa",
    description:
      "Cada produto do catálogo é escolhido a dedo pela qualidade de acabamento, encaixe magnético e durabilidade — não vendemos tudo, vendemos o que vale a pena.",
    Icon: Gem,
  },
  {
    title: "Qualidade verificada",
    description:
      "Testamos o ajuste MagSafe, a resistência dos materiais e o funcionamento de cada peça antes de a colocarmos à venda.",
    Icon: ShieldCheck,
  },
  {
    title: "Embalagem cuidada",
    description:
      "Os produtos chegam bem protegidos, prontos a usar, com a caixa original sempre que aplicável.",
    Icon: Package,
  },
];

export default function SobrePage() {
  return (
    <div className="flex flex-col gap-14">
      <div className="max-w-2xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
          A marca
        </p>
        <h1 className="mt-1 font-serif text-3xl text-[var(--foreground)] sm:text-4xl">
          Sobre a Kulanda
        </h1>
        <p className="mt-5 leading-relaxed text-[var(--muted)]">
          A Kulanda nasceu de uma ideia simples: os acessórios do dia a dia —
          a carteira que guarda os cartões, o microfone que capta a voz, a
          luz que ilumina um vídeo — merecem o mesmo cuidado de design que o
          próprio iPhone. Por isso selecionamos um catálogo pequeno e
          intencional, em vez de vender de tudo um pouco.
        </p>
        <p className="mt-4 leading-relaxed text-[var(--muted)]">
          Trabalhamos com materiais premium, encaixe magnético MagSafe
          preciso e um padrão visual consistente em toda a loja, para que
          escolher um acessório Kulanda seja tão simples quanto confiável.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-3">
        {pilares.map(({ title, description, Icon }) => (
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
    </div>
  );
}
