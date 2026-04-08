// export default function InvoicesPage() {
//   // Sample data to start - you can connect this to Supabase later!
//   const invoices = [
//     { id: 'INV-001', client: 'Acme Corp', amount: '$1,200', status: 'Paid' },
//     { id: 'INV-002', client: 'Global Tech', amount: '$850', status: 'Pending' },
//   ];

//   return (
//     <div className="p-6 text-white">
//       <h1 className="text-2xl font-bold mb-4">Invoices</h1>
//       <div className="grid gap-4">
//         {invoices.map((inv) => (
//           <div key={inv.id} className="flex justify-between items-center bg-zinc-900 p-4 rounded-xl border border-zinc-800">
//             <div>
//               <p className="font-medium">{inv.client}</p>
//               <p className="text-sm text-zinc-500">{inv.id}</p>
//             </div>
//             <div className="text-right">
//               <p className="font-bold">{inv.amount}</p>
//               <p className={`text-xs ${inv.status === 'Paid' ? 'text-green-500' : 'text-yellow-500'}`}>{inv.status}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

export default function ClientsPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Clients</h2>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
        <p className="text-zinc-400">Client directory coming soon...</p>
      </div>
    </div>
  );
}