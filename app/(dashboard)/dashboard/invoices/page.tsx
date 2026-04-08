// export default function InvoicesPage() {
//   return (
//     <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-6 text-zinc-300">
//       Invoices module scaffolded. Use the `createInvoice` server action to add records.
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { createInvoice } from "@/app/lib/actions"; // This matches the new app/lib folder

// export default function InvoicesTab() {
//   const [loading, setLoading] = useState(false);

//   const handleCreate = async () => {
//     setLoading(true);
//     try {
//       // This calls the function in your new app/lib/actions.ts file
//       await createInvoice({ 
//         client: "New Test Client", 
//         amount: 1500, 
//         status: "Pending" 
//       });
      
//       alert("Success! Invoice added to Supabase.");
//       window.location.reload(); // Refresh to see the new data
//     } catch (err: any) {
//       console.error(err);
//       alert("Error: Make sure you created the 'invoices' table in Supabase!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-2xl font-bold text-white">Invoices</h2>
//           <p className="text-zinc-400 text-sm">Manage your billing and payments</p>
//         </div>
//         <button 
//           onClick={handleCreate}
//           disabled={loading}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
//         >
//           {loading ? "Creating..." : "+ Create Invoice"}
//         </button>
//       </div>

//       {/* This replaces the placeholder text with a real table UI */}
//       <div className="overflow-x-auto">
//         <table className="w-full text-left text-sm text-zinc-400">
//           <thead className="text-xs uppercase text-zinc-500 border-b border-zinc-800">
//             <tr>
//               <th className="px-4 py-3">Client</th>
//               <th className="px-4 py-3">Amount</th>
//               <th className="px-4 py-3">Status</th>
//               <th className="px-4 py-3">Date</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-zinc-800">
//             <tr className="hover:bg-zinc-800/50 transition-colors">
//               <td className="px-4 py-4 font-medium text-white">Example Client</td>
//               <td className="px-4 py-4">$1,500.00</td>
//               <td className="px-4 py-4">
//                 <span className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded text-xs">Paid</span>
//               </td>
//               <td className="px-4 py-4">Oct 24, 2023</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

// }

"use client";

import { useState } from "react";
import { createInvoice } from "@/app/lib/actions";

export default function InvoicesPage() {
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    try {
      await createInvoice({ 
        client: "Manual Entry Client", 
        amount: 2500, 
        status: "Unpaid" 
      });
      alert("✅ Invoice successfully added to Supabase!");
      window.location.reload(); 
    } catch (err: any) {
      console.error(err);
      alert("❌ Error: Check your 'actions.ts' path or Supabase table.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
            <p className="text-zinc-400 mt-1">Manage your business billing records.</p>
          </div>
          <button 
            onClick={handleCreate}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Processing..." : "+ Create New Invoice"}
          </button>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-zinc-800/50 text-zinc-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Client Name</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              <tr className="hover:bg-zinc-800/30 transition-colors">
                <td className="px-6 py-4 font-medium">Sample Tech Inc.</td>
                <td className="px-6 py-4">$4,200.00</td>
                <td className="px-6 py-4">
                  <span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full text-xs border border-emerald-500/20">
                    Paid
                  </span>
                </td>
                <td className="px-6 py-4 text-zinc-500">2026-04-08</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}