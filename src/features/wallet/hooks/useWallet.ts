/**
 * Wallet Hooks
 * React Query hooks for wallet operations
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { walletService } from '@/features/wallet/services/walletService';

/**
 * Hook to fetch wallet data
 */
export function useWallet() {
  return useQuery({
    queryKey: ['wallet'],
    queryFn: () => walletService.getWallet(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook to fetch wallet transaction history
 */
export function useTransactionHistory(page: number = 1, limit: number = 20) {
  return useQuery({
    queryKey: ['wallet', 'transactions', page, limit],
    queryFn: () => walletService.getTransactionHistory(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch wallet stats
 */
export function useWalletStats() {
  return useQuery({
    queryKey: ['wallet', 'stats'],
    queryFn: () => walletService.getWalletStats(),
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Hook for withdrawal request
 */
export function useRequestWithdrawal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      amount: number;
      walletAddress: string;
      cryptoType: string;
    }) => walletService.requestWithdrawal(data),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      queryClient.invalidateQueries({ queryKey: ['wallet', 'withdrawals'] });
    },
  });
}

/**
 * Hook to fetch withdrawal history
 */
export function useWithdrawalHistory(page: number = 1, limit: number = 20) {
  return useQuery({
    queryKey: ['wallet', 'withdrawals', page, limit],
    queryFn: () => walletService.getWithdrawalHistory(page, limit),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook for adding funds
 */
export function useAddFunds() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      transactionHash: string;
      amount: number;
      cryptoType: string;
    }) => walletService.addFunds(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      queryClient.invalidateQueries({ queryKey: ['wallet', 'stats'] });
    },
  });
}
