import NavigationLayout from "@/components/NavigationLayout";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  // Fetch some summary logic to make the dashboard alive
  const { data: clients } = await supabase.from("clients").select("*").eq("user_id", user.id);
  const totalBilled = clients?.reduce((acc, c) => acc + (c.total_billed || 0), 0) || 0;

  return (
    <NavigationLayout activePath="/dashboard">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-primary font-headline">
            Atelier Dashboard
          </h1>
          <p className="text-on-surface-variant mt-2 font-body max-w-lg">
            High-level overview of your digital studio.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-primary p-6 rounded-xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary-fixed-dim/70">
              Total Ledger Value
            </span>
            <h3 className="text-3xl font-black text-on-primary mt-2 font-headline">
              ${totalBilled.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h3>
          </div>
        </div>

        <div className="bg-surface-container-low border border-outline-variant/30 p-6 rounded-xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
              Active Relationships
            </span>
            <h3 className="text-3xl font-black text-primary mt-2 font-headline">
              {clients?.length || 0} Clients
            </h3>
          </div>
        </div>

        <div className="bg-tertiary-container p-6 rounded-xl flex flex-col justify-between relative overflow-hidden">
          <div className="z-10">
            <span className="text-[10px] font-black uppercase tracking-widest text-tertiary-fixed/70">
              Efficiency Rating
            </span>
            <h3 className="text-3xl font-black text-white mt-2 font-headline">
              94.2%
            </h3>
          </div>
          <div className="mt-4 z-10">
            <p className="text-xs text-tertiary-fixed/80">
              Project delivery speed is optimal.
            </p>
          </div>
        </div>
      </div>
    </NavigationLayout>
  );
}
