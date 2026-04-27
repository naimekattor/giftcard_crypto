/**
 * Transaction Service
 * Handles gift card purchase transactions
 */

import { apiClient } from '@/lib/api/client';
import type { Transaction } from '@/types';

export const transactionService = {
  /**
   * Initiate a purchase transaction
   */
  async initiatePurchase(data: {
    giftCardId: string;
    cryptoType: string;
    walletAddress: string;
  }): Promise<Transaction> {
    const response = await apiClient.post<Transaction>(
      '/transactions/initiate',
      data
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to initiate purchase');
    }

    return response.data;
  },

  /**
   * Get transaction details
   */
  async getTransaction(transactionId: string): Promise<Transaction> {
    const response = await apiClient.get<Transaction>(
      `/transactions/${transactionId}`
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Transaction not found');
    }

    return response.data;
  },

  /**
   * Confirm payment completion
   */
  async confirmPayment(transactionId: string, paymentHash: string): Promise<Transaction> {
    const response = await apiClient.post<Transaction>(
      `/transactions/${transactionId}/confirm`,
      { paymentHash }
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to confirm payment');
    }

    return response.data;
  },

  /**
   * Cancel transaction
   */
  async cancelTransaction(transactionId: string): Promise<void> {
    const response = await apiClient.post(
      `/transactions/${transactionId}/cancel`
    );

    if (!response.success) {
      throw new Error(response.error || 'Failed to cancel transaction');
    }
  },

  /**
   * Get transaction history for user
   */
  async getUserTransactions(page: number = 1, limit: number = 20): Promise<{
    data: Transaction[];
    total: number;
    page: number;
    limit: number;
  }> {
    const response = await apiClient.get(
      `/transactions/history?page=${page}&limit=${limit}`
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch transactions');
    }

    return response.data;
  },

  /**
   * Get transaction receipt
   */
  async getReceipt(transactionId: string): Promise<{
    id: string;
    date: string;
    amount: number;
    giftCard: { retailer: string; value: number };
    status: string;
  }> {
    const response = await apiClient.get(`/transactions/${transactionId}/receipt`);

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Receipt not found');
    }

    return response.data;
  },
};
