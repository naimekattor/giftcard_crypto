import { MarketplacePage } from '@/src/features/marketplace/components/MarketplacePage';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-slate-900">
          AnonGift
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-600">
          The most secure way to trade gift cards anonymously. No emails, no identities, just code.
        </p>
      </header>
      
      <MarketplacePage />
    </main>
  );
}
