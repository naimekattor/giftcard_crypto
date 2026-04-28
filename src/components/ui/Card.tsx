/**
 * Card Component
 * Reusable card container for content
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-zinc-900 rounded-xl border border-white/10',
      elevated: 'bg-zinc-900 rounded-xl border border-white/10 shadow-xl shadow-black/50 transition-all hover:border-white/20',
      outlined: 'bg-transparent rounded-xl border-2 border-zinc-800',
    };

    return (
      <div
        ref={ref}
        className={cn(variants[variant], 'p-4', className)}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mb-4 pb-4 border-b border-white/10', className)} {...props} />
);

export const CardBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('', className)} {...props} />
);

export const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-4 pt-4 border-t border-white/10', className)} {...props} />
);
