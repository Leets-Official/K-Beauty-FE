import type { ComponentProps } from 'react';

import { CandidateCard } from '@/features/recommendation/ui/CandidateCard';
import { cn } from '@/shared/utils/cn';

import type { RecommendationProduct } from '@/features/recommendation/model/recommendation';

interface RecommendationCandidatesProps extends ComponentProps<'div'> {
  candidates: RecommendationProduct[];
  onReplaceProduct: (productId: number) => void;
  isReplacing?: boolean;
}

function RecommendationCandidates({
  className,
  candidates,
  onReplaceProduct,
  isReplacing,
  ...props
}: RecommendationCandidatesProps) {
  return (
    <div className={cn('flex flex-col gap-2 px-4 pb-4', className)} {...props}>
      {candidates.map((candidate) => (
        <CandidateCard
          key={candidate.id}
          product={candidate}
          onReplace={() => onReplaceProduct(candidate.id)}
          isReplacing={isReplacing}
        />
      ))}
    </div>
  );
}

export { RecommendationCandidates, type RecommendationCandidatesProps };
