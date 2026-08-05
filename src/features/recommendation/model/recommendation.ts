type RecommendationStatus = 'GENERATED' | 'INVALIDATED';
type RecommendationRole = 'TEXTURE' | 'INTENSIVE' | 'MOISTURE';
type RecommendationCategory =
  | 'TONER'
  | 'SKIN'
  | 'SERUM'
  | 'AMPOULE'
  | 'ESSENCE'
  | 'GEL_CREAM'
  | 'MOISTURE_CREAM'
  | 'NUTRIENT_DEEP_CREAM';

interface IngredientInfo {
  ingredientId: number;
  name: string;
  cautionDescription?: string;
}

interface RecommendationCandidateResponse {
  candidateId: number;
  productId: number;
  brandName: string;
  productName: string;
  category: RecommendationCategory;
  imageUrl: string;
  purchaseUrl: string;
  price: number;
  candidateRank: number;
  topIngredients: IngredientInfo[];
}

interface RecommendationStepResponse {
  stepId: number;
  step: number;
  role: RecommendationRole;
  selected: RecommendationCandidateResponse;
  others: RecommendationCandidateResponse[];
}

interface RecommendationResponse {
  id: number;
  status: RecommendationStatus;
  steps: RecommendationStepResponse[];
  createdAt: string;
}

interface RecommendationProduct {
  id: number;
  brand: string;
  name: string;
  imageUrl: string;
  purchaseUrl: string;
  price: number;
  ingredients: IngredientInfo[];
  tags: string[];
  notices: string[];
}

interface RecommendationStep {
  id: number;
  purpose: string;
  category: string;
  product: RecommendationProduct;
  candidates: RecommendationProduct[];
}

interface Recommendation {
  id: number;
  status: RecommendationStatus;
  steps: RecommendationStep[];
  createdAt: string;
}

interface SelectRecommendationCandidateVariables {
  recommendationId: number;
  step: number;
  productId: number;
}

interface ShareCreateResponse {
  shareToken: string;
}

export type {
  IngredientInfo,
  Recommendation,
  RecommendationCandidateResponse,
  RecommendationCategory,
  RecommendationProduct,
  RecommendationResponse,
  RecommendationRole,
  RecommendationStatus,
  RecommendationStep,
  RecommendationStepResponse,
  SelectRecommendationCandidateVariables,
  ShareCreateResponse,
};
