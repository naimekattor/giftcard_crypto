import { GiftCard } from '@/types';

// This is a mock implementation of the API service
// In a real app, this would use fetch() or axios to call your Express backend
export const giftCardService = {
  getGiftCards: async (filters?: { retailer?: string }): Promise<GiftCard[]> => {
    // Simulating API latency
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockCards: GiftCard[] = [
      {
        id: '1',
        retailerId: 'amazon',
        retailerName: 'Amazon',
        denomination: 100,
        sellingPrice: 90,
        condition: 'new',
        status: 'listed',
        sellerId: 'user_1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        retailerId: 'apple-itunes',
        retailerName: 'Apple iTunes',
        denomination: 50,
        sellingPrice: 45,
        condition: 'new',
        status: 'listed',
        sellerId: 'user_2',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '3',
        retailerId: 'steam',
        retailerName: 'Steam',
        denomination: 200,
        sellingPrice: 180,
        condition: 'new',
        status: 'listed',
        sellerId: 'user_3',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '4',
        retailerId: 'google-play',
        retailerName: 'Google Play',
        denomination: 25,
        sellingPrice: 22,
        condition: 'new',
        status: 'listed',
        sellerId: 'user_4',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    if (filters?.retailer && filters.retailer !== 'all') {
      return mockCards.filter(card => card.retailerId === filters.retailer);
    }

    return mockCards;
  },

  verifyCard: async (cardId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  }
};
