import Link from "next/link";
import { ShieldCheck, BookOpen } from "lucide-react";
import { getCategories } from "@/lib/products";
import { PaymentMethods } from "./TrustSignals";
import CookiePreferencesButton from "./CookiePreferencesButton";

export default async function Footer() {
  const categories = await getCategories();

  return (
    <footer className="mt-24 border-t border-[var(--border)] bg-[var(--foreground)] text-white/70">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-4">
          <div>
            <p className="font-serif text-xl text-white">
              Kul<span className="italic text-[var(--accent)]">anda</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">
              Acessórios essenciais, feitos com atenção ao detalhe: carteiras
              magnéticas para iPhone, microfones de lapela, ring lights e
              kits de tripé para quem cria conteúdo.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
              <ShieldCheck strokeWidth={1.6} className="h-4 w-4 text-[var(--accent)]" />
              Site seguro · Ligação encriptada (SSL)
            </div>
          </div>
          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-white">
              Categorias
            </p>
            <ul className="space-y-2 text-sm">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/produtos?categoria=${c.id}`}
                    className="link-underline hover:text-white"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-white">
              Apoio ao cliente
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contacto" className="link-underline hover:text-white">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/faq" className="link-underline hover:text-white">
                  Perguntas frequentes
                </Link>
              </li>
              <li>
                <Link href="/devolucoes" className="link-underline hover:text-white">
                  Trocas e devoluções
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="link-underline hover:text-white">
                  Sobre nós
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-white">
              Legal
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.livroreclamacoes.pt/Inicio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-1.5 font-medium text-[var(--accent)] hover:text-[var(--accent)]"
                >
                  <BookOpen strokeWidth={1.6} className="h-4 w-4" />
                  Livro de Reclamações Eletrónico
                </a>
              </li>
              <li>
                <Link href="/privacidade" className="link-underline hover:text-white">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="link-underline hover:text-white">
                  Termos e Condições
                </Link>
              </li>
              <li>Pagamentos processados com segurança pela Stripe</li>
              <li>
                <CookiePreferencesButton />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-white">
            Métodos de pagamento aceites
          </p>
          <PaymentMethods />
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kulanda. Todos os direitos reservados.</p>
          <p>Design premium, feito com atenção ao detalhe.</p>
        </div>
      </div>
    </footer>
  );
}
