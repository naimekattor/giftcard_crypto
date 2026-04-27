'use client';

import { GiftCard } from '@/src/types';
import { RETAILERS } from '@/src/constants/retailers';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useRouter } from 'next/navigation';

interface GiftCardCardProps {
  card: GiftCard;
}

export function GiftCardCard({ card }: GiftCardCardProps) {
  const router = useRouter();
  const retailer = RETAILERS.find(r => r.id === card.retailerId);
  const discount = Math.round(((card.value - card.price) / card.value) * 100);

  const handleBuyNow = () => {
    router.push(`/checkout?cardId=${card.id}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
    >
      <div className="mb-4 flex items-start justify-between">
        <div 
          className="flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-inner"
          style={{ backgroundColor: retailer?.color || '#000' }}
        >
          <span className="text-xs font-bold uppercase">{retailer?.name.slice(0, 2)}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-2xl font-bold text-slate-900">${card.price}</span>
          <span className="text-sm text-slate-400 line-through">${card.value}</span>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-slate-900">{retailer?.name} Gift Card</h4>
        <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {discount}% Savings
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
          Verified
        </div>
        
        <button className="flex items-center gap-1 text-sm font-semibold text-slate-950 underline-offset-4 transition-all hover:underline">
          Buy Now
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Decorative element */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-slate-50 opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.div>
  );
}
