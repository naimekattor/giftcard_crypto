/**
 * Marketplace Page
 * Browse and filter gift cards
 */

'use client';

import React, { useState } from 'react';
import { useBrowseCards, useFilterOptions } from '@/features/marketplace/hooks/useMarketplace';
import { RetailerDropdown } from '@/components/shared/RetailerDropdown';
import { GiftCardCard } from '@/components/forms/GiftCardCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { Card } from '@/components/ui/Card';
import type { MarketplaceFilters } from '@/types';

export default function MarketplacePage() {
  const [filters, setFilters] = useState<MarketplaceFilters>({
    page: 1,
    limit: 20,
  });
  const [searchQuery, setSearchQuery] = useState('');

  const { data: cardsData, isLoading, isFetching } = useBrowseCards(filters);
  const { data: filterOptions } = useFilterOptions();

  const handleFilterChange = (newFilters: Partial<MarketplaceFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilterChange({ search: searchQuery });
  };

  const handleNextPage = () => {
    setFilters((prev) => ({ ...prev, page: (prev.page || 1) + 1 }));
  };

  const handlePrevPage = () => {
    if ((filters.page || 1) > 1) {
      setFilters((prev) => ({ ...prev, page: (prev.page || 1) - 1 }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Marketplace</h1>
          <p className="text-gray-600">
            Browse and purchase gift cards at discounted prices
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="col-span-1 md:col-span-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Search gift cards..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit">Search</Button>
              </div>
            </form>

            {/* Retailer */}
            <RetailerDropdown
              value={filters.retailerId || ''}
              onChange={(id) =>
                handleFilterChange({ retailerId: id || undefined })
              }
              label="Retailer"
            />

            {/* Condition */}
            <select
              value={filters.condition || ''}
              onChange={(e) =>
                handleFilterChange({
                  condition: (e.target.value as any) || undefined,
                })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="">All Conditions</option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice || ''}
              onChange={(e) =>
                handleFilterChange({
                  minPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
            />
            <Input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice || ''}
              onChange={(e) =>
                handleFilterChange({
                  maxPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
            />
          </div>

          {/* Sort */}
          <div className="mt-4">
            <select
              value={filters.sortBy || 'newest'}
              onChange={(e) =>
                handleFilterChange({
                  sortBy: (e.target.value as any) || undefined,
                })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full md:w-48"
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Best Rated</option>
            </select>
          </div>
        </Card>

        {/* Cards Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Spinner size="lg" />
          </div>
        ) : cardsData && cardsData.data.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {cardsData.data.map((card) => (
                <GiftCardCard key={card.id} card={card} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                onClick={handlePrevPage}
                disabled={(filters.page || 1) === 1}
                variant="outline"
              >
                Previous
              </Button>
              <span className="text-gray-600">
                Page {filters.page || 1} of {Math.ceil(cardsData.total / (filters.limit || 20))}
              </span>
              <Button
                onClick={handleNextPage}
                disabled={!cardsData.hasMore}
                variant="outline"
              >
                Next
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No gift cards found</p>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
