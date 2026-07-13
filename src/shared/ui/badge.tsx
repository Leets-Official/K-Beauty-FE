import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border px-3 py-1 text-[11px] font-bold font-["Outfit"] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 whitespace-nowrap',
  {
    variants: {
      variant: {
        pink: 'border-transparent bg-primary-pink text-white',
        yellow: 'border-transparent bg-primary-yellow text-primary-yellow-badge-text',
        mint: 'border-transparent bg-primary-mint-badge text-primary-mint-badge-text',
        lavender: 'border-transparent bg-primary-lavender text-primary-lavender-badge-text',
        brown: 'border-transparent bg-primary-brown-badge text-primary-brown-badge-text',
        outline: 'border-primary-outline bg-transparent text-primary-outline-badge-text',
      },
    },
    defaultVariants: {
      variant: 'lavender',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
