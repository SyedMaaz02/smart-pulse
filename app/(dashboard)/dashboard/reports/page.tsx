import { BarChart, TrendingUp, Users, DollarSign } from "lucide-react";

export default function ReportsPage() {
  const stats = [
    { label: "Total Revenue", value: "$45,231", icon: <DollarSign />, color: "text-green-500" },
    { label: "Active Projects", value: "12", icon: <BarChart />, color: "text-blue-500" },
    { label: "New Clients", value: "+4", icon: <Users />, color: "text-purple-500" },
  ];

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Analytics Report</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-sm">
            <div className={`${stat.color} mb-4`}>{stat.icon}</div>
            <p className="text-zinc-400 text-sm">{stat.label}</p>
            <p className="text-3xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 p-12 bg-zinc-900/50 border border-dashed border-zinc-800 rounded-3xl text-center">
        <TrendingUp className="mx-auto mb-4 text-zinc-700" size={48} />
        <p className="text-zinc-500">Visual charts will appear here as you collect more data.</p>
      </div>
    </div>
  );
}