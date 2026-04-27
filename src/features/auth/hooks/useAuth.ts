/**
 * Authentication Hooks
 * Reusable hooks for auth operations
 */

'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/features/auth/contexts/AuthContext';
import { authService } from '@/features/auth/services/authService';
import type { AuthCredentials } from '@/types';

/**
 * Hook for login
 */
export function useLogin() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (credentials: AuthCredentials) => {
      const response = await authService.login(credentials);
      login(response.user, response.token);
      return response;
    },
  });
}

/**
 * Hook for signup
 */
export function useSignup() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (credentials: AuthCredentials) => {
      const response = await authService.signup(credentials);
      login(response.user, response.token);
      return response;
    },
  });
}

/**
 * Hook for logout
 */
export function useLogout() {
  const { logout } = useAuth();

  return useMutation({
    mutationFn: async () => {
      await authService.logout();
      logout();
    },
  });
}

/**
 * Hook for password reset request
 */
export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: (identifier: string) =>
      authService.requestPasswordReset(identifier),
  });
}

/**
 * Hook for confirming password reset
 */
export function useConfirmPasswordReset() {
  return useMutation({
    mutationFn: ({
      token,
      newPassword,
    }: {
      token: string;
      newPassword: string;
    }) => authService.confirmPasswordReset(token, newPassword),
  });
}
