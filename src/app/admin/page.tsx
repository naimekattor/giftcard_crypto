'use client';

import { useAuth } from '@/src/features/auth/contexts/AuthContext';
import { ShieldCheck, ShieldAlert, CheckCircle2, XCircle, MoreVertical } from 'lucide-react';

export default function AdminPage() {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Admin Restricted</h2>
        <p className="mt-2 text-slate-600">Access strictly limited to authorized personnel.</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Verification Desk</h1>
            <p className="text-slate-500">Security & Integrity Management</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1 space-y-4">
          {[
            { label: 'Pending Cards', value: 12, color: 'bg-amber-100 text-amber-700' },
            { label: 'Disputes Open', value: 2, color: 'bg-red-100 text-red-700' },
            { label: 'Verified Today', value: 48, color: 'bg-emerald-100 text-emerald-700' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{stat.label}</span>
              <div className="mt-1 flex items-center justify-between">
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                <div className={`h-2 w-2 rounded-full ${stat.color.split(' ')[0].replace('bg-', 'bg-')}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-6">
              <h3 className="font-bold text-slate-900">Verification Queue</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-400">
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider">Retailer</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider">Value</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider">Seller</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider">Time</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { id: '1', retailer: 'Amazon', value: '$100.00', seller: 'anon_f82j1', time: '5m ago' },
                    { id: '2', retailer: 'Steam', value: '$50.00', seller: 'anon_k81l2', time: '12m ago' },
                    { id: '3', retailer: 'Apple', value: '$25.00', seller: 'anon_p01s3', time: '21m ago' },
                    { id: '4', retailer: 'Netflix', value: '$15.00', seller: 'anon_v92m1', time: '45m ago' },
                  ].map((row) => (
                    <tr key={row.id} className="transition-colors hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-medium text-slate-900">{row.retailer}</td>
                      <td className="px-6 py-4">{row.value}</td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">{row.seller}</td>
                      <td className="px-6 py-4 text-slate-400">{row.time}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-emerald-600 transition-colors hover:bg-emerald-50">
                            <CheckCircle2 className="h-4 w-4" />
                          </button>
                          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-red-600 transition-colors hover:bg-red-50">
                            <XCircle className="h-4 w-4" />
                          </button>
                          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="border-t border-slate-100 p-4 text-center">
              <button className="text-xs font-semibold text-slate-400 transition-colors hover:text-slate-900">
                Load More Queue Items
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
