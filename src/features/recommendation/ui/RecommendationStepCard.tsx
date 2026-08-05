import type { ComponentProps } from 'react';
import { useNavigate } from 'react-router';

import type { RecommendationStep } from '@/features/recommendation/model';
import { ChevronIcon } from '@/shared/assets/icons';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';

import type { Concern } from '@/features/survey/model/concern';

import { IngredientTags } from './IngredientTags';
import { RecommendationCandidates } from './RecommendationCandidates';
import { RecommendedProductSummary } from './RecommendedProductSummary';

interface RecommendationStepCardProps
  extends Omit<ComponentProps<'article'>, 'children' | 'id'>, RecommendationStep {
  concern: Concern | null;
  shareToken?: string | null;
  onReplaceProduct?: (productId: number) => void;
  isReplacing?: boolean;
  showCandidates?: boolean;
}

function RecommendationStepCard({
  className,
  id,
  purpose,
  category,
  product,
  candidates,
  concern,
  shareToken,
  onReplaceProduct,
  isReplacing,
  showCandidates = true,
  ...props
}: RecommendationStepCardProps) {
  const navigate = useNavigate();

  return (
    <article
      data-slot="recommendation-step-card"
      className={cn(
        'border-border-subtle bg-surface-default overflow-hidden rounded-[28px] border',
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center gap-2">
          <Badge variant="brown">
            {id}단계 · {purpose}
          </Badge>
          <p className="typo-caption2 text-text-muted">{category}</p>
        </div>

        <RecommendedProductSummary stepId={id} product={product} concern={concern} />

        <IngredientTags tags={product.tags} />

        <Button
          type="button"
          className="w-full"
          onClick={() =>
            navigate(
              `/recommendation/product/${encodeURIComponent(product.id)}${
                shareToken ? `?share=${encodeURIComponent(shareToken)}` : ''
              }`,
            )
          }
        >
          자세히 보기
        </Button>
      </div>

      {showCandidates && onReplaceProduct && candidates.length > 0 ? (
        <details className="group/candidates border-border-subtle border-t">
          <summary className="typo-caption1 text-text-secondary flex list-none items-center justify-between px-4 py-4 [&::-webkit-details-marker]:hidden">
            다른 후보 보기
            <ChevronIcon
              aria-hidden="true"
              className="size-3 transition-transform group-open/candidates:rotate-180"
            />
          </summary>
          <RecommendationCandidates
            candidates={candidates}
            onReplaceProduct={onReplaceProduct}
            isReplacing={isReplacing}
          />
        </details>
      ) : null}
    </article>
  );
}

export { RecommendationStepCard, type RecommendationStepCardProps };
