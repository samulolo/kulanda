import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perguntas Frequentes",
  description:
    "Respostas às dúvidas mais comuns sobre entrega, garantia, devoluções e pagamento na Kulanda.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    q: "Quais os prazos de entrega?",
    a: "As entregas demoram, em média, entre 10 a 15 dias, dependendo da morada de destino. O envio é grátis em todas as encomendas.",
  },
  {
    q: "Posso ter de pagar taxas alfandegárias?",
    a: "Em casos raros, encomendas internacionais podem estar sujeitas a taxas alfandegárias adicionais, da responsabilidade do cliente. Isto acontece em menos de 5% das entregas.",
  },
  {
    q: "Como funciona a garantia de 30 dias?",
    a: "Todos os produtos têm 30 dias de garantia a contar da data de receção. Se o artigo apresentar defeito de fabrico, substituímos ou reembolsamos.",
  },
  {
    q: "Posso trocar ou devolver um produto?",
    a: "Sim. Tem até 14 dias após a receção para pedir troca ou devolução, ao abrigo do direito de livre resolução — não precisa de indicar motivo, desde que o produto esteja em bom estado e na embalagem original. O envio de devolução é da responsabilidade do cliente, com um custo fixo de 4€. Consulte a nossa política de devoluções para o processo completo.",
  },
  {
    q: "Que métodos de pagamento são aceites?",
    a: "Cartão (Visa e Mastercard), Apple Pay e MB WAY.",
  },
  {
    q: "As carteiras magnéticas funcionam com qualquer iPhone?",
    a: "As carteiras magnéticas foram desenhadas para o encaixe MagSafe. Consulte a ficha de cada produto para ver os modelos de iPhone compatíveis.",
  },
  {
    q: "O microfone de lapela precisa de aplicação própria?",
    a: "Não. É plug and play: basta ligar ao conector Type-C do dispositivo e está pronto a usar.",
  },
  {
    q: "Como faço para acompanhar a minha encomenda?",
    a: "Após a confirmação da encomenda, enviamos as atualizações de estado para o e-mail indicado no checkout.",
  },
];

export default function FaqPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="max-w-2xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
          Ajuda
        </p>
        <h1 className="mt-1 font-serif text-3xl text-[var(--foreground)] sm:text-4xl">
          Perguntas Frequentes
        </h1>
      </div>

      <div className="flex max-w-3xl flex-col divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {faqs.map(({ q, a }) => (
          <div key={q} className="flex flex-col gap-2 py-6">
            <h2 className="font-serif text-lg text-[var(--foreground)]">{q}</h2>
            <p className="text-sm leading-relaxed text-[var(--muted)]">{a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
