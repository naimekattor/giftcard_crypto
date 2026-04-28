'use client';

import { GiftCard } from '@/types';
import { RETAILERS } from '@/constants/retailers';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface GiftCardCardProps {
  card: GiftCard;
}

export function GiftCardCard({ card }: GiftCardCardProps) {
  const router = useRouter();
  const retailer = RETAILERS.find(r => r.id === card.retailerId);
  const discount = Math.round(((card.denomination - card.sellingPrice) / card.denomination) * 100);

  const handleBuyNow = () => {
    router.push(`/checkout?cardId=${card.id}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] p-6 transition-all hover:border-white/30"
    >
      <div className="flex justify-between items-start mb-10">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-black shadow-lg bg-white"
        >
          {retailer?.name.slice(0, 1)}
        </div>
        <div className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-emerald-500/20">
          Verified
        </div>
      </div>

      <div className="space-y-1 mb-8">
        <h3 className="text-xl font-medium text-white">{retailer?.name} {card.denomination > 0 ? `$${card.denomination}` : ''}</h3>
        <p className="text-xs text-white/40">Electronic Code Delivery</p>
      </div>

      <div className="flex items-end justify-between border-t border-white/5 pt-6">
        <div>
          <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Value</div>
          <div className="text-2xl font-light text-white">${card.denomination.toFixed(2)}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Price</div>
          <div className="text-lg font-medium text-white">${card.sellingPrice.toFixed(2)}</div>
        </div>
      </div>

      <button className="w-full mt-6 bg-white text-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-colors">
        Secure Purchase
      </button>

      {/* Hover effect light glow */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none" />
    </motion.div>
  );
}
