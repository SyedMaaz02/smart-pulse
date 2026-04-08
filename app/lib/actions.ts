"use client";
import { createBrowserClient } from "@supabase/ssr";

export async function createInvoice(formData: { client: string; amount: number; status: string }) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );

  const { data, error } = await supabase
    .from("invoices")
    .insert([
      { 
        client_name: formData.client, 
        amount: formData.amount, 
        status: formData.status,
        date: new Date().toISOString()
      },
    ])
    .select();

  if (error) throw error;
  return data;
}