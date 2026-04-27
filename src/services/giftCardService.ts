import { GiftCard, GiftCardStatus } from '@/src/types';
import { RetailerId } from '@/src/constants/retailers';

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
        value: 100,
        price: 90,
        status: 'verified',
        sellerId: 'user_1',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        retailerId: 'apple',
        value: 50,
        price: 45,
        status: 'verified',
        sellerId: 'user_2',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        retailerId: 'steam',
        value: 200,
        price: 180,
        status: 'verified',
        sellerId: 'user_3',
        createdAt: new Date().toISOString(),
      },
      {
        id: '4',
        retailerId: 'google-play',
        value: 25,
        price: 22,
        status: 'verified',
        sellerId: 'user_4',
        createdAt: new Date().toISOString(),
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
