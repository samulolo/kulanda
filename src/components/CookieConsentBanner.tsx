"use client";

import Link from "next/link";
import { useConsent } from "@/lib/consent-context";

export default function CookieConsentBanner() {
  const { hydrated, showBanner, accept, reject } = useConsent();

  if (!hydrated || !showBanner) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--border)] bg-[var(--background)] px-6 py-5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          Usamos cookies essenciais ao funcionamento da loja e, só com a sua
          autorização, cookies de análise (Google Analytics) para percebermos
          como o site é usado. Pode mudar de ideias a qualquer momento — ver{" "}
          <Link
            href="/privacidade"
            className="link-underline text-[var(--foreground)]"
          >
            política de privacidade
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={reject}
            className="rounded-full border border-[var(--border)] px-5 py-2.5 text-[12px] font-medium uppercase tracking-wide text-[var(--foreground)] transition-colors hover:bg-[var(--surface)]"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={accept}
            className="btn-lift rounded-full bg-[var(--foreground)] px-5 py-2.5 text-[12px] font-medium uppercase tracking-wide text-white transition-colors hover:bg-[var(--accent-dark)]"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
