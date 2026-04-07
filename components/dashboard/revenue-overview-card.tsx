"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type RevenuePoint = {
  month: string;
  paid: number;
  unpaid: number;
};

type RevenueOverviewCardProps = {
  data: RevenuePoint[];
};

export function RevenueOverviewCard({ data }: RevenueOverviewCardProps) {
  return (
    <Card className="border-zinc-800 bg-gradient-to-b from-zinc-900/90 to-zinc-950">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <p className="text-sm text-zinc-400">Paid vs. unpaid invoices over the last 6 months</p>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full rounded-lg border border-zinc-800 bg-zinc-950/70 p-3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="month" stroke="#a1a1aa" tickLine={false} axisLine={false} />
              <YAxis
                stroke="#a1a1aa"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${Number(value).toFixed(0)}`}
              />
              <Tooltip
                cursor={{ fill: "rgba(39, 39, 42, 0.35)" }}
                contentStyle={{
                  background: "#09090b",
                  border: "1px solid #27272a",
                  borderRadius: "0.75rem",
                  color: "#e4e4e7",
                }}
                formatter={(value, name) => [`$${Number(value ?? 0).toFixed(2)}`, String(name)]}
              />
              <Bar dataKey="paid" fill="#6366f1" radius={[6, 6, 0, 0]} />
              <Bar dataKey="unpaid" fill="#3f3f46" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
