'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/contexts/AuthContext';
import { useLogout } from '@/features/auth/hooks/useAuth';
import { Button } from '@/components/ui/Button';

export const Navigation: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { mutate: logout, isPending } = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        router.push('/');
      },
    });
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="font-bold text-2xl text-blue-600">
              🎁 GiftCard Market
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Home
            </Link>
            <Link
              href="/marketplace"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Marketplace
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href={
                    user?.role === 'seller'
                      ? '/seller/dashboard'
                      : user?.role === 'admin'
                      ? '/admin/dashboard'
                      : '/buyer/dashboard'
                  }
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Dashboard
                </Link>
                <Link
                  href="/wallet"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Wallet
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleLogout}
                  isLoading={isPending}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/"
              className="block text-gray-700 hover:text-blue-600 py-2"
            >
              Home
            </Link>
            <Link
              href="/marketplace"
              className="block text-gray-700 hover:text-blue-600 py-2"
            >
              Marketplace
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href={
                    user?.role === 'seller'
                      ? '/seller/dashboard'
                      : user?.role === 'admin'
                      ? '/admin/dashboard'
                      : '/buyer/dashboard'
                  }
                  className="block text-gray-700 hover:text-blue-600 py-2"
                >
                  Dashboard
                </Link>
                <Link
                  href="/wallet"
                  className="block text-gray-700 hover:text-blue-600 py-2"
                >
                  Wallet
                </Link>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={handleLogout}
                  isLoading={isPending}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="block">
                  <Button variant="outline" fullWidth>
                    Login
                  </Button>
                </Link>
                <Link href="/signup" className="block">
                  <Button fullWidth>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
