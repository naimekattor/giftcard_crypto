/**
 * Buyer Dashboard
 * View purchases, wallet, and transactions
 */

'use client';

import React from 'react';
import { useAuth } from '@/features/auth/contexts/AuthContext';
import { useWallet } from '@/features/wallet/hooks/useWallet';
import { useTransactionHistory } from '@/features/wallet/hooks/useWallet';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function BuyerDashboard() {
  const { user } = useAuth();
  const { data: wallet, isLoading: walletLoading } = useWallet();
  const { data: transactions, isLoading: transLoading } = useTransactionHistory(1, 10);

  if (!user) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <p className="text-muted-foreground mt-1">
            User ID: {user.userId.slice(0, 8)}... • Role: {user.role}
          </p>
        </div>

        {/* Wallet Info */}
        {walletLoading ? (
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        ) : wallet ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-success-gradient border-none text-white">
              <CardBody>
                <h3 className="text-sm font-medium opacity-80 mb-2">
                  Available Balance
                </h3>
                <p className="text-3xl font-bold">
                  {formatCurrency(wallet.balances.available)}
                </p>
              </CardBody>
            </Card>

            <Card variant="elevated">
              <CardBody>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Verified Balance
                </h3>
                <p className="text-3xl font-bold text-success-start">
                  {formatCurrency(wallet.balances.verified)}
                </p>
              </CardBody>
            </Card>

            <Card variant="elevated">
              <CardBody>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Pending Balance
                </h3>
                <p className="text-3xl font-bold text-brand-accent">
                  {formatCurrency(wallet.balances.temporary)}
                </p>
              </CardBody>
            </Card>
          </div>
        ) : null}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link href="/marketplace">
            <Button fullWidth variant="primary">Browse Gift Cards</Button>
          </Link>
          <Link href="/wallet">
            <Button variant="outline" fullWidth>
              View Wallet
            </Button>
          </Link>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">
              Recent Transactions
            </h2>
          </CardHeader>
          <CardBody>
            {transLoading ? (
              <div className="flex justify-center py-8">
                <Spinner />
              </div>
            ) : transactions && transactions.data.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Description
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.data.map((tx) => (
                      <tr
                        key={tx.id}
                        className="border-b border-white/10 hover:bg-white/5"
                      >
                        <td className="px-4 py-3 text-sm text-foreground">
                          {formatDate(tx.createdAt)}
                        </td>
                        <td className="px-4 py-3 text-sm text-foreground">
                          {tx.description}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-foreground">
                          {formatCurrency(tx.amount)}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <Badge
                            variant={
                              tx.type === 'credit' ? 'success' : 'error'
                            }
                          >
                            {tx.type}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No transactions yet
              </p>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
