import type { ComponentProps } from 'react';
import { useNavigate } from 'react-router';

import { IngredientTags } from '@/features/recommendation/ui/IngredientTags';
import { RecommendationCandidates } from '@/features/recommendation/ui/RecommendationCandidates';
import { RecommendationEasyView } from '@/features/recommendation/ui/RecommendationEasyView';
import { RecommendedProductSummary } from '@/features/recommendation/ui/RecommendedProductSummary';
import { ChevronIcon } from '@/shared/assets/icons';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';

import type { RecommendationStep } from '@/features/recommendation/model/recommendation';

interface RecommendationStepCardProps
  extends Omit<ComponentProps<'article'>, 'children' | 'id'>, RecommendationStep {
  onReplaceProduct: (candidateId: string) => void;
}

function RecommendationStepCard({
  className,
  id,
  purpose,
  category,
  product,
  candidates,
  onReplaceProduct,
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

        <RecommendedProductSummary stepId={id} product={product} />

        <details className="group/details">
          <summary className="typo-caption1 text-text-secondary flex list-none items-center gap-1 py-1 [&::-webkit-details-marker]:hidden">
            <ChevronIcon
              aria-hidden="true"
              className="size-3 transition-transform group-open/details:rotate-180"
            />
            <span className="group-open/details:hidden">자세히 보기</span>
            <span className="hidden group-open/details:inline">쉽게 보기</span>
          </summary>
          <RecommendationEasyView product={product} />
        </details>

        <IngredientTags tags={product.tags} />

        <Button
          type="button"
          className="w-full"
          onClick={() => navigate(`/recommendation/product/${encodeURIComponent(product.id)}`)}
        >
          자세히 보기
        </Button>
      </div>

      <details className="group/candidates border-border-subtle border-t">
        <summary className="typo-caption1 text-text-secondary flex list-none items-center justify-between px-4 py-4 [&::-webkit-details-marker]:hidden">
          다른 후보 보기
          <ChevronIcon
            aria-hidden="true"
            className="size-3 transition-transform group-open/candidates:rotate-180"
          />
        </summary>
        <RecommendationCandidates candidates={candidates} onReplaceProduct={onReplaceProduct} />
      </details>
    </article>
  );
}

export { RecommendationStepCard, type RecommendationStepCardProps };
