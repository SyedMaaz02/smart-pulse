"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
type ClientRow = { id: string; name: string; email: string; total_billed: number };
type InvoiceRow = {
  id: number;
  amount: number;
  status: "draft" | "sent" | "paid";
  due_date: string;
  client_id: string;
};

export async function fetchAiInsights() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Unauthorized." };
  }

  const [{ data: clients, error: clientsError }, { data: invoices, error: invoicesError }] =
    await Promise.all([
      supabase
        .from("clients")
        .select("id, name, email, total_billed")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("invoices")
        .select("id, amount, status, due_date, client_id")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }),
    ]);

  if (clientsError || invoicesError) {
    return { success: false, error: clientsError?.message ?? invoicesError?.message };
  }

  const safeClients = (clients ?? []) as ClientRow[];
  const safeInvoices = (invoices ?? []) as InvoiceRow[];

  const paidRevenue = safeInvoices
    .filter((invoice) => invoice.status === "paid")
    .reduce((sum, invoice) => sum + Number(invoice.amount), 0);

  return {
    success: true,
    data: {
      paidRevenue,
      outstandingInvoices: safeInvoices.filter((invoice) => invoice.status !== "paid").length,
      clientsCount: safeClients.length,
      clients: safeClients,
      invoices: safeInvoices,
    },
  };
}
