import { apiClient } from '@/shared/apis/apiClient';

import type {
  AnswerSaveRequest,
  AnswerSaveResponse,
  DiagnosisModeRequest,
  DiagnosisModeResponse,
  CurrentSurveyResponse,
  QuestionCode,
  Survey,
  SurveyCompletionResponse,
} from '@/features/survey/model/surveyAnswer';
import type { ApiResponse } from '@/shared/types/api';

const SURVEY_BASE_PATH = '/surveys';

const surveyApi = {
  create: () =>
    apiClient.post<ApiResponse<Survey>>(SURVEY_BASE_PATH).then((response) => response.data.data),

  current: () =>
    apiClient
      .get<ApiResponse<CurrentSurveyResponse>>(`${SURVEY_BASE_PATH}/current`)
      .then((response) => response.data.data),

  saveAnswer: (surveyId: number, questionCode: QuestionCode, body: AnswerSaveRequest) =>
    apiClient
      .put<ApiResponse<AnswerSaveResponse>>(
        `${SURVEY_BASE_PATH}/${surveyId}/answers/${questionCode}`,
        body,
      )
      .then((response) => response.data.data),

  updateDiagnosisMode: (surveyId: number, body: DiagnosisModeRequest) =>
    apiClient
      .patch<ApiResponse<DiagnosisModeResponse>>(
        `${SURVEY_BASE_PATH}/${surveyId}/diagnosis-mode`,
        body,
      )
      .then((response) => response.data.data),

  complete: (surveyId: number) =>
    apiClient
      .post<ApiResponse<SurveyCompletionResponse>>(`${SURVEY_BASE_PATH}/${surveyId}/completion`)
      .then((response) => response.data.data),
};

export { surveyApi };
