import { apiClient } from '@/shared/apis/apiClient';
import type { ApiResponse } from '@/shared/types/api';

import type { CreateSurveyResponse } from './survey';

const SURVEY_BASE_PATH = '/surveys';

const surveyApi = {
  create: () => apiClient.post<ApiResponse<CreateSurveyResponse>>(SURVEY_BASE_PATH),
};

export { surveyApi };
