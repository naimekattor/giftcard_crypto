'use client';

import { useState } from 'react';
import { RETAILERS } from '@/src/constants/retailers';
import { GiftCardList } from './GiftCardList';
import { MarketplaceFilters } from './MarketplaceFilters';

export function MarketplacePage() {
  const [filter, setFilter] = useState({
    retailer: 'all',
    minPrice: 0,
    maxPrice: 1000,
  });

  return (
    <div className="space-y-8">
      <MarketplaceFilters 
        currentFilter={filter} 
        onFilterChange={(newFilter) => setFilter({ ...filter, ...newFilter })} 
      />
      
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-semibold text-slate-900">Categories</h3>
            <ul className="space-y-2">
              <li 
                className={`cursor-pointer rounded-lg px-3 py-2 text-sm transition-colors ${filter.retailer === 'all' ? 'bg-slate-100 font-medium text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
                onClick={() => setFilter({ ...filter, retailer: 'all' })}
              >
                All Retailers
              </li>
              {RETAILERS.map((retailer) => (
                <li 
                  key={retailer.id}
                  className={`cursor-pointer rounded-lg px-3 py-2 text-sm transition-colors ${filter.retailer === retailer.id ? 'bg-slate-100 font-medium text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
                  onClick={() => setFilter({ ...filter, retailer: retailer.id })}
                >
                  {retailer.name}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section>
          <GiftCardList filter={filter} />
        </section>
      </div>
    </div>
  );
}
