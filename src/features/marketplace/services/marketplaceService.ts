/**
 * Marketplace Service
 * Handles gift card listing, searching, and browsing
 */

import type {
  GiftCardListing,
  PaginatedResponse,
  MarketplaceFilters,
  CardStatus,
} from '@/types';
import { MOCK_GIFT_CARDS } from '@/data/mockGiftCards';

export const marketplaceService = {
  /**
   * Browse all available gift cards
   */
  async browseCards(
    filters?: MarketplaceFilters
  ): Promise<PaginatedResponse<GiftCardListing>> {
    let filteredCards = [...MOCK_GIFT_CARDS];

    // Apply filters
    if (filters?.retailerId) {
      filteredCards = filteredCards.filter(
        (card) => card.retailerId === filters.retailerId
      );
    }

    if (filters?.minPrice !== undefined) {
      filteredCards = filteredCards.filter(
        (card) => card.sellingPrice >= filters.minPrice!
      );
    }

    if (filters?.maxPrice !== undefined) {
      filteredCards = filteredCards.filter(
        (card) => card.sellingPrice <= filters.maxPrice!
      );
    }

    if (filters?.condition) {
      filteredCards = filteredCards.filter(
        (card) => card.condition === filters.condition
      );
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredCards = filteredCards.filter(
        (card) =>
          card.retailerName.toLowerCase().includes(searchLower) ||
          card.description?.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc':
          filteredCards.sort((a, b) => a.sellingPrice - b.sellingPrice);
          break;
        case 'price_desc':
          filteredCards.sort((a, b) => b.sellingPrice - a.sellingPrice);
          break;
        case 'newest':
          filteredCards.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case 'rating':
          filteredCards.sort(
            (a, b) => (b.seller?.rating ?? 0) - (a.seller?.rating ?? 0)
          );
          break;
      }
    }

    // Pagination
    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 12;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedCards = filteredCards.slice(start, end);

    return {
      data: paginatedCards,
      total: filteredCards.length,
      page,
      limit,
      hasMore: end < filteredCards.length,
    };
  },

  /**
   * Get single gift card details
   */
  async getCardDetails(cardId: string): Promise<GiftCardListing> {
    const card = MOCK_GIFT_CARDS.find((c) => c.id === cardId);
    if (!card) {
      throw new Error('Card not found');
    }
    return card;
  },

  /**
   * Get seller profile (anonymous)
   */
  async getSellerProfile(
    sellerId: string
  ): Promise<{ id: string; rating: number; successRate: number }> {
    const cards = MOCK_GIFT_CARDS.filter((c) => c.sellerId === sellerId);
    if (cards.length === 0) {
      throw new Error('Seller not found');
    }
    const seller = cards[0].seller;
    return {
      id: sellerId,
      rating: seller?.rating ?? 0,
      successRate: seller?.successRate ?? 0,
    };
  },

  /**
   * Search cards with query
   */
  async searchCards(
    query: string,
    page: number = 1
  ): Promise<PaginatedResponse<GiftCardListing>> {
    return this.browseCards({ search: query, page, limit: 12 });
  },

  /**
   * Get trending cards
   */
  async getTrendingCards(): Promise<GiftCardListing[]> {
    return [...MOCK_GIFT_CARDS]
      .sort((a, b) => (b.seller?.rating ?? 0) - (a.seller?.rating ?? 0))
      .slice(0, 6);
  },

  /**
   * Get filter options
   */
  async getFilterOptions(): Promise<{
    retailers: Array<{ id: string; name: string }>;
    conditions: string[];
    priceRange: { min: number; max: number };
  }> {
    const retailers = Array.from(
      new Set(MOCK_GIFT_CARDS.map((c) => c.retailerId))
    ).map((id) => ({
      id,
      name: MOCK_GIFT_CARDS.find((c) => c.retailerId === id)?.retailerName || id,
    }));

    const conditions = ['new', 'used'];
    const prices = MOCK_GIFT_CARDS.map((c) => c.sellingPrice);
    const priceRange = {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };

    return { retailers, conditions, priceRange };
  },
};
