# 📖 Implementation Guide - Gift Card Marketplace

## 🎯 Quick Start Guide

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Step 1: Clone & Install
```bash
git clone <repository>
cd giftcard_crypto
npm install
```

### Step 2: Configure Environment
```bash
cp .env.local.example .env.local
# Edit .env.local with your backend API URL
```

### Step 3: Start Development Server
```bash
npm run dev
```

Navigate to `http://localhost:3000`

---

## 🔗 Backend Integration

This frontend is designed to work with a Node.js/Express backend. Ensure your backend provides these API endpoints:

### Authentication Endpoints
```
POST   /api/auth/signup        - Register new user
POST   /api/auth/login         - Login user
POST   /api/auth/logout        - Logout user
POST   /api/auth/refresh       - Refresh token
GET    /api/auth/me            - Get current user
PUT    /api/auth/profile       - Update profile
POST   /api/auth/change-password
POST   /api/auth/password-reset-request
POST   /api/auth/password-reset-confirm
```

### Marketplace Endpoints
```
GET    /api/marketplace/cards              - Browse cards with filters
GET    /api/marketplace/cards/:id          - Get card details
GET    /api/marketplace/cards/search       - Search cards
GET    /api/marketplace/trending           - Get trending cards
GET    /api/marketplace/filters            - Get filter options
GET    /api/marketplace/sellers/:id/profile - Get seller profile
```

### Wallet Endpoints
```
GET    /api/wallet                       - Get wallet
GET    /api/wallet/transactions          - Transaction history
GET    /api/wallet/stats                 - Wallet stats
GET    /api/wallet/withdrawals           - Withdrawal history
POST   /api/wallet/withdrawal-request    - Request withdrawal
POST   /api/wallet/add-funds             - Add funds (crypto payment callback)
```

### Transaction Endpoints
```
POST   /api/transactions/initiate        - Start purchase
GET    /api/transactions/:id             - Get transaction
POST   /api/transactions/:id/confirm     - Confirm payment
POST   /api/transactions/:id/cancel      - Cancel transaction
GET    /api/transactions/history         - User transaction history
GET    /api/transactions/:id/receipt     - Get receipt
```

### Admin Endpoints
```
GET    /api/admin/stats                  - Platform statistics
GET    /api/admin/verifications          - Pending verifications
POST   /api/admin/verifications/:id/approve
POST   /api/admin/verifications/:id/reject
GET    /api/admin/fraud-reports
```

---

## 📝 API Response Format

All endpoints should return responses in this format:

```json
{
  "success": true,
  "data": { /* response data */ },
  "error": null,
  "message": "Success message",
  "statusCode": 200
}
```

Error response:
```json
{
  "success": false,
  "data": null,
  "error": "Error description",
  "message": "Error message",
  "statusCode": 400
}
```

---

## 🔄 Authentication Flow

### 1. Signup
```
User fills signup form 
  ↓
Frontend validates with Zod
  ↓
POST to /auth/signup
  ↓
Backend creates user, generates JWT
  ↓
Frontend stores JWT in localStorage
  ↓
Frontend stores user in AuthContext
  ↓
Redirect to dashboard
```

### 2. Login
```
User enters credentials
  ↓
Frontend validates
  ↓
POST to /auth/login
  ↓
Backend validates, returns JWT
  ↓
Frontend stores token & user
  ↓
AuthContext updated
  ↓
Protected routes accessible
```

### 3. Token Refresh
```
API returns 401 (token expired)
  ↓
Automatically POST to /auth/refresh
  ↓
Backend returns new token
  ↓
Frontend stores new token
  ↓
Original request retried
```

---

## 🛠️ Adding New Features

### Example: Add Transaction History Filter

1. **Update types** (`src/types/index.ts`):
```typescript
export interface TransactionFilter {
  status?: TransactionStatus;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}
```

2. **Update service** (`src/features/transactions/services/transactionService.ts`):
```typescript
async getFiltered(filters: TransactionFilter) {
  const params = new URLSearchParams();
  if (filters.status) params.append('status', filters.status);
  // ... add other filters
  
  const response = await apiClient.get(
    `/transactions/history?${params.toString()}`
  );
  // ... handle response
}
```

3. **Create hook** (`src/features/transactions/hooks/useTransactions.ts`):
```typescript
export function useFilteredTransactions(filters: TransactionFilter) {
  return useQuery({
    queryKey: ['transactions', filters],
    queryFn: () => transactionService.getFiltered(filters),
  });
}
```

4. **Use in component**:
```typescript
const { data, isLoading } = useFilteredTransactions({ 
  status: 'completed',
  page: 1 
});
```

---

## 🧪 Testing

### Unit Tests Example
```typescript
// tests/unit/utils/formatCurrency.test.ts
import { formatCurrency } from '@/lib/utils';

describe('formatCurrency', () => {
  it('should format currency correctly', () => {
    expect(formatCurrency(100)).toBe('$100.00');
  });
});
```

### Integration Tests Example
```typescript
// tests/integration/auth.test.ts
import { authService } from '@/features/auth/services/authService';

describe('Auth Service', () => {
  it('should login user', async () => {
    const result = await authService.login({
      password: 'Test123',
    });
    expect(result.user).toBeDefined();
    expect(result.token).toBeDefined();
  });
});
```

---

## 🚀 Deployment

### Build
```bash
npm run build
```

### Environment for Production
```env
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com/api
NODE_ENV=production
```

### Deploy to Vercel
```bash
vercel deploy
```

### Deploy to Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📊 Performance Tips

1. **Use React Query DevTools** (development)
```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
```

2. **Implement Pagination** - Load data in chunks
3. **Cache Strategically** - Set appropriate `staleTime`
4. **Dynamic Imports** - Code split large features
5. **Image Optimization** - Use Next.js Image component

---

## 🐛 Debugging

### Enable API Logging
```typescript
// Add to apiClient.ts
console.log('API Request:', method, endpoint);
console.log('Response:', response);
```

### React Query DevTools
Shows all queries, mutations, cache states

### Browser DevTools
- Network tab: Monitor API calls
- Application tab: Check localStorage
- Console: Check for errors

---

## 📚 Code Examples

### Creating a New Page
```typescript
'use client';

import React from 'react';
import { useCustomHook } from '@/features/feature/hooks';

export default function FeaturePage() {
  const { data, isLoading } = useCustomHook();
  
  return (
    <div className="container">
      {isLoading ? <Spinner /> : <Content data={data} />}
    </div>
  );
}
```

### Creating a Custom Hook with React Query
```typescript
export function useMyFeature(id: string) {
  return useQuery({
    queryKey: ['feature', id],
    queryFn: () => featureService.get(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
}
```

### Form with Validation
```typescript
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
});

<input {...register('field')} />
{errors.field && <span>{errors.field.message}</span>}
```

---

## ✅ Checklist Before Production

- [ ] All environment variables configured
- [ ] Backend API tested and working
- [ ] Authentication flow working end-to-end
- [ ] Error handling implemented
- [ ] Loading states visible
- [ ] Mobile responsive tested
- [ ] Performance optimized
- [ ] Security audit completed
- [ ] Deployment tested in staging
- [ ] Analytics configured
- [ ] Error tracking setup (Sentry)
- [ ] Documentation updated

---

## 📞 Support & Resources

- **Documentation**: See `ARCHITECTURE.md`
- **TypeScript Types**: Check `src/types/index.ts`
- **API Client**: `src/lib/api/client.ts`
- **Validation**: `src/lib/validations/schemas.ts`

---

**Happy coding! 🚀**
