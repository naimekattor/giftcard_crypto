import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Navigation } from '@/src/components/shared/Navigation';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'AnonGift - Anonymous Gift Card Marketplace',
  description: 'Buy and sell gift cards securely and anonymously.',
};

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
