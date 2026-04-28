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
        'bg-success-gradient text-white border-none',
      warning:
        'bg-amber-500/10 text-amber-500 border border-amber-500/20',
      error: 'bg-red-500/10 text-red-500 border border-red-500/20',
      info: 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20',
      default: 'bg-zinc-800 text-zinc-300 border border-zinc-700',
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
