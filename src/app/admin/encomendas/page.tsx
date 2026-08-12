import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { StatusSelect } from "./status-select";

export const metadata: Metadata = {
  title: "Encomendas — Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

interface OrderItemRow {
  id: string;
  product_slug: string;
  name: string;
  unit_price: number;
  quantity: number;
  line_total: number;
}

interface OrderRow {
  id: string;
  reference: string;
  email: string;
  customer_name: string | null;
  phone: string | null;
  total: number;
  currency: string;
  status: string;
  created_at: string;
  order_items: OrderItemRow[];
}

const currencyFmt = new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" });
const dateFmt = new Intl.DateTimeFormat("pt-PT", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export default async function AdminEncomendasPage() {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select(
      `id, reference, email, customer_name, phone, total, currency, status, created_at,
       order_items ( id, product_slug, name, unit_price, quantity, line_total )`
    )
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16">
        <p className="text-red-600">Erro ao carregar encomendas: {error.message}</p>
      </div>
    );
  }

  const orders = (data ?? []) as unknown as OrderRow[];

  const totalOrders = orders.length;
  const revenueOrders = orders.filter((o) => o.status !== "cancelled" && o.status !== "refunded");
  const totalRevenue = revenueOrders.reduce((sum, o) => sum + Number(o.total), 0);
  const avgOrderValue = revenueOrders.length ? totalRevenue / revenueOrders.length : 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Encomendas</h1>
          <p className="mt-1 text-sm text-muted">Mapa de encomendas Kulanda</p>
        </div>
        <form action="/api/admin/logout" method="post">
          <button
            type="submit"
            className="rounded-lg border border-border px-4 py-2 text-sm text-muted hover:text-foreground"
          >
            Sair
          </button>
        </form>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-xs uppercase tracking-wide text-muted">Total de encomendas</p>
          <p className="mt-1 font-serif text-2xl text-foreground">{totalOrders}</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-xs uppercase tracking-wide text-muted">Receita (paga/enviada)</p>
          <p className="mt-1 font-serif text-2xl text-foreground">{currencyFmt.format(totalRevenue)}</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-xs uppercase tracking-wide text-muted">Valor médio por encomenda</p>
          <p className="mt-1 font-serif text-2xl text-foreground">{currencyFmt.format(avgOrderValue)}</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <p className="text-muted">Ainda não há encomendas.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3 font-medium">Referência</th>
                <th className="px-4 py-3 font-medium">Data</th>
                <th className="px-4 py-3 font-medium">Cliente</th>
                <th className="px-4 py-3 font-medium">Artigos</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0 align-top">
                  <td className="px-4 py-3 font-medium text-foreground">#{order.reference}</td>
                  <td className="px-4 py-3 text-muted">{dateFmt.format(new Date(order.created_at))}</td>
                  <td className="px-4 py-3">
                    <div className="text-foreground">{order.customer_name || "—"}</div>
                    <div className="text-xs text-muted">{order.email}</div>
                    {order.phone && <div className="text-xs text-muted">{order.phone}</div>}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    <ul className="space-y-0.5">
                      {order.order_items.map((item) => (
                        <li key={item.id}>
                          {item.quantity}× {item.name}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {currencyFmt.format(Number(order.total))}
                  </td>
                  <td className="px-4 py-3">
                    <StatusSelect orderId={order.id} status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
