import type { Metadata } from "next";
import { Mail, Clock, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Fale com a equipa Kulanda para dúvidas sobre produtos, encomendas, trocas ou devoluções.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="max-w-2xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
          Estamos aqui para ajudar
        </p>
        <h1 className="mt-1 font-serif text-3xl text-[var(--foreground)] sm:text-4xl">
          Contacto
        </h1>
        <p className="mt-5 leading-relaxed text-[var(--muted)]">
          Tem uma dúvida sobre um produto, uma encomenda ou precisa de ajuda
          com uma troca? Envie-nos uma mensagem — respondemos normalmente em
          até 1 dia útil.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="flex flex-col gap-2 border border-[var(--border)] bg-[var(--surface)] p-6">
          <Mail strokeWidth={1.4} className="h-5 w-5 text-[var(--accent)]" />
          <p className="text-sm font-medium text-[var(--foreground)]">E-mail</p>
          <a
            href="mailto:geral@kulanda-store.com"
            className="link-underline text-sm text-[var(--muted)]"
          >
            geral@kulanda-store.com
          </a>
        </div>
        <div className="flex flex-col gap-2 border border-[var(--border)] bg-[var(--surface)] p-6">
          <Clock strokeWidth={1.4} className="h-5 w-5 text-[var(--accent)]" />
          <p className="text-sm font-medium text-[var(--foreground)]">Horário</p>
          <p className="text-sm text-[var(--muted)]">
            Segunda a sexta, 9h–18h
          </p>
        </div>
        <div className="flex flex-col gap-2 border border-[var(--border)] bg-[var(--surface)] p-6">
          <MessageCircle strokeWidth={1.4} className="h-5 w-5 text-[var(--accent)]" />
          <p className="text-sm font-medium text-[var(--foreground)]">Antes de escrever</p>
          <p className="text-sm text-[var(--muted)]">
            Consulte as{" "}
            <a href="/faq" className="link-underline text-[var(--foreground)]">
              perguntas frequentes
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
