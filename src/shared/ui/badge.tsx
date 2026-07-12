import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border px-3 py-1 text-[11px] font-bold font-["Outfit"] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 whitespace-nowrap',
  {
    variants: {
      variant: {
        radiantPink: 'border-transparent bg-[#F77B6A] text-white',
        apricotGlow: 'border-transparent bg-[#F7C361] text-[#3D2B1F]',
        mintCalm: 'border-transparent bg-[#82D3D1]/25 text-[#3A8B88]',
        lavenderSoothe: 'border-transparent bg-[#E5D4EF] text-[#7B618C]',
        blush: 'border-transparent bg-[#F6EFEA] text-[#8A7B74]',
        outline: 'border-[#FDDFD9] bg-transparent text-[#9B8578]',
      },
    },
    defaultVariants: {
      variant: 'lavenderSoothe',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
