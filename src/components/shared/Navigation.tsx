'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/features/auth/contexts/AuthContext';
import { useLogout } from '@/features/auth/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { Menu, X, Wallet } from 'lucide-react';

export const Navigation: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
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

  // Helper to style active links using Brand Blue
  const getLinkStyles = (path: string) => {
    const isActive = pathname === path;
    return `text-sm font-bold transition-colors ${
      isActive ? 'text-brand' : 'text-slate-600 hover:text-brand'
    }`;
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center transition-opacity hover:opacity-90">
              <Image src="/logo.png" alt="GiftCard Market" width={140} height={40} priority />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={getLinkStyles('/')}>
              Home
            </Link>
            <Link href="/marketplace" className={getLinkStyles('/marketplace')}>
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
                  className={getLinkStyles('/dashboard')}
                >
                  Dashboard
                </Link>
                
                {/* Wallet Link with subtle Success color hint */}
                <Link
                  href="/wallet"
                  className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-brand transition-colors"
                >
                  <Wallet className="w-4 h-4 text-status-completed" />
                  Wallet
                </Link>

                <div className="h-6 w-[1px] bg-slate-200 mx-2" />

                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-200 text-slate-600 hover:bg-slate-50 font-bold"
                  onClick={handleLogout}
                  isLoading={isPending}
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button variant="outline" size="sm" className="border-slate-200 text-slate-700 font-bold">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  {/* Sign Up is a conversion action - Using Primary Blue per brand rules */}
                  <Button variant="outline" size="sm" className="shadow-lg shadow-brand/20 font-bold">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:text-brand transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6 space-y-1 animate-in slide-in-from-top-2 duration-200">
            <Link href="/" className="block px-3 py-4 text-base font-bold text-slate-700 border-b border-slate-50">
              Home
            </Link>
            <Link href="/marketplace" className="block px-3 py-4 text-base font-bold text-slate-700 border-b border-slate-50">
              Marketplace
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href="/wallet"
                  className="block px-3 py-4 text-base font-bold text-slate-700 border-b border-slate-50"
                >
                  Wallet
                </Link>
                <div className="pt-4 px-3">
                  <Button
                    variant="outline"
                    className="w-full border-slate-200 text-slate-700"
                    onClick={handleLogout}
                    isLoading={isPending}
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="pt-4 px-3 space-y-3">
                <Link href="/login" className="block">
                  <Button variant="outline" className="w-full border-slate-200 text-slate-700">
                    Login
                  </Button>
                </Link>
                <Link href="/signup" className="block">
                  <Button variant="primary" className="w-full shadow-lg shadow-brand/20">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};