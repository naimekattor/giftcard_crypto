'use client';

import { RETAILERS } from '@/src/constants/retailers';
import { cn } from '@/src/lib/utils';
import { ChevronDown } from 'lucide-react';

interface RetailerDropdownProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function RetailerDropdown({ value, onChange, className }: RetailerDropdownProps) {
  return (
    <div className={cn("relative", className)}>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 outline-none transition-all focus:ring-2 focus:ring-slate-400"
      >
        <option value="all">All Retailers</option>
        {RETAILERS.map((retailer) => (
          <option key={retailer.id} value={retailer.id}>
            {retailer.name}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  );
}
