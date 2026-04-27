/**
 * Validation Schemas
 * Zod schemas for form validation across the app
 */

import { z } from 'zod';
import { VALIDATION_RULES } from '@/constants/app';

// ============ Auth Validation ============
export const loginSchema = z.object({
  username: z.string().optional(),
  password: z
    .string()
    .min(VALIDATION_RULES.PASSWORD_MIN_LENGTH, 'Password is too short'),
});

export const signupSchema = z
  .object({
    password: z
      .string()
      .min(
        VALIDATION_RULES.PASSWORD_MIN_LENGTH,
        `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`
      )
      .regex(
        VALIDATION_RULES.PASSWORD_REGEX,
        'Password must contain uppercase, lowercase, and numbers'
      ),
    confirmPassword: z.string(),
    role: z.enum(['buyer', 'seller', 'admin']),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// ============ Gift Card Validation ============
export const createGiftCardSchema = z.object({
  retailerId: z.string().min(1, 'Retailer is required'),
  denomination: z
    .number()
    .min(1, 'Denomination must be greater than 0')
    .max(10000, 'Denomination cannot exceed $10,000'),
  sellingPrice: z
    .number()
    .min(1, 'Selling price must be greater than 0')
    .max(10000, 'Selling price cannot exceed $10,000'),
  condition: z.enum(['new', 'used']),
  description: z
    .string()
    .max(VALIDATION_RULES.MAX_DESCRIPTION_LENGTH, 'Description is too long')
    .optional(),
  expiryDate: z.string().datetime().optional(),
});

export const updateGiftCardSchema = createGiftCardSchema.partial();

// ============ Transaction Validation ============
export const buyGiftCardSchema = z.object({
  giftCardId: z.string().uuid('Invalid gift card ID'),
  cryptoType: z.enum(['BTC', 'ETH', 'USDT', 'USDC', 'SOL']),
  walletAddress: z
    .string()
    .min(20, 'Invalid wallet address')
    .regex(/^[a-zA-Z0-9]+$/, 'Wallet address contains invalid characters'),
});

// ============ Wallet Validation ============
export const withdrawalSchema = z.object({
  amount: z
    .number()
    .min(1, 'Withdrawal amount must be greater than 0')
    .positive('Amount must be positive'),
  walletAddress: z
    .string()
    .min(20, 'Invalid wallet address')
    .regex(/^[a-zA-Z0-9]+$/, 'Wallet address contains invalid characters'),
  cryptoType: z.enum(['BTC', 'ETH', 'USDT', 'USDC', 'SOL']),
});

// ============ Admin Validation ============
export const verificationSchema = z.object({
  giftCardId: z.string().uuid('Invalid gift card ID'),
  status: z.enum(['approved', 'rejected']),
  verifiedBalance: z
    .number()
    .min(0, 'Balance cannot be negative')
    .optional(),
  notes: z.string().max(500, 'Notes are too long').optional(),
});

// ============ Marketplace Filters Validation ============
export const marketplaceFiltersSchema = z.object({
  retailerId: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  condition: z.enum(['new', 'used']).optional(),
  sortBy: z
    .enum(['price_asc', 'price_desc', 'newest', 'rating'])
    .optional(),
  search: z.string().optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
});

// Export inferred types
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type CreateGiftCardFormData = z.infer<typeof createGiftCardSchema>;
export type BuyGiftCardFormData = z.infer<typeof buyGiftCardSchema>;
export type WithdrawalFormData = z.infer<typeof withdrawalSchema>;
export type VerificationFormData = z.infer<typeof verificationSchema>;
export type MarketplaceFilters = z.infer<typeof marketplaceFiltersSchema>;
