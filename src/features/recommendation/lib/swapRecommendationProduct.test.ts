import assert from 'node:assert/strict';
import test from 'node:test';

import { RECOMMENDATION_STEPS } from '../model/recommendation.ts';
import { swapRecommendationProduct } from './swapRecommendationProduct.ts';

test('추천 상품과 선택한 후보 상품을 맞바꾼다', () => {
  const step = RECOMMENDATION_STEPS[0];
  const candidate = step.candidates[0];
  const result = swapRecommendationProduct(step, candidate.id);

  assert.equal(result.product, candidate);
  assert.equal(result.candidates[0], step.product);
});
