import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a Kulanda recolhe, utiliza e protege os seus dados pessoais.",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacidadePage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
          Legal
        </p>
        <h1 className="mt-1 font-serif text-3xl text-[var(--foreground)]">
          Política de Privacidade
        </h1>
        <p className="mt-2 text-xs text-[var(--muted)]">
          Última atualização: {new Date().toLocaleDateString("pt-PT")}
        </p>
      </div>

      <div className="flex flex-col gap-5 text-sm leading-relaxed text-[var(--muted)]">
        <p>
          A Kulanda respeita a sua privacidade e trata os seus dados pessoais
          em conformidade com o Regulamento Geral sobre a Proteção de Dados
          (RGPD). Esta página explica que dados recolhemos, para que
          finalidade e quais os seus direitos.
        </p>

        <div>
          <h2 className="mb-1 font-serif text-lg text-[var(--foreground)]">
            Que dados recolhemos
          </h2>
          <p>
            Recolhemos os dados que nos fornece diretamente ao finalizar uma
            encomenda: nome, morada, e-mail e dados necessários ao
            processamento do pagamento. Não recolhemos dados de pagamento em
            texto simples — esse processamento é feito por prestadores de
            pagamento especializados.
          </p>
        </div>

        <div>
          <h2 className="mb-1 font-serif text-lg text-[var(--foreground)]">
            Para que usamos os seus dados
          </h2>
          <p>
            Usamos os seus dados exclusivamente para processar e entregar a
            sua encomenda, prestar apoio ao cliente e cumprir obrigações
            legais. Não vendemos nem partilhamos os seus dados com terceiros
            para fins de marketing sem o seu consentimento explícito.
          </p>
        </div>

        <div>
          <h2 className="mb-1 font-serif text-lg text-[var(--foreground)]">
            Os seus direitos
          </h2>
          <p>
            Pode a qualquer momento pedir acesso, correção ou eliminação dos
            seus dados pessoais, contactando-nos através de{" "}
            <a href="mailto:geral@kulanda.pt" className="link-underline text-[var(--foreground)]">
              geral@kulanda.pt
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="mb-1 font-serif text-lg text-[var(--foreground)]">
            Cookies
          </h2>
          <p>
            Este site utiliza apenas cookies essenciais ao funcionamento da
            loja, como os necessários para manter o carrinho de compras
            durante a sua visita.
          </p>
        </div>
      </div>
    </div>
  );
}
