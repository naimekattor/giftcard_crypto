/**
 * Admin Dashboard
 * Verification queue and platform management
 */

'use client';

import React from 'react';
import { useAuth } from '@/features/auth/contexts/AuthContext';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function AdminDashboard() {
  const { user } = useAuth();

  if (!user) {
    return <div>Redirecting...</div>;
  }

  // Mock data for demonstration
  const stats = {
    totalUsers: 1250,
    totalTransactions: 5643,
    totalVolume: 285750,
    pendingVerifications: 45,
    fraudReports: 3,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Platform Management &amp; Monitoring
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card variant="elevated">
            <CardBody>
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                Total Users
              </h3>
              <p className="text-2xl font-bold text-blue-600">
                {stats.totalUsers.toLocaleString()}
              </p>
            </CardBody>
          </Card>

          <Card variant="elevated">
            <CardBody>
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                Transactions
              </h3>
              <p className="text-2xl font-bold text-green-600">
                {stats.totalTransactions.toLocaleString()}
              </p>
            </CardBody>
          </Card>

          <Card variant="elevated">
            <CardBody>
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                Total Volume
              </h3>
              <p className="text-2xl font-bold text-purple-600">
                ${stats.totalVolume.toLocaleString()}
              </p>
            </CardBody>
          </Card>

          <Card variant="elevated">
            <CardBody>
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                Pending Verifications
              </h3>
              <p className="text-2xl font-bold text-yellow-600">
                {stats.pendingVerifications}
              </p>
            </CardBody>
          </Card>

          <Card variant="elevated">
            <CardBody>
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                Fraud Reports
              </h3>
              <p className="text-2xl font-bold text-red-600">
                {stats.fraudReports}
              </p>
            </CardBody>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Button fullWidth>Review Pending Verifications</Button>
          <Button variant="outline" fullWidth>
            View Fraud Reports
          </Button>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">
              Verification Queue
            </h2>
          </CardHeader>
          <CardBody>
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">
                {stats.pendingVerifications} gift cards pending verification
              </p>
              <Badge variant="warning">
                Action required
              </Badge>
              <div className="mt-6">
                <Button>View Queue</Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
