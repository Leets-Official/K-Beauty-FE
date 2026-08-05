import type { ComponentProps } from 'react';

import { ProductBottle, type BottleTone } from '@/shared/ui/ProductBottle';
import { cn } from '@/shared/utils/cn';

const PRODUCT_TONES: BottleTone[] = ['mint', 'lavender', 'apricot'];

interface ProductVisualProps extends ComponentProps<'div'> {
  stepId: number;
  name: string;
  imageUrl?: string;
}

function ProductVisual({ className, stepId, name, imageUrl, ...props }: ProductVisualProps) {
  const tone = PRODUCT_TONES[stepId - 1] ?? 'mint';
  const variant = stepId === 2 ? 'serum' : 'toner';

  return (
    <div
      className={cn(
        'bg-background-subtle relative flex h-[16.2rem] items-center justify-center overflow-hidden rounded-2xl',
        className,
      )}
      {...props}
    >
      <div className="bg-surface-default/60 absolute -top-8 -left-5 size-28 rounded-full" />
      <div className="bg-accent-petal/50 absolute -right-4 -bottom-10 size-32 rounded-full" />
      {imageUrl ? (
        <img src={imageUrl} alt="" className="relative h-full w-full object-cover" />
      ) : (
        <>
          <ProductBottle
            variant={variant}
            tone={tone}
            size={116}
            title={name}
            className="relative"
          />
          {stepId === 2 ? (
            <ProductBottle
              variant="serum"
              tone="mint"
              size={72}
              aria-hidden="true"
              className="relative -ml-6 translate-y-4"
            />
          ) : null}
        </>
      )}
    </div>
  );
}

export { ProductVisual, type ProductVisualProps };
