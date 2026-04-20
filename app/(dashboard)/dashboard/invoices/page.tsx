import { Plus } from "lucide-react";
import { revalidatePath } from "next/cache";

import { createInvoiceFromDashboardAction } from "@/app/(dashboard)/actions/invoices";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function InvoicesPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: invoicesData } = await supabase
    .from("invoices")
    .select("id, amount, status, clients ( name )")
    .eq("user_id", user?.id || "")
    .order("created_at", { ascending: false });

  // Map Supabase foreign key array join (or singular object) if available
  const mappedInvoices = (invoicesData || []).map((inv: any) => ({
    ...inv,
    client_name: inv.clients?.name || "Unknown Client",
  }));

  // Define Server Action for Delete
  async function deleteInvoiceAction(formData: FormData) {
    "use server";
    const invoiceId = formData.get("id") as string;
    if (!invoiceId) return;
    const serverSupabase = await createSupabaseServerClient();
    await serverSupabase.from("invoices").delete().eq("id", invoiceId);
    revalidatePath("/dashboard/invoices");
  }

  return (
    <div className="p-8 bg-zinc-950 min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
            <p className="text-zinc-400 mt-1">Manage your business billing records.</p>
          </div>
          <form action={createInvoiceFromDashboardAction}>
            <button
              type="submit"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all active:scale-95"
            >
              <Plus className="h-4 w-4" />
              Create New Draft
            </button>
          </form>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-zinc-800/50 text-zinc-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Client Name</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {mappedInvoices.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-zinc-500">
                    No invoices found. Click Create to add one.
                  </td>
                </tr>
              ) : (
                mappedInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium">{inv.client_name}</td>
                    <td className="px-6 py-4">${Number(inv.amount || 0).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full text-xs border border-emerald-500/20 capitalize">
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <form action={deleteInvoiceAction}>
                        <input type="hidden" name="id" value={inv.id} />
                        <button
                          type="submit"
                          className="text-red-500 hover:text-red-400 text-sm font-semibold transition-colors"
                        >
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}