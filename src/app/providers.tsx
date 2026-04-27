'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/features/auth/contexts/AuthContext';
import { Navigation } from '@/components/shared/Navigation';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

export const providers = (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  </QueryClientProvider>
);
    </QueryClientProvider>
  );
}
