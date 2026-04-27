'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, AuthToken } from '@/types';
import { getAuthToken, clearAuthTokens } from '@/lib/utils';

interface AuthContextType {
  user: User | null;
  token: AuthToken | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (user: User, token: AuthToken) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<AuthToken | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage on mount
  useEffect(() => {
    const initAuth = () => {
      try {
        const savedToken = localStorage.getItem('gc_auth_token');
        const savedUser = localStorage.getItem('gc_user');

        if (savedToken && savedUser) {
          // Parse and validate token isn't expired
          const parsedToken = JSON.parse(savedToken);
          const parsedUser = JSON.parse(savedUser);
          setToken(parsedToken);
          setUser(parsedUser);
        }
      } catch (error) {
        // Token parsing error - clear storage
        clearAuthTokens();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (newUser: User, newToken: AuthToken) => {
    setUser(newUser);
    setToken(newToken);
    localStorage.setItem('gc_auth_token', JSON.stringify(newToken));
    localStorage.setItem('gc_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    clearAuthTokens();
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('gc_user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
