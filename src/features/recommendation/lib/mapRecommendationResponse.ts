import type {
  Recommendation,
  RecommendationCandidateResponse,
  RecommendationCategory,
  RecommendationProduct,
  RecommendationResponse,
  RecommendationRole,
} from '@/features/recommendation/model';

const ROLE_LABELS: Record<RecommendationRole, string> = {
  TEXTURE: '피부결 정돈',
  INTENSIVE: '집중 케어',
  MOISTURE: '보습 마무리',
};

const CATEGORY_LABELS: Record<RecommendationCategory, string> = {
  TONER: '스킨 · 토너',
  SKIN: '스킨 · 토너',
  SERUM: '에센스 · 세럼',
  AMPOULE: '에센스 · 세럼',
  ESSENCE: '에센스 · 세럼',
  GEL_CREAM: '크림',
  MOISTURE_CREAM: '크림',
  NUTRIENT_DEEP_CREAM: '크림',
};

function mapProduct(product: RecommendationCandidateResponse): RecommendationProduct {
  return {
    id: product.productId,
    brand: product.brandName,
    name: product.productName,
    imageUrl: product.imageUrl,
    purchaseUrl: product.purchaseUrl,
    price: product.price,
    ingredients: product.topIngredients,
    tags: product.topIngredients.map(({ name }) => name),
    notices: product.topIngredients.flatMap(({ cautionDescription }) =>
      cautionDescription ? [cautionDescription] : [],
    ),
  };
}

function mapRecommendationResponse(response: RecommendationResponse): Recommendation {
  return {
    id: response.id,
    status: response.status,
    createdAt: response.createdAt,
    steps: response.steps.map(({ step, role, selected, others }) => ({
      id: step,
      purpose: ROLE_LABELS[role],
      category: CATEGORY_LABELS[selected.category],
      product: mapProduct(selected),
      candidates: others.map(mapProduct),
    })),
  };
}

export { mapRecommendationResponse };
