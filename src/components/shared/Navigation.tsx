'use client';

import { useAuth } from '@/src/features/auth/contexts/AuthContext';
import { Wallet, LogIn, User, ShoppingBag, PlusCircle, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export function Navigation() {
  const { user, login, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-950">
          <div className="h-8 w-8 rounded-lg bg-slate-950 flex items-center justify-center text-white">A</div>
          AnonGift
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-950">
            Marketplace
          </Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                <Wallet className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-bold text-slate-900">${user.walletBalance.toFixed(2)}</span>
              </div>
              
              <div className="h-8 w-px bg-slate-200" />
              
              <div className="flex items-center gap-3">
                {user.role === 'buyer' && (
                  <Link href="/buyer" className="text-sm font-medium text-slate-600 hover:text-slate-950 flex items-center gap-1.5 transition-all">
                    <ShoppingBag className="h-4 w-4" />
                    My Purchases
                  </Link>
                )}
                {user.role === 'seller' && (
                  <Link href="/seller" className="text-sm font-medium text-slate-600 hover:text-slate-950 flex items-center gap-1.5 transition-all">
                    <PlusCircle className="h-4 w-4" />
                    Sell Cards
                  </Link>
                )}
                {user.role === 'admin' && (
                  <Link href="/admin" className="text-sm font-medium text-slate-600 hover:text-slate-950 flex items-center gap-1.5 transition-all">
                    <ShieldAlert className="h-4 w-4 text-amber-500" />
                    Verified Desk
                  </Link>
                )}
                
                <button 
                  onClick={() => logout()}
                  className="rounded-full bg-slate-950 p-2 text-white transition-transform hover:scale-110"
                >
                  <User className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => login('buyer')}
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold transition-all hover:bg-slate-50"
              >
                <LogIn className="h-4 w-4" />
                Login as Buyer
              </button>
              <button 
                onClick={() => login('seller')}
                className="flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-slate-800"
              >
                Become Seller
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
