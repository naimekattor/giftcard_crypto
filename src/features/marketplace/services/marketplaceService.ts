/**
 * Marketplace Service
 * Handles gift card listing, searching, and browsing
 */

import { apiClient } from '@/lib/api/client';
import type {
  GiftCardListing,
  PaginatedResponse,
  MarketplaceFilters,
  CardStatus,
} from '@/types';

export const marketplaceService = {
  /**
   * Browse all available gift cards
   */
  async browseCards(
    filters?: MarketplaceFilters
  ): Promise<PaginatedResponse<GiftCardListing>> {
    const queryParams = new URLSearchParams();

    if (filters?.retailerId) queryParams.append('retailerId', filters.retailerId);
    if (filters?.minPrice !== undefined)
      queryParams.append('minPrice', String(filters.minPrice));
    if (filters?.maxPrice !== undefined)
      queryParams.append('maxPrice', String(filters.maxPrice));
    if (filters?.condition) queryParams.append('condition', filters.condition);
    if (filters?.sortBy) queryParams.append('sortBy', filters.sortBy);
    if (filters?.search) queryParams.append('search', filters.search);
    if (filters?.page) queryParams.append('page', String(filters.page));
    if (filters?.limit) queryParams.append('limit', String(filters.limit));

    const response = await apiClient.get<PaginatedResponse<GiftCardListing>>(
      `/marketplace/cards?${queryParams.toString()}`
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch cards');
    }

    return response.data;
  },

  /**
   * Get single gift card details
   */
  async getCardDetails(cardId: string): Promise<GiftCardListing> {
    const response = await apiClient.get<GiftCardListing>(
      `/marketplace/cards/${cardId}`
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Card not found');
    }

    return response.data;
  },

  /**
   * Get seller profile (anonymous)
   */
  async getSellerProfile(
    sellerId: string
  ): Promise<{ id: string; rating: number; successRate: number }> {
    const response = await apiClient.get(
      `/marketplace/sellers/${sellerId}/profile`
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Seller not found');
    }

    return response.data;
  },

  /**
   * Search cards with query
   */
  async searchCards(query: string, page: number = 1): Promise<PaginatedResponse<GiftCardListing>> {
    const response = await apiClient.get<PaginatedResponse<GiftCardListing>>(
      `/marketplace/search?q=${encodeURIComponent(query)}&page=${page}`
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Search failed');
    }

    return response.data;
  },

  /**
   * Get trending cards
   */
  async getTrendingCards(): Promise<GiftCardListing[]> {
    const response = await apiClient.get<GiftCardListing[]>(
      '/marketplace/trending'
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch trending cards');
    }

    return response.data;
  },

  /**
   * Get filter options
   */
  async getFilterOptions(): Promise<{
    retailers: Array<{ id: string; name: string }>;
    conditions: string[];
    priceRange: { min: number; max: number };
  }> {
    const response = await apiClient.get('/marketplace/filters');

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch filter options');
    }

    return response.data;
  },
};
