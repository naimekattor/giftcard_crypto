'use client';

import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { RETAILERS } from '@/src/constants/retailers';
import { cn } from '@/src/lib/utils';

interface MarketplaceFiltersProps {
  currentFilter: {
    retailer: string;
    minPrice: number;
    maxPrice: number;
  };
  onFilterChange: (filter: Partial<MarketplaceFiltersProps['currentFilter']>) => void;
}

export function MarketplaceFilters({ currentFilter, onFilterChange }: MarketplaceFiltersProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative hidden sm:flex items-center">
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/20" />
        <input 
          type="text" 
          placeholder="Filter by retailer..."
          className="bg-white/5 border border-white/10 text-xs px-4 py-2 pl-9 w-64 rounded-lg focus:outline-none focus:border-white/40 text-white transition-all placeholder:text-white/20"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="relative min-w-[160px]">
          <select 
            className="w-full appearance-none bg-white/5 border border-white/10 text-xs px-4 py-2 rounded-lg focus:outline-none focus:border-white/40 text-white transition-all cursor-pointer"
            value={currentFilter.retailer}
            onChange={(e) => onFilterChange({ retailer: e.target.value })}
          >
            <option value="all" className="bg-[#0a0a0a]">All Retailers</option>
            {RETAILERS.map(r => (
              <option key={r.id} value={r.id} className="bg-[#0a0a0a]">{r.name}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/20" />
        </div>

        <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white/60 hover:bg-white/10 transition-all">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span className="hidden lg:inline">Filters</span>
        </button>
      </div>
    </div>
  );
}
