'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/src/types';

interface AuthContextType {
  user: User | null;
  login: (role: User['role']) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (role: User['role']) => {
    setIsLoading(true);
    // Simulate anonymous login
    // In a real app, this would get a JWT from the backend
    setTimeout(() => {
      setUser({
        id: 'anon_' + Math.random().toString(36).substr(2, 9),
        username: 'Anonymous User',
        role,
        walletBalance: 250.00,
        pendingBalance: 50.00,
      });
      setIsLoading(false);
    }, 500);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
