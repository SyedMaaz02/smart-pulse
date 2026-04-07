import Link from "next/link";
import { BarChart3, FileText, LayoutDashboard, MessageSquareText, Users } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/invoices", label: "Invoices", icon: FileText },
  { href: "/dashboard/clients", label: "Clients", icon: Users },
  { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
  { href: "/dashboard/chat", label: "Chat", icon: MessageSquareText },
];

export function DashboardSidebar() {
  return (
    <aside className="w-72 border-r border-zinc-800 bg-zinc-950/80 p-5">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">SmartPulse</p>
        <h1 className="mt-2 text-xl font-semibold text-zinc-100">Freelancer OS</h1>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
