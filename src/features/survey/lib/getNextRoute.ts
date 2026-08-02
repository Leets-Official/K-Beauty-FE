import type { Sensitivity } from '@/features/survey/model/sensitivity';
import { SURVEY_ROUTES, type SurveyRoute } from '@/features/survey/model/surveyRoutes';

export type SkinTypeChoice = 'recommend' | 'detail';

export function getConcernNextRoute(): SurveyRoute {
  return SURVEY_ROUTES.skinType;
}

// 피부 타입 화면: '바로 추천' → 로딩, '더 자세히 알아보기' → 예민 여부 질문
export function getSkinTypeNextRoute(choice: SkinTypeChoice): SurveyRoute {
  return choice === 'recommend' ? SURVEY_ROUTES.loading : SURVEY_ROUTES.sensitive;
}

// 예민 여부: 예 → 불편했던 제품 유형, 아니오 → 성분/리뷰 질문
export function getSensitiveNextRoute(sensitive: Sensitivity): SurveyRoute {
  return sensitive === 'SENSITIVE_YES' ? SURVEY_ROUTES.discomfort : SURVEY_ROUTES.research;
}

export function getDiscomfortNextRoute(): SurveyRoute {
  return SURVEY_ROUTES.research;
}

export function getResearchNextRoute(): SurveyRoute {
  return SURVEY_ROUTES.loading;
}
