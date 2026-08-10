"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "./actions";

const STATUS_LABELS: Record<string, string> = {
  paid: "Paga",
  fulfilled: "Enviada",
  cancelled: "Cancelada",
  refunded: "Reembolsada",
};

const STATUS_STYLES: Record<string, string> = {
  paid: "bg-blue-50 text-blue-700 border-blue-200",
  fulfilled: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
  refunded: "bg-amber-50 text-amber-700 border-amber-200",
};

export function StatusSelect({ orderId, status }: { orderId: string; status: string }) {
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    startTransition(async () => {
      await updateOrderStatus(orderId, next);
    });
  }

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={isPending}
      className={`rounded-full border px-3 py-1 text-xs font-medium outline-none disabled:opacity-50 ${
        STATUS_STYLES[status] ?? "bg-gray-50 text-gray-700 border-gray-200"
      }`}
    >
      {Object.entries(STATUS_LABELS).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
