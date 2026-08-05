import type { ComponentProps } from 'react';

import { formatRecommendationReason } from '@/features/recommendation/lib';
import type { RecommendationProduct } from '@/features/recommendation/model';
import { SparkleIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';
import { formatPrice } from '@/shared/utils/format';

import type { Concern } from '@/features/survey/model/concern';

import { ProductVisual } from './ProductVisual';

interface RecommendedProductSummaryProps extends ComponentProps<'div'> {
  stepId: number;
  product: RecommendationProduct;
  concern: Concern | null;
}

function RecommendedProductSummary({
  className,
  stepId,
  product,
  concern,
  ...props
}: RecommendedProductSummaryProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)} {...props}>
      <ProductVisual stepId={stepId} name={product.name} imageUrl={product.imageUrl} />

      <div>
        <p className="typo-caption2 text-text-secondary">{product.brand}</p>
        <h3 className="typo-body1 text-text-primary font-bold">{product.name}</h3>
        <p className="typo-title2 text-action-primary mt-1">{formatPrice(product.price)}</p>
      </div>

      <div className="bg-background-subtle rounded-2xl p-3">
        <p className="typo-caption1 text-action-primary mb-1 flex items-center gap-1">
          <SparkleIcon aria-hidden="true" className="size-3" />
          나에게 추천한 이유
        </p>
        <p className="typo-caption1 text-text-primary">
          {formatRecommendationReason(concern, product.tags)}
        </p>
      </div>
    </div>
  );
}

export { RecommendedProductSummary, type RecommendedProductSummaryProps };
