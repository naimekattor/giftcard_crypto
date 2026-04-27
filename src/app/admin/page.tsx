'use client';

import { useAuth } from '@/src/features/auth/contexts/AuthContext';
import { ShieldCheck, ShieldAlert, CheckCircle2, XCircle, MoreVertical } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function AdminPage() {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center">
        <div>
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest">Vault Restricted</h2>
          <p className="mt-2 text-white/40 text-sm">Access strictly limited to authorized personnel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 space-y-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black shadow-lg">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-medium tracking-tight text-white">Verification Desk</h1>
            <p className="text-white/40 text-sm uppercase tracking-widest font-bold">Security & Integrity Management</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1 space-y-4">
          {[
            { label: 'Pending Cards', value: 12, color: 'bg-amber-500' },
            { label: 'Disputes Open', value: 2, color: 'bg-red-500' },
            { label: 'Verified Today', value: 48, color: 'bg-emerald-500' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-6 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">{stat.label}</span>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-3xl font-medium text-white">{stat.value}</p>
                <div className={cn("h-1.5 w-1.5 rounded-full", stat.color)} />
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] overflow-hidden">
            <div className="border-b border-white/5 p-6 bg-white/5">
              <h3 className="font-medium text-white">Verification Queue</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs uppercase tracking-wider font-bold">
                <thead>
                  <tr className="bg-black/40 text-white/30 border-b border-white/5">
                    <th className="px-6 py-4 font-bold">Retailer</th>
                    <th className="px-6 py-4 font-bold">Value</th>
                    <th className="px-6 py-4 font-bold">Seller</th>
                    <th className="px-6 py-4 font-bold">Time</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/60">
                  {[
                    { id: '1', retailer: 'Amazon', value: '$100.00', seller: 'anon_f82j1', time: '5m ago' },
                    { id: '2', retailer: 'Steam', value: '$50.00', seller: 'anon_k81l2', time: '12m ago' },
                    { id: '3', retailer: 'Apple', value: '$25.00', seller: 'anon_p01s3', time: '21m ago' },
                    { id: '4', retailer: 'Netflix', value: '$15.00', seller: 'anon_v92m1', time: '45m ago' },
                  ].map((row) => (
                    <tr key={row.id} className="transition-colors hover:bg-white/5">
                      <td className="px-6 py-4 font-medium text-white">{row.retailer}</td>
                      <td className="px-6 py-4">{row.value}</td>
                      <td className="px-6 py-4 font-mono text-[10px] text-white/40 lowercase tracking-normal">{row.seller}</td>
                      <td className="px-6 py-4 text-white/30">{row.time}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button className="text-emerald-500 hover:text-emerald-400 transition-colors">
                            <CheckCircle2 className="h-4 w-4" />
                          </button>
                          <button className="text-red-500 hover:text-red-400 transition-colors">
                            <XCircle className="h-4 w-4" />
                          </button>
                          <button className="text-white/20 hover:text-white transition-colors">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="border-t border-white/5 p-4 text-center bg-black/40">
              <button className="text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white/60 transition-colors">
                Decrypt More Queue Items
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
