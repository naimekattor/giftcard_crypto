# 🎁 Gift Card Marketplace - Production-Ready Architecture

## 📁 Complete Folder Structure

```
src/
├── app/                              # Next.js App Router
│   ├── (auth)/                       # Auth group layout
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   │
│   ├── (dashboard)/                  # Protected dashboard routes
│   │   ├── buyer/page.tsx
│   │   ├── seller/page.tsx
│   │   └── admin/page.tsx
│   │
│   ├── api/                          # API routes
│   │   └── auth/                     # Auth endpoints
│   │
│   ├── marketplace/
│   │   └── page.tsx                  # Public marketplace
│   │
│   ├── wallet/
│   │   └── page.tsx                  # Wallet management
│   │
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home page
│   └── providers.tsx                 # Global providers (React Query, Auth)
│
├── components/
│   ├── ui/                           # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── Spinner.tsx
│   │
│   ├── shared/                       # Shared across features
│   │   ├── Navigation.tsx
│   │   └── RetailerDropdown.tsx
│   │
│   └── forms/                        # Form components
│       └── GiftCardCard.tsx
│
├── features/                         # Feature-based modules
│   │
│   ├── auth/
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx       # Global auth state
│   │   ├── services/
│   │   │   └── authService.ts        # Auth API calls
│   │   ├── hooks/
│   │   │   └── useAuth.ts            # Auth mutations
│   │   └── middleware/
│   │       └── protectedRoutes.ts
│   │
│   ├── marketplace/
│   │   ├── services/
│   │   │   └── marketplaceService.ts
│   │   ├── hooks/
│   │   │   └── useMarketplace.ts
│   │   └── components/
│   │       └── (feature-specific components)
│   │
│   ├── wallet/
│   │   ├── services/
│   │   │   └── walletService.ts
│   │   ├── hooks/
│   │   │   └── useWallet.ts
│   │   └── components/
│   │
│   ├── transactions/
│   │   └── services/
│   │       └── transactionService.ts
│   │
│   ├── giftcards/
│   │   ├── services/
│   │   │   └── giftCardService.ts
│   │   ├── hooks/
│   │   │   └── useGiftCards.ts
│   │   └── components/
│   │
│   └── admin/
│       ├── services/
│       │   └── adminService.ts
│       ├── hooks/
│       │   └── useAdmin.ts
│       └── components/
│
├── hooks/
│   └── common/
│       ├── useQuery.ts               # Custom query hooks
│       └── usePagination.ts          # Pagination logic
│
├── lib/
│   ├── api/
│   │   └── client.ts                 # API client with interceptors
│   ├── validations/
│   │   └── schemas.ts                # Zod validation schemas
│   ├── utils.ts                      # Utility functions
│   └── constants.ts
│
├── services/
│   └── giftCardService.ts            # (Legacy - to be deprecated)
│
├── store/
│   └── slices/
│       └── (Redux slices if needed)
│
├── types/
│   └── index.ts                      # Global TypeScript types
│
├── constants/
│   ├── retailers.ts                  # Retailer list
│   └── app.ts                        # App constants
│
├── config/
│   └── environment.ts                # Environment config
│
└── styles/
    └── globals.css                   # Global styles
```

## 🔧 Tech Stack Breakdown

| Category | Tool | Version |
|----------|------|---------|
| Framework | Next.js (App Router) | 15.3.3 |
| Language | TypeScript | ~5.8.2 |
| Styling | Tailwind CSS | 4.1.14 |
| State Management | React Query | 5.100.5 |
| Form Handling | React Hook Form | 7.74.0 |
| Validation | Zod | 4.3.6 |
| HTTP Client | Fetch API | Native |
| Icons | Lucide React | 0.546.0 |
| Animations | Motion | 12.23.24 |

## 🚀 Getting Started

### 1. Installation

```bash
cd giftcard_crypto
npm install
```

### 2. Environment Setup

```bash
cp .env.local.example .env.local
# Edit .env.local with your configuration
```

### 3. Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
npm run start
```

## 🏗️ Architecture Principles

### 1. **Feature-Based Structure**
- Each feature is self-contained
- Clear separation of concerns
- Easy to scale and maintain

### 2. **Service Layer Pattern**
```
Component → Hook (Query/Mutation) → Service → API Client → Backend
```

### 3. **Type Safety**
- Full TypeScript implementation
- Zod schema validation
- Type-safe API responses

### 4. **State Management**
- React Context for auth
- React Query for server state
- Component-level state for UI

### 5. **API Integration**
- Centralized API client
- Automatic token injection
- Error handling & interceptors
- Request timeout configuration

## 🔐 Security Features

### Authentication
- Token-based (JWT)
- Anonymous user IDs
- Secure storage in localStorage
- Auto token refresh

### Data Protection
- No sensitive data in URLs
- HTTPS recommended (production)
- CORS configuration
- Input sanitization via Zod

### Role-Based Access
```
- Buyer: Browse, purchase, withdraw
- Seller: List cards, manage listings, withdraw
- Admin: Verification, platform management
```

## 📊 Key Services

### Authentication Service
- Login/Signup (anonymous)
- Token management
- Profile management
- Password reset

### Marketplace Service
- Browse gift cards
- Search & filter
- Get card details
- Seller profiles

### Wallet Service
- Balance management
- Transaction history
- Withdrawal requests
- Fund management

### Transaction Service
- Purchase initiation
- Payment confirmation
- Receipt generation
- Transaction history

## 🎯 Development Workflow

### Adding a New Feature

1. **Create feature directory** in `src/features/`
2. **Define types** in `src/types/index.ts`
3. **Create service** in `features/[feature]/services/`
4. **Create React Query hook** in `features/[feature]/hooks/`
5. **Build components** in `features/[feature]/components/`
6. **Create pages** in `src/app/[route]/page.tsx`

### Example: Adding Cart Functionality

```
src/features/cart/
├── services/cartService.ts          # Cart API calls
├── hooks/useCart.ts                 # React Query hooks
├── components/
│   ├── CartItem.tsx
│   └── CartSummary.tsx
└── types.ts                         # Cart-specific types
```

## 🧪 Testing Structure (To Add)

```
tests/
├── unit/
│   ├── services/
│   ├── hooks/
│   └── utils/
├── integration/
│   └── flows/
└── e2e/
    └── scenarios/
```

## 📈 Performance Optimizations

1. **Code Splitting**: Dynamic imports for routes
2. **Caching**: React Query staleTime strategies
3. **Image Optimization**: Next.js Image component
4. **Bundle Analysis**: Monitor build size
5. **API Optimization**: Request batching, pagination

## 🐛 Error Handling

All errors flow through:
1. **API Client** - Network/HTTP errors
2. **React Query** - Server state errors
3. **Error Boundary** - Component rendering errors
4. **Global Error UI** - Toast notifications

## 📝 Code Standards

- **Naming**: camelCase for files/functions, PascalCase for components
- **Comments**: JSDoc for public functions
- **Imports**: Group by external, internal, types
- **Exports**: Named exports preferred

## 🔄 Deployment Checklist

- [ ] Environment variables configured
- [ ] Backend API running
- [ ] Database migrations applied
- [ ] Build succeeds without warnings
- [ ] All tests passing
- [ ] No console errors in dev tools
- [ ] Performance audit passed
- [ ] Security review completed

## 📚 Additional Resources

- Next.js Docs: https://nextjs.org/docs
- React Query: https://tanstack.com/query/latest
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs
- Zod: https://zod.dev

## 🤝 Contributing

1. Follow the feature-based structure
2. Maintain type safety
3. Add tests for new features
4. Document complex logic
5. Keep components reusable

---

**Built with ❤️ for scalable, production-ready applications**
