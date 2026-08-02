import type { ComponentProps } from 'react';

import { CandidateCard } from '@/features/recommendation/ui/CandidateCard';
import { cn } from '@/shared/utils/cn';

import type { RecommendationProduct } from '@/features/recommendation/model/recommendation';

interface RecommendationCandidatesProps extends ComponentProps<'div'> {
  candidates: RecommendationProduct[];
  onReplaceProduct: (productId: string) => void;
}

function RecommendationCandidates({
  className,
  candidates,
  onReplaceProduct,
  ...props
}: RecommendationCandidatesProps) {
  return (
    <div className={cn('flex flex-col gap-2 px-4 pb-4', className)} {...props}>
      {candidates.map((candidate) => (
        <CandidateCard
          key={candidate.id}
          product={candidate}
          onReplace={() => onReplaceProduct(candidate.id)}
        />
      ))}
    </div>
  );
}

export { RecommendationCandidates, type RecommendationCandidatesProps };
