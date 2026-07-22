import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border px-3 py-1 text-[11px] font-bold font-["Outfit"] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 whitespace-nowrap',
  {
    variants: {
      variant: {
        pink: 'border-transparent bg-action-primary text-text-inverse',
        yellow: 'border-transparent bg-accent-apricot text-text-primary',
        mint: 'border-transparent bg-badge-mint-soft text-text-mint',
        lavender: 'border-transparent bg-accent-lavender text-text-lavender',
        brown: 'border-transparent bg-badge-neutral text-text-secondary',
        outline: 'border-border-action-soft bg-transparent text-text-secondary',
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
