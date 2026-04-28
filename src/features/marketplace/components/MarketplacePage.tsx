'use client';

import { useState } from 'react';
import { RETAILERS } from '@/constants/retailers';
import { GiftCardList } from './GiftCardList';
import { MarketplaceFilters } from './MarketplaceFilters';

export function MarketplacePage() {
  const [filter, setFilter] = useState({
    retailer: 'all',
    minPrice: 0,
    maxPrice: 1000,
  });

  return (
    <div className="flex flex-col h-full bg-[#050505]">
      {/* Header */}
      <header className="h-20 border-b border-white/10 px-10 flex items-center justify-between shrink-0 bg-black/20 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-6">
          <h1 className="text-lg font-medium tracking-tight text-white">Active Listings</h1>
          <div className="h-4 w-[1px] bg-white/10 hidden sm:block"></div>
          <div className="hidden md:flex gap-6">
            <button 
              onClick={() => setFilter({ ...filter, retailer: 'all' })}
              className={cn(
                "text-xs transition-all",
                filter.retailer === 'all' ? "text-white underline underline-offset-8 decoration-white font-bold" : "text-white/40 hover:text-white/60"
              )}
            >
              All Platforms
            </button>
            <button className="text-xs text-white/40 hover:text-white/60 transition-all">E-Commerce</button>
            <button className="text-xs text-white/40 hover:text-white/60 transition-all">Gaming</button>
            <button className="text-xs text-white/40 hover:text-white/60 transition-all">Subscription</button>
          </div>
        </div>
        
        <MarketplaceFilters 
          currentFilter={filter} 
          onFilterChange={(newFilter) => setFilter({ ...filter, ...newFilter })} 
        />
      </header>

      {/* Content Area */}
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <GiftCardList filter={filter} />
          
          {/* Statistics Footer */}
          <div className="mt-20 flex flex-wrap gap-12 items-center border-t border-white/5 pt-12 pb-12">
            <div className="flex flex-col">
              <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Market Depth</span>
              <span className="text-xl text-white font-medium">$1.24M <span className="text-xs text-emerald-500 font-mono">+12%</span></span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Active Escrows</span>
              <span className="text-xl text-white font-medium">4,821 <span className="text-xs text-white/40 font-mono italic">TRADES</span></span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Mean Settlement</span>
              <span className="text-xl text-white font-medium text-white/80">4m 12s</span>
            </div>
            <div className="sm:ml-auto bg-white/5 px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">System Status: Optimal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
