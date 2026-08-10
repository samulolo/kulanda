"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";

const VALID_STATUSES = ["paid", "fulfilled", "cancelled", "refunded"] as const;
type OrderStatus = (typeof VALID_STATUSES)[number];

export async function updateOrderStatus(orderId: string, status: string) {
  if (!VALID_STATUSES.includes(status as OrderStatus)) {
    throw new Error("Estado inválido.");
  }

  const { error } = await supabaseAdmin
    .from("orders")
    .update({ status })
    .eq("id", orderId);

  if (error) {
    throw new Error(`Não foi possível atualizar o estado: ${error.message}`);
  }

  revalidatePath("/admin/encomendas");
}
