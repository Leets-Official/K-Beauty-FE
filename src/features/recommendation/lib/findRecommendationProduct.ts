import type { RecommendationStep } from '@/features/recommendation/model/recommendation';

function findRecommendationProduct(steps: RecommendationStep[], productId: number) {
  for (const step of steps) {
    const product = [step.product, ...step.candidates].find(({ id }) => id === productId);

    if (product) {
      return { product, stepId: step.id };
    }
  }
}

export { findRecommendationProduct };
