import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos e Condições",
  description: "Termos e condições de utilização e compra na Kulanda.",
  alternates: { canonical: "/termos" },
};

export default function TermosPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
          Legal
        </p>
        <h1 className="mt-1 font-serif text-3xl text-[var(--foreground)]">
          Termos e Condições
        </h1>
        <p className="mt-2 text-xs text-[var(--muted)]">
          Última atualização: {new Date().toLocaleDateString("pt-PT")}
        </p>
      </div>

      <div className="flex flex-col gap-5 text-sm leading-relaxed text-[var(--muted)]">
        <p>
          Ao utilizar o site da Kulanda e efetuar uma compra, concorda com os
          termos descritos abaixo.
        </p>

        <div>
          <h2 className="mb-1 font-serif text-lg text-[var(--foreground)]">
            Preços e disponibilidade
          </h2>
          <p>
            Todos os preços apresentados estão em euros (€) e incluem os
            impostos aplicáveis. Os preços e a disponibilidade de stock
            podem ser alterados sem aviso prévio.
          </p>
        </div>

        <div>
          <h2 className="mb-1 font-serif text-lg text-[var(--foreground)]">
            Encomendas e pagamento
          </h2>
          <p>
            A encomenda só é considerada confirmada após a validação do
            pagamento. Aceitamos os métodos de pagamento indicados no
            checkout.
          </p>
        </div>

        <div>
          <h2 className="mb-1 font-serif text-lg text-[var(--foreground)]">
            Entrega
          </h2>
          <p>
            As entregas demoram, em média, entre 8 a 20 dias, dependendo da
            morada de destino. O envio é grátis em todas as encomendas.
          </p>
          <p className="mt-2">
            Em casos raros, encomendas internacionais podem estar sujeitas a
            taxas alfandegárias adicionais, da responsabilidade do cliente.
            Isto acontece em menos de 5% das entregas.
          </p>
        </div>

        <div>
          <h2 className="mb-1 font-serif text-lg text-[var(--foreground)]">
            Devoluções e garantia
          </h2>
          <p>
            Consulte a nossa{" "}
            <a href="/devolucoes" className="link-underline text-[var(--foreground)]">
              política de devoluções
            </a>{" "}
            para informação sobre trocas, devoluções e garantia.
          </p>
        </div>

        <div>
          <h2 className="mb-1 font-serif text-lg text-[var(--foreground)]">
            Propriedade intelectual
          </h2>
          <p>
            Todo o conteúdo do site — textos, imagens e identidade visual —
            é propriedade da Kulanda e não pode ser reproduzido sem
            autorização.
          </p>
        </div>
      </div>
    </div>
  );
}
