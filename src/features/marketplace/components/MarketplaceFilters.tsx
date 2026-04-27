'use client';

import { Search, SlidersHorizontal } from 'lucide-react';
import { RETAILERS } from '@/src/constants/retailers';

interface MarketplaceFiltersProps {
  currentFilter: {
    retailer: string;
    minPrice: number;
    maxPrice: number;
  };
  onFilterChange: (filter: Partial<MarketplaceFiltersProps['currentFilter']>) => void;
}

import { RetailerDropdown } from '@/src/components/shared/RetailerDropdown';

export function MarketplaceFilters({ currentFilter, onFilterChange }: MarketplaceFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search by retailer or keyword..."
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none ring-slate-400 transition-all focus:ring-2"
        />
      </div>

      <div className="flex items-center gap-3">
        <RetailerDropdown 
          value={currentFilter.retailer}
          onChange={(val) => onFilterChange({ retailer: val })}
          className="lg:hidden block w-[180px]"
        />

        <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50">
          <SlidersHorizontal className="h-4 w-4" />
          More Filters
        </button>
      </div>
    </div>
  );
}
