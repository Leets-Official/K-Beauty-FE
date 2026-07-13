import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-bold whitespace-nowrap transition-all outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none data-[disabled]:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 gap-2 h-12 px-6",
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-r from-[#E0896F] to-[#E69A81] text-white active:transition-none active:bg-none active:bg-[#C86A51] disabled:bg-none disabled:bg-[#EBEAE8] disabled:text-[#C1BDB9] data-[disabled]:bg-none data-[disabled]:bg-[#EBEAE8] data-[disabled]:text-[#C1BDB9]',

        secondary:
          'border-[#E0896F] text-[#E0896F] bg-transparent active:border-[#C86A51] active:text-[#C86A51] active:bg-[#FCECE8] disabled:border-[#EBEAE8] disabled:text-[#C1BDB9] disabled:bg-transparent data-[disabled]:border-[#EBEAE8] data-[disabled]:text-[#C1BDB9] data-[disabled]:bg-transparent',

        ghost:
          'text-[#8A8782] bg-transparent active:text-[#C86A51] disabled:text-[#C1BDB9] data-[disabled]:text-[#C1BDB9]',
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
