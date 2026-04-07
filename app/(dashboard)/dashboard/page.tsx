import { DollarSign, FileText, Plus } from "lucide-react";

import { createInvoiceFromDashboardAction } from "@/app/(dashboard)/actions/invoices";
import { ChatPanel } from "@/components/dashboard/chat-panel";
import { RevenueOverviewCard } from "@/components/dashboard/revenue-overview-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [profilesResult, invoicesResult] = await Promise.all([
    user
      ? supabase
          .from("profiles")
          .select("company_name")
          .eq("id", user.id)
          .maybeSingle()
      : Promise.resolve({ data: null, error: null }),
    user
      ? supabase
          .from("invoices")
          .select("amount, status, created_at")
          .eq("user_id", user.id)
      : Promise.resolve({ data: [], error: null }),
  ]);

  const profileName = profilesResult.data?.company_name ?? "there";
  const invoices = invoicesResult.data ?? [];
  const invoiceCount = invoices.length;
  const totalRevenue = invoices
    .filter((invoice) => invoice.status === "paid")
    .reduce((sum, invoice) => sum + Number(invoice.amount ?? 0), 0);
  const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short" });
  const now = new Date();
  const monthBuckets = Array.from({ length: 6 }).map((_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    return {
      key,
      month: monthFormatter.format(date),
      paid: 0,
      unpaid: 0,
    };
  });
  const revenueByMonth = new Map(monthBuckets.map((bucket) => [bucket.key, bucket]));

  for (const invoice of invoices) {
    const sourceDate = invoice.created_at ? new Date(invoice.created_at) : null;
    if (!sourceDate || Number.isNaN(sourceDate.getTime())) continue;
    const monthKey = `${sourceDate.getFullYear()}-${String(sourceDate.getMonth() + 1).padStart(2, "0")}`;
    const bucket = revenueByMonth.get(monthKey);
    if (!bucket) continue;

    const amount = Number(invoice.amount ?? 0);
    if (invoice.status === "paid") {
      bucket.paid += amount;
    } else {
      bucket.unpaid += amount;
    }
  }

  const revenueOverviewData = monthBuckets.map((bucket) => ({
    month: bucket.month,
    paid: Number(bucket.paid.toFixed(2)),
    unpaid: Number(bucket.unpaid.toFixed(2)),
  }));

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <section className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Dashboard</p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-50">Welcome, {profileName}</h2>
          </div>
          <form action={createInvoiceFromDashboardAction}>
            <Button type="submit">
              <Plus className="h-4 w-4" />
              Create Invoice
            </Button>
          </form>
        </div>

        <section className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-zinc-400" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-zinc-100">${totalRevenue.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Invoice Count</CardTitle>
              <FileText className="h-4 w-4 text-zinc-400" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-zinc-100">{invoiceCount}</p>
            </CardContent>
          </Card>
        </section>

        <RevenueOverviewCard data={revenueOverviewData} />
      </section>

      <aside>
        <ChatPanel defaultPrompt="Who is my top-paying client?" />
      </aside>
    </div>
  );
}
