# 🎁 Gift Card Marketplace Platform - Complete Implementation

> A production-ready, scalable anonymous gift card marketplace built with Next.js, TypeScript, and modern React patterns.

## 🌟 Features

✅ **Anonymous Authentication** - No email or personal data required  
✅ **Gift Card Marketplace** - Browse, filter, and purchase with ease  
✅ **Crypto Payments** - BTC, ETH, USDT, USDC, SOL support  
✅ **Wallet System** - Manage balances and transactions  
✅ **Admin Dashboard** - Verification queue and platform management  
✅ **Seller Dashboard** - List and manage gift card sales  
✅ **Role-Based Access** - Buyer, Seller, Admin roles  
✅ **Type-Safe** - Full TypeScript implementation  
✅ **Mobile Responsive** - Works on all devices  
✅ **Production-Ready** - Scalable, maintainable architecture  

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15.3.3, React 19, TypeScript |
| **Styling** | Tailwind CSS 4.1.14 |
| **State** | React Query 5.100.5, React Context |
| **Forms** | React Hook Form 7.74.0, Zod 4.3.6 |
| **API** | Fetch API, Custom HTTP Client |
| **Build** | Vite 6.2.0, Next.js Build |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd giftcard_crypto

# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local with your backend API URL

# Start development server
npm run dev
```

Visit `http://localhost:3000`

---

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   ├── (dashboard)/              # Protected dashboards (buyer/seller/admin)
│   ├── marketplace/              # Public marketplace
│   ├── wallet/                   # Wallet management
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Home page
│   └── providers.tsx             # React Query + Auth Provider
│
├── components/                   # Reusable Components
│   ├── ui/                       # Base UI components (Button, Input, Card, etc.)
│   ├── shared/                   # App-wide components (Navigation, Dropdown)
│   └── forms/                    # Form-specific components
│
├── features/                     # Feature Modules (Modular)
│   ├── auth/                     # Authentication
│   ├── marketplace/              # Gift card marketplace
│   ├── wallet/                   # Wallet management
│   ├── transactions/             # Transaction handling
│   ├── giftcards/                # Gift card operations
│   └── admin/                    # Admin functionality
│
├── lib/
│   ├── api/                      # HTTP client with interceptors
│   ├── validations/              # Zod schemas
│   └── utils.ts                  # Utility functions
│
├── types/                        # Global TypeScript types
├── constants/                    # Constants (retailers, etc.)
└── config/                       # Configuration
```

---

## 🔐 Security & Architecture

See **ARCHITECTURE.md** for:
- Complete folder structure
- Security features
- API integration guide
- Development workflow

See **IMPLEMENTATION_GUIDE.md** for:
- Step-by-step setup
- Backend API endpoints
- Authentication flow
- Feature development

---

## 🧪 Development Commands

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
```

---

## 📞 Documentation

- **ARCHITECTURE.md** - Complete technical architecture
- **IMPLEMENTATION_GUIDE.md** - Implementation & integration guide
- **src/types/index.ts** - All TypeScript type definitions
- **src/lib/api/client.ts** - API client documentation
- **.env.local.example** - Environment variables template

---

**Built with ❤️ as a production-ready platform**
