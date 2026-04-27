'use client';

import { useAuth } from '@/src/features/auth/contexts/AuthContext';
import { Wallet, LogIn, User, ShoppingBag, PlusCircle, ShieldAlert, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/src/lib/utils';

export function Navigation() {
  const { user, login, logout } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { label: 'Marketplace', href: '/', icon: LayoutGrid, section: 'Marketplace' },
    ...(user?.role === 'buyer' ? [{ label: 'My Purchases', href: '/buyer', icon: ShoppingBag, section: 'Management' }] : []),
    ...(user?.role === 'seller' ? [{ label: 'Sell Cards', href: '/seller', icon: PlusCircle, section: 'Management' }] : []),
    ...(user?.role === 'admin' ? [{ label: 'Verification Queue', href: '/admin', icon: ShieldAlert, section: 'Management', badge: 14 }] : []),
  ];

  return (
    <aside className="w-68 border-r border-white/10 flex flex-col bg-[#0a0a0a] h-full shrink-0">
      <div className="p-8">
        <Link href="/" className="text-white font-semibold text-2xl tracking-tighter flex items-center gap-2">
          <div className="w-2.5 h-8 bg-white"></div>
          VAULT<span className="opacity-40">X</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <div className="px-4 py-2 text-[10px] uppercase tracking-widest text-white/30 font-bold mb-2">Marketplace</div>
        <Link 
          href="/" 
          className={cn(
            "flex items-center gap-3 px-4 py-3 transition-all rounded-lg",
            pathname === '/' ? "bg-white/5 border-r-2 border-white text-white" : "text-white/50 hover:bg-white/5"
          )}
        >
          <LayoutGrid className="h-4 w-4" />
          <span className="text-sm">Browse Assets</span>
        </Link>

        <div className="px-4 py-2 text-[10px] uppercase tracking-widest text-white/30 font-bold mt-8 mb-2">Management</div>
        {user ? (
          <>
            {user.role === 'buyer' && (
              <Link 
                href="/buyer" 
                className={cn(
                  "flex items-center gap-3 px-4 py-3 transition-all rounded-lg",
                  pathname === '/buyer' ? "bg-white/5 border-r-2 border-white text-white" : "text-white/50 hover:bg-white/5"
                )}
              >
                <ShoppingBag className="h-4 w-4" />
                <span className="text-sm">My Purchases</span>
              </Link>
            )}
            {user.role === 'seller' && (
              <Link 
                href="/seller" 
                className={cn(
                  "flex items-center gap-3 px-4 py-3 transition-all rounded-lg",
                  pathname === '/seller' ? "bg-white/5 border-r-2 border-white text-white" : "text-white/50 hover:bg-white/5"
                )}
              >
                <PlusCircle className="h-4 w-4" />
                <span className="text-sm">Sell Gift Card</span>
              </Link>
            )}
            {user.role === 'admin' && (
              <Link 
                href="/admin" 
                className={cn(
                  "flex items-center gap-3 px-4 py-3 transition-all rounded-lg",
                  pathname === '/admin' ? "bg-white/5 border-r-2 border-white text-white" : "text-white/50 hover:bg-white/5"
                )}
              >
                <ShieldAlert className="h-4 w-4" />
                <span className="text-sm">Verification Queue</span>
                <span className="ml-auto bg-white/10 text-[10px] px-2 py-0.5 rounded text-white font-mono">14</span>
              </Link>
            )}
          </>
        ) : (
          <div className="px-4 py-4 space-y-3">
            <button 
              onClick={() => login('buyer')}
              className="w-full flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-all"
            >
              <LogIn className="h-4 w-4" />
              Auth as Buyer
            </button>
            <button 
              onClick={() => login('seller')}
              className="w-full flex items-center gap-2 rounded-lg bg-white border border-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-black hover:bg-white/90 transition-all"
            >
              Become Seller
            </button>
          </div>
        )}
      </nav>

      {user && (
        <div className="p-6 mt-auto border-t border-white/10 bg-black/40">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-transparent flex items-center justify-center border border-white/10 shadow-inner">
              <User className="h-4 w-4 text-white/60" />
            </div>
            <div className="overflow-hidden">
              <div className="text-[11px] font-mono text-white/80 truncate">u_{user.id.slice(0, 8)}...</div>
              <div className="text-[9px] text-white/40 uppercase tracking-tighter font-bold">{user.role} Account</div>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-[10px] text-white/40 uppercase font-bold mb-1 tracking-widest">Wallet Balance</div>
            <div className="text-lg font-medium text-white flex items-baseline gap-1">
              {user.walletBalance.toFixed(3)} 
              <span className="text-[10px] opacity-40 font-bold uppercase tracking-tighter">USDC</span>
            </div>
            {user.pendingBalance > 0 && (
              <div className="text-[9px] text-emerald-500 mt-1 uppercase font-bold tracking-tighter">
                +{user.pendingBalance.toFixed(2)} Pending
              </div>
            )}
          </div>
          <button 
            onClick={() => logout()}
            className="mt-4 w-full text-[10px] uppercase font-bold tracking-widest text-white/20 hover:text-white/60 transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </aside>
  );
}
