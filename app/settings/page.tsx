import NavigationLayout from "@/components/NavigationLayout";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const transactions = [
  { id: "#9921", date: "Sept 12, 2023", amount: "$4,200.00" },
  { id: "#9918", date: "Aug 12, 2023", amount: "$5,150.00" },
  { id: "#9914", date: "July 12, 2023", amount: "$3,840.10" },
];

export default async function SettingsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  return (
    <NavigationLayout activePath="/settings">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="flex gap-6 items-center">
          <div className="relative group">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-primary-container flex items-center justify-center text-on-primary text-3xl font-black font-headline">
              {user.email?.substring(0, 2).toUpperCase()}
            </div>
            <button className="absolute -bottom-2 -right-2 bg-primary text-on-primary p-2 rounded-lg shadow-lg">
              <span className="material-symbols-outlined text-sm">edit</span>
            </button>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-headline tracking-tighter text-primary">
              {user.email?.split("@")[0] || "User"}
            </h2>
            <p className="text-on-surface-variant font-medium">Lead Visual Architect &amp; Contractor</p>
            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold uppercase tracking-widest rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container animate-pulse" />
                Verified Ledger
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-highest text-on-surface text-[10px] font-bold uppercase tracking-widest rounded">
                Tier 1 Professional
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/20 shadow-sm max-w-xs w-full">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Public Portfolio Toggle</span>
            <button className="w-10 h-5 bg-[#10b981] rounded-full relative transition-colors">
              <span className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
            </button>
          </div>
          <p className="text-[11px] text-on-surface-variant leading-relaxed">
            Visibility is currently active. Your atelier is public to prospective clients.
          </p>
        </div>
      </div>

      {/* Tabbed Interface */}
      <div className="flex flex-col gap-8">
        <div className="flex border-b border-outline-variant/10 overflow-x-auto">
          <button className="px-6 py-4 text-sm font-bold tracking-tight text-[#10b981] border-b-2 border-[#10b981] whitespace-nowrap">
            Payout Methods
          </button>
          <button className="px-6 py-4 text-sm font-medium tracking-tight text-on-surface-variant hover:text-primary transition-colors whitespace-nowrap">
            Tax Info
          </button>
          <button className="px-6 py-4 text-sm font-medium tracking-tight text-on-surface-variant hover:text-primary transition-colors whitespace-nowrap">
            Security &amp; Privacy
          </button>
          <button className="px-6 py-4 text-sm font-medium tracking-tight text-on-surface-variant hover:text-primary transition-colors whitespace-nowrap">
            Preferences
          </button>
        </div>

        {/* Bento Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Form Section */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-surface-container-lowest p-8 rounded border border-outline-variant/20">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-extrabold font-headline tracking-tight text-primary">Active Payout Systems</h3>
                <button className="text-sm font-bold text-[#10b981] flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">add_circle</span>
                  Add Method
                </button>
              </div>
              <div className="space-y-4">
                {/* Payout Card 1 */}
                <div className="flex items-center justify-between p-5 bg-surface-container-low rounded border border-outline-variant/20 group hover:border-[#10b981]/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary flex items-center justify-center rounded text-on-primary">
                      <span className="material-symbols-outlined">account_balance</span>
                    </div>
                    <div>
                      <p className="font-bold text-primary">Industrial Bank of Zurich</p>
                      <p className="text-xs text-on-surface-variant tracking-wider">•••• 8829 | Primary Ledger</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded">Default</span>
                    <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-on-surface-variant">more_vert</span>
                    </button>
                  </div>
                </div>
                {/* Payout Card 2 */}
                <div className="flex items-center justify-between p-5 bg-surface-container-low rounded border border-outline-variant/20 group hover:border-[#10b981]/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-surface-container-highest flex items-center justify-center rounded text-primary">
                      <span className="material-symbols-outlined">payments</span>
                    </div>
                    <div>
                      <p className="font-bold text-primary">Stripe Connect</p>
                      <p className="text-xs text-on-surface-variant tracking-wider">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="text-[10px] font-bold uppercase text-on-surface-variant hover:text-primary">Set Default</button>
                    <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-on-surface-variant">more_vert</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Regional Payout Preferences */}
            <div className="bg-surface-container-lowest p-8 rounded border border-outline-variant/20">
              <h3 className="text-xl font-extrabold font-headline tracking-tight text-primary mb-6">Regional Payout Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Settlement Currency</label>
                  <select className="w-full bg-surface-container-low border border-outline-variant/20 px-4 py-3 rounded text-sm focus:ring-0 focus:border-[#10b981] transition-all">
                    <option>USD - United States Dollar</option>
                    <option>EUR - Euro</option>
                    <option>CHF - Swiss Franc</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Payout Threshold</label>
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant/20 px-4 py-3 rounded text-sm focus:ring-0 focus:border-[#10b981] transition-all"
                    type="text"
                    defaultValue="$2,500.00"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Side Stats Section */}
          <div className="lg:col-span-4 space-y-6">
            {/* Summary Card */}
            <div className="bg-primary text-on-primary p-8 rounded shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mb-2">Available for Withdrawal</p>
                <h4 className="text-4xl font-extrabold font-headline tracking-tighter mb-6">$14,820.45</h4>
                <button className="w-full bg-[#10b981] hover:bg-[#0d9668] text-primary font-bold py-3 rounded text-sm transition-colors">
                  Withdraw to Bank
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <span className="material-symbols-outlined text-[120px]">account_balance_wallet</span>
              </div>
            </div>
            {/* Information Alert */}
            <div className="bg-tertiary-container p-6 rounded border border-on-tertiary-container/20">
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-[#10b981]">info</span>
                <div className="space-y-2">
                  <p className="text-sm font-bold text-[#10b981]">Next Settlement Date</p>
                  <p className="text-xs text-on-tertiary leading-relaxed">
                    Your monthly ledger closes on Oct 24th. Payments are processed within 48 hours of settlement.
                  </p>
                </div>
              </div>
            </div>
            {/* Transaction Logs */}
            <div className="bg-surface-container-lowest border border-outline-variant/20 rounded overflow-hidden">
              <div className="bg-surface-container-highest px-4 py-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface">Recent Transaction Logs</span>
              </div>
              <div className="divide-y divide-outline-variant/10">
                {transactions.map((tx) => (
                  <div key={tx.id} className="px-4 py-3 flex justify-between items-center hover:bg-surface-container-low transition-colors">
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-primary">Payout {tx.id}</p>
                      <p className="text-[10px] text-on-surface-variant uppercase">{tx.date}</p>
                    </div>
                    <p className="text-xs font-bold text-primary">{tx.amount}</p>
                  </div>
                ))}
              </div>
              <button className="w-full py-3 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary bg-surface-container-low">
                View Full History
              </button>
            </div>
          </div>
        </div>
      </div>
    </NavigationLayout>
  );
}
