import type { RecommendationStep } from '@/features/recommendation/model';

function formatRecommendationText(steps: RecommendationStep[]) {
  return steps
    .map(
      ({ id, purpose, product }) =>
        `${id}단계\n제품명: ${product.name}\n단계 역할: ${purpose}\n주요 성분: ${product.tags.join(', ')}`,
    )
    .join('\n\n');
}

export { formatRecommendationText };
