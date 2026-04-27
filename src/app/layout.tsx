import type { Metadata } from 'next';
import './globals.css';
import { providers } from './providers';

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
    <html lang="en">
      <body className="bg-white">
        {providers}
        {children}
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-[#050505] text-[#e0e0e0] antialiased overflow-hidden">
        <Providers>
          <div className="flex h-screen overflow-hidden">
            <Navigation />
            <main className="flex-1 overflow-y-auto bg-[#050505]">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
