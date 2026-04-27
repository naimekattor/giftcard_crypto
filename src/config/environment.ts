/**
 * Environment Configuration
 * Centralized configuration from environment variables
 */

export const config = {
  // API
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),
  },

  // Authentication
  auth: {
    tokenKey: 'gc_auth_token',
    refreshTokenKey: 'gc_refresh_token',
    tokenExpiryThreshold: 5 * 60 * 1000, // 5 minutes
  },

  // Crypto/Payment
  crypto: {
    // Add payment provider config here
    // e.g., STRIPE_KEY, CRYPTO_PROVIDER_API, etc.
  },

  // Feature Flags
  features: {
    enableVerification: process.env.NEXT_PUBLIC_ENABLE_VERIFICATION !== 'false',
    enableCryptoPayment: process.env.NEXT_PUBLIC_ENABLE_CRYPTO !== 'false',
    enableAdminPanel: process.env.NEXT_PUBLIC_ENABLE_ADMIN !== 'false',
  },

  // Environment
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
};

export default config;
