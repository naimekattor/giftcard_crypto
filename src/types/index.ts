import { RetailerId } from '@/src/constants/retailers';

export type GiftCardStatus = 'pending' | 'verified' | 'completed' | 'failed';

export interface GiftCard {
  id: string;
  retailerId: RetailerId;
  value: number;
  price: number;
  status: GiftCardStatus;
  sellerId: string;
  createdAt: string;
  verifiedAt?: string;
  description?: string;
}

export interface Transaction {
  id: string;
  giftCardId: string;
  buyerId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  currency: string;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  role: 'buyer' | 'seller' | 'admin';
  walletBalance: number;
  pendingBalance: number;
}
