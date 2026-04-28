'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/features/auth/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { Lock } from 'lucide-react';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Buy & Sell Gift Cards
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Anonymously
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            A secure, decentralized marketplace for gift card trading without
            exposing personal information. Trade with confidence using
            cryptocurrency.
          </p>

          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="/marketplace">
                <Button size="lg" variant="outline">
                  Browse Marketplace
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Card variant="elevated">
            <CardBody>
              <div className="text-4xl mb-4">
                <Lock className="inline-block w-8 h-8 text-amber-500"/>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Complete Anonymity
              </h3>
              <p className="text-gray-600">
                No email, no phone number, no personal data. Just generate a
                username and start trading.
              </p>
            </CardBody>
          </Card>

          {/* Feature 2 */}
          <Card variant="elevated">
            <CardBody>
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Crypto Payments
              </h3>
              <p className="text-gray-600">
                Pay with Bitcoin, Ethereum, USDT, USDC, or Solana. Fast,
                secure, and borderless.
              </p>
            </CardBody>
          </Card>

          {/* Feature 3 */}
          <Card variant="elevated">
            <CardBody>
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Verified Cards
              </h3>
              <p className="text-gray-600">
                All gift cards are verified by our team before being listed,
                ensuring authenticity and balance.
              </p>
            </CardBody>
          </Card>

          {/* Feature 4 */}
          <Card variant="elevated">
            <CardBody>
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Great Deals
              </h3>
              <p className="text-gray-600">
                Buy gift cards at discounts from 5% to 30% below face value.
                Get more for your money.
              </p>
            </CardBody>
          </Card>

          {/* Feature 5 */}
          <Card variant="elevated">
            <CardBody>
              <div className="text-4xl mb-4">🏪</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Multiple Retailers
              </h3>
              <p className="text-gray-600">
                Amazon, Apple, Google Play, Netflix, Steam, and 30+ other
                retailers. Everything in one place.
              </p>
            </CardBody>
          </Card>

          {/* Feature 6 */}
          <Card variant="elevated">
            <CardBody>
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Earn Money
              </h3>
              <p className="text-gray-600">
                Sell your unused gift cards and earn crypto. Withdraw anytime
                with no fees.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white border-y border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Sign Up',
                description: 'Create an anonymous account in seconds',
              },
              {
                step: 2,
                title: 'Browse',
                description: 'Find gift cards at the prices you want',
              },
              {
                step: 3,
                title: 'Pay',
                description: 'Secure payment with cryptocurrency',
              },
              {
                step: 4,
                title: 'Redeem',
                description: 'Get your balance instantly',
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!isAuthenticated && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of users already trading gift cards on our platform
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Create Account Now
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-white mb-4">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/marketplace" className="hover:text-white">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="mailto:support@giftcard.market" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 GiftCard Market. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
