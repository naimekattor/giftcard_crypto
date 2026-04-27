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
      default: 'bg-white rounded-lg border border-gray-200',
      elevated: 'bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow',
      outlined: 'bg-transparent rounded-lg border-2 border-gray-300',
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
  <div className={cn('mb-4 pb-4 border-b border-gray-200', className)} {...props} />
);

export const CardBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('', className)} {...props} />
);

export const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-4 pt-4 border-t border-gray-200', className)} {...props} />
);
