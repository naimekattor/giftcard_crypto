'use client';

import { useAuth } from '@/src/features/auth/contexts/AuthContext';
import { GiftCardForm } from '@/src/features/giftcards/components/GiftCardForm';
import { ShoppingBag, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';

export default function SellerPage() {
  const { user } = useAuth();

  if (!user || user.role !== 'seller') {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Access Denied</h2>
        <p className="mt-2 text-slate-600">Please login as a seller to access this dashboard.</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Seller Dashboard</h1>
          <p className="text-slate-500">Manage your listings and track your earnings.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Revenue</span>
            <p className="text-2xl font-bold text-slate-900">$1,420.00</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-bold text-slate-900">List New Gift Card</h3>
            <GiftCardForm />
          </div>
          
          <div className="rounded-2xl bg-slate-950 p-6 text-white shadow-xl">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold">Seller Standing</h3>
            <p className="mt-2 text-sm text-slate-400">Your account is in excellent standing. You are eligible for instant payouts.</p>
            <div className="mt-6 flex items-center gap-2 text-2xl font-bold">
              4.9 <span className="text-sm font-normal text-slate-500">/ 5.0 rating</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Active Listings</h3>
              <button className="text-sm font-medium text-slate-600 hover:text-slate-950">View All</button>
            </div>
            
            <div className="space-y-4">
              {[
                { id: '1', title: 'Amazon $100', price: 90, status: 'Active', icon: CheckCircle2, iconColor: 'text-emerald-500' },
                { id: '2', title: 'Steam $50', price: 45, status: 'Pending Verification', icon: Clock, iconColor: 'text-amber-500' },
                { id: '3', title: 'Apple $25', price: 22, status: 'Active', icon: CheckCircle2, iconColor: 'text-emerald-500' },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-100 p-4 transition-colors hover:bg-slate-50">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                      <ShoppingBag className="h-5 w-5 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{item.title}</h4>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <item.icon className={`h-3 w-3 ${item.iconColor}`} />
                        {item.status}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">${item.price}</p>
                    <button className="text-xs font-medium text-slate-400 hover:text-slate-900">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-bold text-slate-900">Recent Sales</h3>
            <div className="flex h-32 items-center justify-center text-sm text-slate-400 italic">
              Recent sales history will appear here once cards are purchased.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
