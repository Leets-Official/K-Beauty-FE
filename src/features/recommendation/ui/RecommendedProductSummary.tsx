import type { ComponentProps } from 'react';

import { ProductVisual } from '@/features/recommendation/ui/ProductVisual';
import { Rating } from '@/features/recommendation/ui/Rating';
import { SparkleIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';
import { formatPrice } from '@/shared/utils/format';

import type { RecommendationProduct } from '@/features/recommendation/model/recommendation';

interface RecommendedProductSummaryProps extends ComponentProps<'div'> {
  stepId: number;
  product: RecommendationProduct;
}

function RecommendedProductSummary({
  className,
  stepId,
  product,
  ...props
}: RecommendedProductSummaryProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)} {...props}>
      <ProductVisual stepId={stepId} name={product.name} />

      <div>
        <p className="typo-caption2 text-text-secondary">{product.brand}</p>
        <h3 className="typo-body1 text-text-primary font-bold">{product.name}</h3>
        <Rating rating={product.rating} reviewCount={product.reviewCount} />
        <p className="typo-title2 text-action-primary mt-1">{formatPrice(product.price)}</p>
      </div>

      <div className="bg-background-subtle rounded-2xl p-3">
        <p className="typo-caption1 text-action-primary mb-1 flex items-center gap-1">
          <SparkleIcon aria-hidden="true" className="size-3" />
          나에게 추천한 이유
        </p>
        <p className="typo-caption1 text-text-primary">{product.reason}</p>
      </div>
    </div>
  );
}

export { RecommendedProductSummary, type RecommendedProductSummaryProps };
