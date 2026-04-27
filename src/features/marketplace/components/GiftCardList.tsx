'use client';

import { useQuery } from '@tanstack/react-query';
import { giftCardService } from '@/src/services/giftCardService';
import { GiftCardCard } from './GiftCardCard';
import { Loader2 } from 'lucide-react';

interface GiftCardListProps {
  filter: {
    retailer: string;
    minPrice: number;
    maxPrice: number;
  };
}

export function GiftCardList({ filter }: GiftCardListProps) {
  const { data: cards, isLoading, error } = useQuery({
    queryKey: ['gift-cards', filter.retailer],
    queryFn: () => giftCardService.getGiftCards({ retailer: filter.retailer }),
  });

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-center text-red-600">
        Failed to load gift cards. Please try again later.
      </div>
    );
  }

  if (!cards || cards.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-slate-500">
        No gift cards found matching your filters.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <GiftCardCard key={card.id} card={card} />
      ))}
    </div>
  );
}
