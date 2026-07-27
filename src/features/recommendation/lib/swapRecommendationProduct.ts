import type { RecommendationStep } from '@/features/recommendation/model/recommendation';

function swapRecommendationProduct(
  step: RecommendationStep,
  candidateId: string,
): RecommendationStep {
  const candidateIndex = step.candidates.findIndex((candidate) => candidate.id === candidateId);

  if (candidateIndex === -1) {
    return step;
  }

  const candidates = [...step.candidates];
  const product = candidates[candidateIndex];
  candidates[candidateIndex] = step.product;

  return { ...step, product, candidates };
}

export { swapRecommendationProduct };
