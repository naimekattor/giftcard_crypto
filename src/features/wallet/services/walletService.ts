/**
 * Wallet Service
 * Handles wallet balance, transactions, and withdrawals
 */

import { apiClient } from '@/lib/api/client';
import type {
  Wallet,
  WalletTransaction,
  PaginatedResponse,
} from '@/types';

export const walletService = {
  /**
   * Get user's wallet
   */
  async getWallet(): Promise<Wallet> {
    const response = await apiClient.get<Wallet>('/wallet');

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch wallet');
    }

    return response.data;
  },

  /**
   * Get wallet transaction history
   */
  async getTransactionHistory(
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedResponse<WalletTransaction>> {
    const response = await apiClient.get<PaginatedResponse<WalletTransaction>>(
      `/wallet/transactions?page=${page}&limit=${limit}`
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch transactions');
    }

    return response.data;
  },

  /**
   * Get wallet summary stats
   */
  async getWalletStats(): Promise<{
    totalEarnings: number;
    totalSpent: number;
    averageTransactionValue: number;
    transactionCount: number;
  }> {
    const response = await apiClient.get('/wallet/stats');

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch wallet stats');
    }

    return response.data;
  },

  /**
   * Request withdrawal
   */
  async requestWithdrawal(data: {
    amount: number;
    walletAddress: string;
    cryptoType: string;
  }): Promise<{
    id: string;
    status: string;
    estimatedFee: number;
  }> {
    const response = await apiClient.post('/wallet/withdrawal-request', data);

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Withdrawal request failed');
    }

    return response.data;
  },

  /**
   * Get withdrawal history
   */
  async getWithdrawalHistory(
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedResponse<any>> {
    const response = await apiClient.get<PaginatedResponse<any>>(
      `/wallet/withdrawals?page=${page}&limit=${limit}`
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch withdrawals');
    }

    return response.data;
  },

  /**
   * Add funds to wallet (crypto payment callback)
   */
  async addFunds(data: {
    transactionHash: string;
    amount: number;
    cryptoType: string;
  }): Promise<Wallet> {
    const response = await apiClient.post<Wallet>('/wallet/add-funds', data);

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to add funds');
    }

    return response.data;
  },
};
