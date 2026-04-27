/**
 * Authentication Service
 * Handles all auth-related API calls
 */

import { apiClient } from '@/lib/api/client';
import type { AuthResponse, AuthCredentials, User } from '@/types';

export const authService = {
  /**
   * Register a new user
   */
  async signup(credentials: AuthCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/signup', {
      username: credentials.username,
      password: credentials.password,
      role: credentials.role || 'buyer',
    });

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Signup failed');
    }

    return response.data;
  },

  /**
   * Login user
   */
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', {
      username: credentials.username,
      password: credentials.password,
    });

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Login failed');
    }

    return response.data;
  },

  /**
   * Refresh authentication token
   */
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/refresh', {
      refreshToken,
    });

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Token refresh failed');
    }

    return response.data;
  },

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me');

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch user');
    }

    return response.data;
  },

  /**
   * Logout user (invalidate token on backend)
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      // Continue logout even if API call fails
      console.error('Logout API error:', error);
    }
  },

  /**
   * Update user profile
   */
  async updateProfile(updates: Partial<User>): Promise<User> {
    const response = await apiClient.put<User>('/auth/profile', updates);

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Profile update failed');
    }

    return response.data;
  },

  /**
   * Change password
   */
  async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    const response = await apiClient.post('/auth/change-password', {
      oldPassword,
      newPassword,
    });

    if (!response.success) {
      throw new Error(response.error || 'Password change failed');
    }
  },

  /**
   * Request password reset
   */
  async requestPasswordReset(identifier: string): Promise<void> {
    const response = await apiClient.post('/auth/password-reset-request', {
      identifier,
    });

    if (!response.success) {
      throw new Error(response.error || 'Password reset request failed');
    }
  },

  /**
   * Confirm password reset with token
   */
  async confirmPasswordReset(
    token: string,
    newPassword: string
  ): Promise<void> {
    const response = await apiClient.post('/auth/password-reset-confirm', {
      token,
      newPassword,
    });

    if (!response.success) {
      throw new Error(response.error || 'Password reset failed');
    }
  },
};
