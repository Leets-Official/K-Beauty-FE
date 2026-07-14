import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-bold whitespace-nowrap transition-all outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none data-[disabled]:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 gap-2 h-12 px-6",
  {
    variants: {
      variant: {
        primary:
          'bg-button-gradient text-white active:transition-none active:bg-none active:bg-action-active disabled:bg-none disabled:bg-action-disabled-bg disabled:text-action-disabled-text data-[disabled]:bg-none data-[disabled]:bg-action-disabled-bg data-[disabled]:text-action-disabled-text',

        secondary:
          'border-brand text-brand bg-transparent active:border-action-active active:text-action-active active:bg-action-secondary-active-bg disabled:border-action-disabled-bg disabled:text-action-disabled-text disabled:bg-transparent data-[disabled]:border-action-disabled-bg data-[disabled]:text-action-disabled-text data-[disabled]:bg-transparent',

        ghost:
          'text-text-ghost bg-transparent active:text-action-active disabled:text-action-disabled-text data-[disabled]:text-action-disabled-text',
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
