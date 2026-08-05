import type { ComponentProps } from 'react';

import type { RecommendationProduct } from '@/features/recommendation/model';
import { SwapIcon } from '@/shared/assets/icons';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';
import { formatPrice } from '@/shared/utils/format';

import { IngredientTags } from './IngredientTags';

interface CandidateCardProps extends ComponentProps<'article'> {
  product: RecommendationProduct;
  onReplace: () => void;
  isReplacing?: boolean;
}

function CandidateCard({
  className,
  product,
  onReplace,
  isReplacing,
  ...props
}: CandidateCardProps) {
  return (
    <article
      className={cn('border-border-subtle bg-surface-candidate rounded-2xl border p-3', className)}
      {...props}
    >
      <div className="mb-1 flex items-start justify-between gap-3">
        <div>
          <p className="typo-caption2 text-text-secondary">{product.brand}</p>
          <h4 className="typo-caption1 text-text-primary font-bold">{product.name}</h4>
        </div>
        <span className="typo-caption1 text-action-primary shrink-0">
          {formatPrice(product.price)}
        </span>
      </div>
      <IngredientTags tags={product.tags} variant="brown" />
      <Button
        type="button"
        variant="secondary"
        className="mt-3 h-10 w-full"
        disabled={isReplacing}
        onClick={onReplace}
      >
        <SwapIcon aria-hidden="true" />
        {isReplacing ? '교체하는 중...' : '이 제품으로 교체하기'}
      </Button>
    </article>
  );
}

export { CandidateCard, type CandidateCardProps };
