import assert from 'node:assert/strict';
import test from 'node:test';

import { mapRecommendationResponse } from './mapRecommendationResponse.ts';

test('추천 응답을 화면 모델로 변환한다', () => {
  const recommendation = mapRecommendationResponse({
    id: 1,
    status: 'GENERATED',
    createdAt: '2026-08-04T00:00:00Z',
    steps: [
      {
        stepId: 10,
        step: 1,
        role: 'TEXTURE',
        selected: {
          candidateId: 100,
          productId: 1000,
          brandName: '브랜드',
          productName: '토너',
          category: 'TONER',
          imageUrl: 'https://example.com/product.png',
          purchaseUrl: 'https://example.com/product',
          price: 20_000,
          candidateRank: 1,
          topIngredients: [
            { ingredientId: 1, name: '판테놀', cautionDescription: '패치 테스트 권장' },
          ],
        },
        others: [],
      },
    ],
  });

  assert.equal(recommendation.steps[0].purpose, '피부결 정돈');
  assert.equal(recommendation.steps[0].category, '스킨 · 토너');
  assert.deepEqual(recommendation.steps[0].product.tags, ['판테놀']);
  assert.deepEqual(recommendation.steps[0].product.notices, ['패치 테스트 권장']);
});
