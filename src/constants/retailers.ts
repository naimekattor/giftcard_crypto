/**
 * Predefined Retailers List
 * Safe to expose - no sensitive data
 */

import type { Retailer } from '@/types';

export const RETAILERS: Retailer[] = [
  {
    id: 'amazon',
    name: 'Amazon',
    category: 'Shopping',
    isActive: true,
  },
  {
    id: 'google-play',
    name: 'Google Play',
    category: 'Entertainment',
    isActive: true,
  },
  {
    id: 'apple-itunes',
    name: 'Apple iTunes',
    category: 'Entertainment',
    isActive: true,
  },
  {
    id: 'steam',
    name: 'Steam',
    category: 'Gaming',
    isActive: true,
  },
  {
    id: 'playstation',
    name: 'PlayStation Network',
    category: 'Gaming',
    isActive: true,
  },
  {
    id: 'xbox',
    name: 'Xbox Game Pass',
    category: 'Gaming',
    isActive: true,
  },
  {
    id: 'netflix',
    name: 'Netflix',
    category: 'Entertainment',
    isActive: true,
  },
  {
    id: 'spotify',
    name: 'Spotify',
    category: 'Entertainment',
    isActive: true,
  },
  {
    id: 'hulu',
    name: 'Hulu',
    category: 'Entertainment',
    isActive: true,
  },
  {
    id: 'disney-plus',
    name: 'Disney+',
    category: 'Entertainment',
    isActive: true,
  },
  {
    id: 'uber-eats',
    name: 'Uber Eats',
    category: 'Food',
    isActive: true,
  },
  {
    id: 'doordash',
    name: 'DoorDash',
    category: 'Food',
    isActive: true,
  },
  {
    id: 'whole-foods',
    name: 'Whole Foods',
    category: 'Shopping',
    isActive: true,
  },
  {
    id: 'target',
    name: 'Target',
    category: 'Shopping',
    isActive: true,
  },
  {
    id: 'walmart',
    name: 'Walmart',
    category: 'Shopping',
    isActive: true,
  },
  {
    id: 'john-lewis',
    name: 'John Lewis',
    category: 'Shopping',
    isActive: true,
  },
];

export const getRetailerById = (id: string): Retailer | undefined => {
  return RETAILERS.find((r) => r.id === id);
};

export const getRetailerName = (id: string): string => {
  return getRetailerById(id)?.name || 'Unknown Retailer';
};

export const getRetailersByCategory = (category: string): Retailer[] => {
  return RETAILERS.filter((r) => r.category === category && r.isActive);
};

export const RETAILER_CATEGORIES = Array.from(
  new Set(RETAILERS.map((r) => r.category))
);
