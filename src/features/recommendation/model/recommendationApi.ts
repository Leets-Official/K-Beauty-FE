import { apiClient } from '@/shared/apis/apiClient';
import type { ApiResponse } from '@/shared/types/api';

import type {
  RecommendationResponse,
  SelectRecommendationCandidateVariables,
} from '@/features/recommendation/model/recommendation';

const RECOMMENDATION_BASE_PATH = '/recommendations';

const recommendationApi = {
  generate: () => apiClient.post<ApiResponse<RecommendationResponse>>(RECOMMENDATION_BASE_PATH),
  getCurrent: () =>
    apiClient.get<ApiResponse<RecommendationResponse>>(`${RECOMMENDATION_BASE_PATH}/current`),
  selectCandidate: ({
    recommendationId,
    step,
    productId,
  }: SelectRecommendationCandidateVariables) =>
    apiClient.patch<ApiResponse<RecommendationResponse>>(
      `${RECOMMENDATION_BASE_PATH}/${recommendationId}/steps/${step}/select`,
      { productId },
    ),
};

export { recommendationApi };
