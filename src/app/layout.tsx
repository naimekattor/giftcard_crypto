import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'GiftCard Market - Buy & Sell Gift Cards Anonymously',
  description:
    'Secure peer-to-peer gift card marketplace with cryptocurrency payments. Trade anonymously without exposing personal information.',
  keywords: [
    'gift card',
    'marketplace',
    'anonymous',
    'crypto',
    'bitcoin',
    'ethereum',
  ],
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
