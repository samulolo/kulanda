"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Lock, Tag, Truck, Loader2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import { PaymentMethods, SecureCheckoutBadge } from "@/components/TrustSignals";

const inputClasses =
  "rounded-sm border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none";
const inputErrorClasses = "border-red-400 focus:border-red-400";

const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_FEE = 4.9;

type Cupom = { tipo: "percentagem" | "envio-gratis"; valor?: number; label: string };

const CUPOES: Record<string, Cupom> = {
  BEMVINDO10: { tipo: "percentagem", valor: 10, label: "Cupão aplicado: 10% de desconto" },
  FRETEGRATIS: { tipo: "envio-gratis", label: "Cupão aplicado: portes grátis" },
};

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();

  const [email, setEmail] = useState("");
  const [erroEmail, setErroEmail] = useState<string | null>(null);

  const [cupomInput, setCupomInput] = useState("");
  const [cupomAplicado, setCupomAplicado] = useState<string | null>(null);
  const [erroCupom, setErroCupom] = useState<string | null>(null);

  const [aEnviar, setAEnviar] = useState(false);
  const [erroEnvio, setErroEnvio] = useState<string | null>(null);

  function handleAplicarCupom(e: FormEvent) {
    e.preventDefault();
    const codigo = cupomInput.trim().toUpperCase();
    if (!codigo) return;
    if (CUPOES[codigo]) {
      setCupomAplicado(codigo);
      setErroCupom(null);
    } else {
      setCupomAplicado(null);
      setErroCupom("Código promocional inválido");
    }
  }

  async function handlePagar(e: FormEvent) {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErroEmail("Indique um e-mail válido");
      return;
    }
    setErroEmail(null);
    setErroEnvio(null);
    setAEnviar(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({ slug: item.slug, quantity: item.quantity })),
          cupom: cupomAplicado ?? undefined,
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        setErroEnvio(data.error ?? "Não foi possível iniciar o pagamento.");
        setAEnviar(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setErroEnvio("Falha de ligação. Tente novamente.");
      setAEnviar(false);
    }
  }

  const subtotal = totalPrice;
  const cupom = cupomAplicado ? CUPOES[cupomAplicado] : null;
  const portesBase = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const portes = cupom?.tipo === "envio-gratis" ? 0 : portesBase;
  const desconto = cupom?.tipo === "percentagem" ? subtotal * ((cupom.valor ?? 0) / 100) : 0;
  const total = Math.max(subtotal + portes - desconto, 0);
  const faltaParaFrete = FREE_SHIPPING_THRESHOLD - subtotal;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-28 text-center">
        <h1 className="font-serif text-2xl text-[var(--foreground)]">Seu carrinho está vazio</h1>
        <Link
          href="/produtos"
          className="mt-2 rounded-full bg-[var(--foreground)] px-6 py-3 text-[13px] font-medium uppercase tracking-wide text-white transition-colors hover:bg-[var(--accent-dark)]"
        >
          Ver produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
          Última etapa
        </p>
        <h1 className="mt-1 font-serif text-3xl text-[var(--foreground)]">Finalizar compra</h1>
        <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs text-[var(--accent-dark)]">
          <Lock className="h-3 w-3" strokeWidth={1.8} />
          Pagamento processado com segurança pela Stripe
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        <form onSubmit={handlePagar} noValidate className="flex flex-col gap-8 lg:col-span-2">
          <fieldset className="flex flex-col gap-3">
            <legend className="mb-2 font-serif text-lg text-[var(--foreground)]">
              Contacto
            </legend>
            <div className="flex flex-col gap-1">
              <input
                required
                type="email"
                placeholder="E-mail para confirmação da encomenda"
                aria-label="E-mail"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (erroEmail) setErroEmail(null);
                }}
                className={`${inputClasses} ${erroEmail ? inputErrorClasses : ""}`}
                aria-invalid={Boolean(erroEmail)}
              />
              {erroEmail && <p className="text-xs text-red-500">{erroEmail}</p>}
            </div>
            <p className="text-xs text-[var(--muted)]">
              A morada de entrega e os dados do cartão são recolhidos no
              ambiente seguro da Stripe no passo seguinte.
            </p>
          </fieldset>

          <div className="flex flex-col gap-3">
            <SecureCheckoutBadge />
            <PaymentMethods variant="light" />
          </div>

          {erroEnvio && (
            <p className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {erroEnvio}
            </p>
          )}

          <button
            type="submit"
            disabled={aEnviar}
            className="btn-lift flex items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-4 text-[13px] font-medium uppercase tracking-wide text-white transition-colors hover:bg-[var(--accent-dark)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {aEnviar && <Loader2 className="h-4 w-4 animate-spin" />}
            {aEnviar ? "A redirecionar para a Stripe…" : `Pagar com Stripe — ${formatPrice(total)}`}
          </button>
        </form>

        <div className="flex h-fit flex-col gap-5 border border-[var(--border)] bg-[var(--surface)] p-7">
          <h2 className="font-serif text-lg text-[var(--foreground)]">Resumo</h2>

          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <div key={item.slug} className="flex justify-between text-sm text-[var(--muted)]">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 border-t border-[var(--border)] pt-4">
            <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--muted)]">
              <Tag strokeWidth={1.6} className="h-3.5 w-3.5" />
              Cupão de desconto
            </label>
            <div className="flex gap-2">
              <input
                placeholder="Ex: BEMVINDO10"
                aria-label="Código promocional"
                value={cupomInput}
                onChange={(e) => setCupomInput(e.target.value)}
                className={`${inputClasses} flex-1`}
              />
              <button
                type="button"
                onClick={handleAplicarCupom}
                className="rounded-sm border border-[var(--foreground)] px-4 text-[12px] font-medium uppercase tracking-wide text-[var(--foreground)] transition-colors hover:bg-[var(--foreground)] hover:text-white"
              >
                Aplicar
              </button>
            </div>
            {erroCupom && <p className="text-xs text-red-500">{erroCupom}</p>}
            {cupom && <p className="text-xs text-[var(--accent-dark)]">{cupom.label}</p>}
          </div>

          <div className="flex flex-col gap-2 border-t border-[var(--border)] pt-4 text-sm">
            <div className="flex justify-between text-[var(--muted)]">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-[var(--muted)]">
              <span className="flex items-center gap-1.5">
                <Truck strokeWidth={1.6} className="h-3.5 w-3.5" />
                Portes de envio
              </span>
              <span>{portes === 0 ? "Grátis" : formatPrice(portes)}</span>
            </div>
            {desconto > 0 && (
              <div className="flex justify-between text-[var(--accent-dark)]">
                <span>Desconto</span>
                <span>−{formatPrice(desconto)}</span>
              </div>
            )}
            {portes > 0 && faltaParaFrete > 0 && (
              <p className="text-xs text-[var(--muted)]">
                Faltam {formatPrice(faltaParaFrete)} para portes grátis.
              </p>
            )}
          </div>

          <div className="flex justify-between border-t border-[var(--border)] pt-4 font-semibold text-[var(--foreground)]">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
