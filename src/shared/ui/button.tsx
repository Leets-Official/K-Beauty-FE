import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-bold whitespace-nowrap transition-all outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none data-[disabled]:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 gap-2 h-12 px-6",
  {
    variants: {
      variant: {
        primary:
          'bg-button-gradient text-text-inverse active:transition-none active:bg-none active:bg-action-active disabled:bg-none disabled:bg-action-disabled disabled:text-text-muted data-[disabled]:bg-none data-[disabled]:bg-action-disabled data-[disabled]:text-text-muted',

        secondary:
          'border-border-action text-action-primary bg-transparent active:border-action-active active:text-action-active active:bg-background-subtle disabled:border-border-disabled disabled:text-text-muted disabled:bg-transparent data-[disabled]:border-border-disabled data-[disabled]:text-text-muted data-[disabled]:bg-transparent',

        ghost:
          'text-text-secondary bg-transparent active:text-action-active disabled:text-text-muted data-[disabled]:text-text-muted',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

function Button({
  className,
  variant = 'primary',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={(state) =>
        cn(
          buttonVariants({ variant }),
          typeof className === 'function' ? className(state) : className,
        )
      }
      {...props}
    />
  );
}

export { Button, buttonVariants };
