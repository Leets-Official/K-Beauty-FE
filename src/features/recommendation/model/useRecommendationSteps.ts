import { useState } from 'react';

import { swapRecommendationProduct } from '@/features/recommendation/lib/swapRecommendationProduct';

import type { RecommendationStep } from '@/features/recommendation/model/recommendation';

function useRecommendationSteps(initialSteps: RecommendationStep[]) {
  const [steps, setSteps] = useState(initialSteps);

  function replaceProduct(stepId: number, candidateId: string) {
    setSteps((currentSteps) =>
      currentSteps.map((step) =>
        step.id === stepId ? swapRecommendationProduct(step, candidateId) : step,
      ),
    );
  }

  return { steps, replaceProduct };
}

export { useRecommendationSteps };
