import Link from "next/link";
import React from "react";

export default function NavigationLayout({
  children,
  activePath,
}: {
  children: React.ReactNode;
  activePath: string;
}) {
  const navItems = [
    { icon: "grid_view", label: "Dashboard", href: "/dashboard" },
    { icon: "account_tree", label: "Projects", href: "/projects" },
    { icon: "group", label: "Clients", href: "/clients" },
    { icon: "settings", label: "Settings", href: "/settings" },
  ];

  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen flex">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full flex flex-col py-6 px-4 bg-[#f2f4f6] dark:bg-[#1e293b] w-64 z-50 border-r border-outline-variant/10">
        <div className="mb-10 px-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tighter text-[#0f172a] dark:text-[#10b981] brand-font">
              Smart Pulse
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mt-1 font-semibold opacity-60">
            Digital Atelier
          </p>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = activePath === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 transition-transform scale-95 active:scale-100 font-['Manrope'] font-medium antialiased rounded-[4px] ${
                  isActive
                    ? "bg-[#ffffff] text-[#10b981] shadow-sm font-semibold"
                    : "text-slate-600 hover:bg-[#e0e3e5]"
                }`}
              >
                <span
                  className="material-symbols-outlined text-xl"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Top AppBar */}
      <header className="fixed top-0 right-0 left-64 h-16 flex justify-between items-center px-6 bg-[#f7f9fb] z-40">
        <div className="flex items-center bg-surface-container-low px-4 py-1.5 rounded-lg border border-outline-variant/20 w-96">
          <span className="material-symbols-outlined text-on-surface-variant text-xl">
            search
          </span>
          <input
            className="bg-transparent border-none focus:ring-0 text-sm w-full font-body placeholder:text-on-surface-variant/50"
            placeholder="Search clients, projects, or invoices..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:bg-slate-200/50 rounded-lg transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="h-8 w-8 rounded-full bg-primary-container flex items-center justify-center overflow-hidden">
            <img
              alt="User"
              className="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3ys-SVMiOqK51fTc0irKu5SnCvJCAGtTs4EHM_9XcAo84U1cFkhe4M8IU3EMmMJcUmQSIbFuSfD6Lo1EnhC0P7mYSDjdmcoSH_ntYjVj3CrMHdwC4wdWpfr7k61hnIp4V98MRdYP9YooY7QX3Eao5RDxRt4DxZL405RZ_K7gkFUgW0phEMV-urEHwCDv85FTY8UKy4GvFtVdQxH4JzNsJSvsKXc4HLbnJMbobH60LqC-ITWo4z13ta4WDRfQSu5y3vMVh7vKB0XY"
            />
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="ml-64 pt-20 p-8 w-full bg-surface">{children}</main>
    </div>
  );
}
