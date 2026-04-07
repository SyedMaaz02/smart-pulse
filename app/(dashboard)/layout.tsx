import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <DashboardSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
