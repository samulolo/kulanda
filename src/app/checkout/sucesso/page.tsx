"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, X, Loader2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";

interface DadosSessao {
  status: string;
  amountTotal: number | null;
  currency: string | null;
  email: string | null;
  reference: string;
}

export default function SucessoPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center gap-4 py-28 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--accent)]" />
        </div>
      }
    >
      <SucessoConteudo />
    </Suspense>
  );
}

function SucessoConteudo() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();

  const [estado, setEstado] = useState<"a-carregar" | "ok" | "erro">("a-carregar");
  const [dados, setDados] = useState<DadosSessao | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setEstado("erro");
      return;
    }

    fetch(`/api/checkout/session?session_id=${encodeURIComponent(sessionId)}`)
      .then((res) => res.json())
      .then((data: DadosSessao & { error?: string }) => {
        if (data.error) {
          setEstado("erro");
          return;
        }
        setDados(data);
        setEstado("ok");
        if (data.status === "paid") {
          clearCart();
        }
      })
      .catch(() => setEstado("erro"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  if (estado === "a-carregar") {
    return (
      <div className="flex flex-col items-center gap-4 py-28 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--accent)]" />
        <p className="text-sm text-[var(--muted)]">A confirmar o pagamento…</p>
      </div>
    );
  }

  if (estado === "erro" || !dados) {
    return (
      <div className="flex flex-col items-center gap-4 py-28 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-red-300 text-red-500">
          <X strokeWidth={1.6} className="h-6 w-6" />
        </div>
        <h1 className="font-serif text-2xl text-[var(--foreground)]">
          Não foi possível confirmar o pagamento
        </h1>
        <p className="max-w-sm text-sm text-[var(--muted)]">
          Se o valor foi debitado, contacte-nos que verificamos a sua encomenda.
        </p>
        <Link
          href="/contacto"
          className="mt-2 rounded-full bg-[var(--foreground)] px-6 py-3 text-[13px] font-medium uppercase tracking-wide text-white transition-colors hover:bg-[var(--accent-dark)]"
        >
          Contactar suporte
        </Link>
      </div>
    );
  }

  const pago = dados.status === "paid";

  return (
    <div className="flex flex-col items-center gap-4 py-28 text-center">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full border ${
          pago ? "border-[var(--accent)] text-[var(--accent)]" : "border-amber-300 text-amber-500"
        }`}
      >
        <Check strokeWidth={1.6} className="h-6 w-6" />
      </div>
      <h1 className="font-serif text-2xl text-[var(--foreground)]">
        {pago ? "Pagamento confirmado" : "Pagamento em processamento"}
      </h1>
      <p className="max-w-sm text-sm text-[var(--muted)]">
        Pedido nº <span className="font-medium text-[var(--foreground)]">#{dados.reference}</span>.
        {dados.email && (
          <>
            {" "}
            Enviámos a confirmação para{" "}
            <span className="font-medium text-[var(--foreground)]">{dados.email}</span>.
          </>
        )}
      </p>
      {dados.amountTotal !== null && dados.currency && (
        <p className="text-sm text-[var(--foreground)]">
          Total pago:{" "}
          <span className="font-semibold">
            {(dados.amountTotal / 100).toLocaleString("pt-PT", {
              style: "currency",
              currency: dados.currency.toUpperCase(),
            })}
          </span>
        </p>
      )}
      <Link
        href="/produtos"
        className="mt-2 rounded-full bg-[var(--foreground)] px-6 py-3 text-[13px] font-medium uppercase tracking-wide text-white transition-colors hover:bg-[var(--accent-dark)]"
      >
        Continuar comprando
      </Link>
    </div>
  );
}
