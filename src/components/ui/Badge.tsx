/**
 * Badge Component
 * Display status and labels
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'default';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      success:
        'bg-green-100 text-green-800 border border-green-300',
      warning:
        'bg-yellow-100 text-yellow-800 border border-yellow-300',
      error: 'bg-red-100 text-red-800 border border-red-300',
      info: 'bg-blue-100 text-blue-800 border border-blue-300',
      default: 'bg-gray-100 text-gray-800 border border-gray-300',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
