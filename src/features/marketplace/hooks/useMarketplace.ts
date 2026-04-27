/**
 * Marketplace Hooks
 * React Query hooks for marketplace operations
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { marketplaceService } from '@/features/marketplace/services/marketplaceService';
import type { MarketplaceFilters } from '@/types';

/**
 * Hook to browse gift cards with filters
 */
export function useBrowseCards(filters?: MarketplaceFilters) {
  return useQuery({
    queryKey: ['cards', 'browse', filters],
    queryFn: () => marketplaceService.browseCards(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to get single card details
 */
export function useCardDetails(cardId: string) {
  return useQuery({
    queryKey: ['card', cardId],
    queryFn: () => marketplaceService.getCardDetails(cardId),
    enabled: !!cardId,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to get seller profile
 */
export function useSellerProfile(sellerId: string) {
  return useQuery({
    queryKey: ['seller', sellerId],
    queryFn: () => marketplaceService.getSellerProfile(sellerId),
    enabled: !!sellerId,
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Hook to search cards
 */
export function useSearchCards(query: string, page: number = 1) {
  return useQuery({
    queryKey: ['cards', 'search', query, page],
    queryFn: () => marketplaceService.searchCards(query, page),
    enabled: !!query,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to get trending cards
 */
export function useTrendingCards() {
  return useQuery({
    queryKey: ['cards', 'trending'],
    queryFn: () => marketplaceService.getTrendingCards(),
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Hook to get filter options
 */
export function useFilterOptions() {
  return useQuery({
    queryKey: ['marketplace', 'filters'],
    queryFn: () => marketplaceService.getFilterOptions(),
    staleTime: 1 * 60 * 60 * 1000, // 1 hour
  });
}
