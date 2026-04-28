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
    <nav className="bg-zinc-950/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="font-bold text-2xl text-brand-primary">
              🎁 GiftCard Market
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-zinc-300 hover:text-brand-primary transition"
            >
              Home
            </Link>
            <Link
              href="/marketplace"
              className="text-zinc-300 hover:text-brand-primary transition"
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
                  className="text-zinc-300 hover:text-brand-primary transition"
                >
                  Dashboard
                </Link>
                <Link
                  href="/wallet"
                  className="text-zinc-300 hover:text-brand-primary transition"
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
              className="text-zinc-300 hover:text-brand-primary"
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
              className="block text-zinc-300 hover:text-brand-primary py-2"
            >
              Home
            </Link>
            <Link
              href="/marketplace"
              className="block text-zinc-300 hover:text-brand-primary py-2"
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
                  className="block text-zinc-300 hover:text-brand-primary py-2"
                >
                  Dashboard
                </Link>
                <Link
                  href="/wallet"
                  className="block text-zinc-300 hover:text-brand-primary py-2"
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
