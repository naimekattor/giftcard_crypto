/**
 * Signup Page
 * Create new anonymous account
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupFormData } from '@/lib/validations/schemas';
import { useSignup } from '@/features/auth/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import Link from 'next/link';
import type { UserRole } from '@/types';

export default function SignupPage() {
  const router = useRouter();
  const { mutate: signup, isPending } = useSignup();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: 'buyer',
    },
  });

  const onSubmit = (data: SignupFormData) => {
    setError(null);
    signup(
      {
        password: data.password,
        role: data.role,
      },
      {
        onSuccess: () => {
          router.push(
            data.role === 'seller'
              ? '/seller/dashboard'
              : '/buyer/dashboard'
          );
        },
        onError: (err: any) => {
          setError(err.message || 'Signup failed');
        },
      }
    );
  };

  const roleOptions = [
    { value: 'buyer', label: 'I want to buy gift cards' },
    { value: 'seller', label: 'I want to sell gift cards' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <Card variant="elevated" className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-3xl font-bold text-gray-900">Join Us</h1>
          <p className="text-gray-600 mt-2">Create your anonymous account</p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What's your role?
              </label>
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  >
                    {roleOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            <Input
              label="Password"
              type="password"
              placeholder="Create a strong password"
              {...register('password')}
              error={errors.password?.message}
              helperText="Min. 8 characters with uppercase, lowercase & numbers"
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('agreeToTerms')}
                className="h-4 w-4 rounded border-gray-300"
              />
              <label className="ml-2 text-sm text-gray-700">
                I agree to the{' '}
                <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                  Terms & Conditions
                </Link>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-sm text-red-600">{errors.agreeToTerms.message}</p>
            )}

            <Button
              type="submit"
              fullWidth
              isLoading={isPending}
              className="mt-6"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Login
              </Link>
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              🔒 Your account is completely anonymous - No email or personal info required
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
