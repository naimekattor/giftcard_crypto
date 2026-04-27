/**
 * Seller Dashboard
 * Manage gift card listings and sales
 */

'use client';

import React from 'react';
import { useAuth } from '@/features/auth/contexts/AuthContext';
import { useWallet } from '@/features/wallet/hooks/useWallet';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function SellerDashboard() {
  const { user } = useAuth();
  const { data: wallet, isLoading: walletLoading } = useWallet();

  if (!user) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
          <p className="text-gray-600 mt-1">
            User ID: {user.userId.slice(0, 8)}... • Role: {user.role}
          </p>
        </div>

        {/* Earnings Info */}
        {walletLoading ? (
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        ) : wallet ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card variant="elevated">
              <CardBody>
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Total Earnings
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  {formatCurrency(wallet.totalEarnings)}
                </p>
              </CardBody>
            </Card>

            <Card variant="elevated">
              <CardBody>
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Available Balance
                </h3>
                <p className="text-3xl font-bold text-blue-600">
                  {formatCurrency(wallet.balances.available)}
                </p>
              </CardBody>
            </Card>

            <Card variant="elevated">
              <CardBody>
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Pending Verification
                </h3>
                <p className="text-3xl font-bold text-yellow-600">
                  {formatCurrency(wallet.balances.temporary)}
                </p>
              </CardBody>
            </Card>
          </div>
        ) : null}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button fullWidth>List New Gift Card</Button>
          <Link href="/wallet">
            <Button variant="outline" fullWidth>
              Withdraw Earnings
            </Button>
          </Link>
          <Link href="/seller/listings">
            <Button variant="secondary" fullWidth>
              View My Listings
            </Button>
          </Link>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardBody>
              <h3 className="font-semibold text-gray-900 mb-3">How It Works</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                <li>List your gift card with denomination and asking price</li>
                <li>Wait for admin verification of card authenticity</li>
                <li>Your card appears in the marketplace when approved</li>
                <li>Earn money when buyers purchase your cards</li>
                <li>Withdraw your earnings anytime</li>
              </ol>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h3 className="font-semibold text-gray-900 mb-3">
                Platform Guidelines
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Only list authentic gift cards</li>
                <li>✓ Accurate balance information required</li>
                <li>✓ Professional seller behavior expected</li>
                <li>✗ No fraud or scams</li>
                <li>✗ No personal data sharing</li>
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
