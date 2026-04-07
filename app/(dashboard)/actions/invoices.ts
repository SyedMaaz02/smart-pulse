"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createInvoiceSchema, type CreateInvoiceInput } from "@/lib/validations/invoice";

export async function createInvoice(input: CreateInvoiceInput) {
  const parsed = createInvoiceSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten() };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Unauthorized." };
  }

  const { data, error } = await supabase
    .from("invoices")
    .insert({
      user_id: user.id,
      client_id: parsed.data.clientId,
      amount: parsed.data.amount,
      status: parsed.data.status,
      due_date: parsed.data.dueDate,
      line_items: parsed.data.lineItems,
    })
    .select("id, status, amount, due_date")
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true, invoice: data };
}

export async function createInvoiceFromDashboard() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Unauthorized." };
  }

  const { data: client } = await supabase
    .from("clients")
    .select("id")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })
    .limit(1)
    .single();

  if (!client) {
    return { success: false, error: "Please create at least one client first." };
  }

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 7);

  const { data, error } = await supabase
    .from("invoices")
    .insert({
      user_id: user.id,
      client_id: client.id,
      amount: 250,
      status: "draft",
      due_date: dueDate.toISOString().slice(0, 10),
      line_items: [
        {
          description: "Initial project scope",
          quantity: 1,
          unitPrice: 250,
        },
      ],
    })
    .select("id")
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true, invoiceId: data.id };
}

export async function createInvoiceFromDashboardAction() {
  await createInvoiceFromDashboard();
}
