'use client';

import { useAuth } from '@/src/features/auth/contexts/AuthContext';
import { GiftCardForm } from '@/src/features/giftcards/components/GiftCardForm';
import { ShoppingBag, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function SellerPage() {
  const { user } = useAuth();

  if (!user || user.role !== 'seller') {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">Access Denied</h2>
          <p className="mt-2 text-white/40">Please login as a seller to access this dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 space-y-12">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-medium tracking-tight text-white">Seller Dashboard</h1>
          <p className="text-white/40 text-sm">Manage your listings and track your earnings.</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-end">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Total Revenue</span>
          <p className="text-2xl font-medium text-white">$1,420.00</p>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-8">
          <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-8 shadow-2xl">
            <h3 className="mb-8 text-lg font-medium text-white">List New Gift Card</h3>
            <GiftCardForm />
          </div>
          
          <div className="rounded-2xl bg-white p-8 text-black shadow-xl">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-black/5">
              <TrendingUp className="h-6 w-6 text-black" />
            </div>
            <h3 className="text-lg font-bold">Seller Standing</h3>
            <p className="mt-2 text-sm text-black/60">Your account is in excellent standing. You are eligible for instant payouts.</p>
            <div className="mt-6 flex items-center gap-2 text-2xl font-bold">
              4.9 <span className="text-sm font-normal text-black/40">/ 5.0 rating</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-8">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">Active Listings</h3>
              <button className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">View All</button>
            </div>
            
            <div className="space-y-4">
              {[
                { id: '1', title: 'Amazon $100', price: 90, status: 'Active', icon: CheckCircle2, iconColor: 'text-emerald-500' },
                { id: '2', title: 'Steam $50', price: 45, status: 'Pending Verification', icon: Clock, iconColor: 'text-amber-500' },
                { id: '3', title: 'Apple $25', price: 22, status: 'Active', icon: CheckCircle2, iconColor: 'text-emerald-500' },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-xl border border-white/5 p-5 transition-all hover:bg-white/5 hover:border-white/10">
                  <div className="flex items-center gap-5">
                    <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <ShoppingBag className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{item.title}</h4>
                      <div className="flex items-center gap-2 mt-1 text-[10px] font-bold uppercase tracking-widest">
                        <item.icon className={cn("h-3 w-3", item.iconColor)} />
                        <span className={item.iconColor}>{item.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-medium text-white">${item.price}</p>
                    <button className="text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white/60 transition-colors">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="rounded-2xl border border-white/5 p-12 text-center flex flex-col items-center justify-center bg-black/20">
             <div className="w-12 h-12 rounded-full border border-dashed border-white/20 flex items-center justify-center mb-4">
               <Clock className="h-5 w-5 text-white/20" />
             </div>
             <p className="text-sm text-white/20 font-medium">Recent sales history will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
