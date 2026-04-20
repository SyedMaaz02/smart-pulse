import NavigationLayout from "@/components/NavigationLayout";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { createClient } from "@/app/actions/clients";

export default async function ClientsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const { data: clients } = await supabase.from("clients").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
  const totalBilled = clients?.reduce((acc, c) => acc + (c.total_billed || 0), 0) || 0;

  return (
    <NavigationLayout activePath="/clients">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-primary font-headline">
            Client Directory
          </h1>
          <p className="text-on-surface-variant mt-2 font-body max-w-lg">
            Manage your high-value client relationships and track active engagements across your digital atelier.
          </p>
        </div>
        
        {/* Form correctly mapping input name='name' and 'email' */}
        <form action={createClient} className="flex gap-3 items-center">
          <input 
            type="text" 
            name="name" 
            placeholder="Client Name" 
            className="border border-outline-variant/30 px-3 py-2 text-sm rounded bg-surface-container-lowest"
            required
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Client Email" 
            className="border border-outline-variant/30 px-3 py-2 text-sm rounded bg-surface-container-lowest"
            required
          />
          <button type="submit" className="bg-primary text-on-primary px-5 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-sm">
            <span className="material-symbols-outlined text-lg">add</span>
            Add Client
          </button>
        </form>
      </div>

      <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant/10">
        {clients && clients.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface-container-highest">
                <th className="px-6 py-4 text-left">
                  <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Client Name</span>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Total Billed</span>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Created</span>
                </th>
                <th className="px-6 py-4 text-right">
                  <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-transparent">
              {clients.map((client) => {
                const initials = client.name.substring(0, 2).toUpperCase();
                return (
                  <tr key={client.id} className="bg-surface hover:bg-surface-container-low transition-colors group border-b border-outline-variant/10">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-primary-fixed-dim flex items-center justify-center font-bold text-primary">
                          {initials}
                        </div>
                        <div>
                          <p className="font-bold text-primary text-sm font-headline">{client.name}</p>
                          <p className="text-xs text-on-surface-variant">{client.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div>
                        <p className="text-sm font-bold text-primary">${client.total_billed?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || "0.00"}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-primary">{new Date(client.created_at).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">more_horiz</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="p-10 text-center text-on-surface-variant text-sm">
            No clients added yet. Use the form above to add your first client.
          </div>
        )}
      </div>

    </NavigationLayout>
  );
}
