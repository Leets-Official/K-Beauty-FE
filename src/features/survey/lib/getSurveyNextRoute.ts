import { SURVEY_ROUTES, type SurveyRoute } from '@/features/survey/model/surveyRoutes';

import type {
  DiagnosisMode,
  QuestionCode,
  SurveyNextStep,
} from '@/features/survey/model/surveyAnswer';

const ROUTE_BY_QUESTION_CODE: Record<QuestionCode, SurveyRoute> = {
  CONCERN: SURVEY_ROUTES.concern,
  SKIN_TYPE: SURVEY_ROUTES.skinType,
  SENSITIVITY: SURVEY_ROUTES.sensitive,
  CAUTION: SURVEY_ROUTES.discomfort,
  EXPLORATION_HABIT: SURVEY_ROUTES.research,
};

const ROUTE_BY_DIAGNOSIS_MODE: Record<DiagnosisMode, SurveyRoute> = {
  QUICK: SURVEY_ROUTES.loading,
  DETAILED: SURVEY_ROUTES.sensitive,
};

/**
 * 설문 분기의 기준은 서버 응답입니다. 답변을 저장하면 서버가 다음에 뭘 해야 하는지 알려주고,
 * 클라이언트는 그 값을 화면 경로로 옮기기만 합니다.
 *
 * 예외는 진단 모드입니다. '자세히 알아보기 / 바로 추천'은 답변이 아니라 사용자가 버튼으로 고르는
 * 값이고, 서버는 답변을 저장한 뒤에야 이 선택을 전달받으므로 응답보다 사용자의 선택이 우선입니다.
 */
export function getSurveyNextRoute(
  nextStep: SurveyNextStep,
  diagnosisMode?: DiagnosisMode,
): SurveyRoute {
  if (nextStep.nextAction === 'GO_TO_ONBOARDING') {
    return SURVEY_ROUTES.onboarding;
  }

  if (diagnosisMode) {
    return ROUTE_BY_DIAGNOSIS_MODE[diagnosisMode];
  }

  switch (nextStep.nextAction) {
    case 'ANSWER_QUESTION':
      return nextStep.nextQuestionCode
        ? ROUTE_BY_QUESTION_CODE[nextStep.nextQuestionCode]
        : SURVEY_ROUTES.concern;

    // 모드를 고르지 않고 도달한 경우라 상세 진단을 기본값으로 둡니다.
    case 'SELECT_DIAGNOSIS_MODE':
      return SURVEY_ROUTES.sensitive;

    case 'READY_TO_COMPLETE':
      return SURVEY_ROUTES.loading;
  }
}
