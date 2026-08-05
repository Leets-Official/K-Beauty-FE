import { apiClient } from '@/shared/apis/apiClient';
import type { ApiResponse } from '@/shared/types/api';

import type { RecommendationResponse, ShareCreateResponse } from './recommendation';

const SHARE_BASE_PATH = '/shares';

const shareApi = {
  create: () => apiClient.post<ApiResponse<ShareCreateResponse>>(SHARE_BASE_PATH),
  getByToken: (shareToken: string) =>
    apiClient.get<ApiResponse<RecommendationResponse>>(
      `${SHARE_BASE_PATH}/${encodeURIComponent(shareToken)}`,
    ),
};

export { shareApi };
