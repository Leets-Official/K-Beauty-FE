export const QUESTION_CODE = {
  concern: 'CONCERN',
  skinType: 'SKIN_TYPE',
  sensitive: 'SENSITIVITY',
  discomfort: 'CAUTION',
  research: 'EXPLORATION_HABIT',
} as const;

export type QuestionCode = (typeof QUESTION_CODE)[keyof typeof QUESTION_CODE];

export type SurveyNextAction =
  'ANSWER_QUESTION' | 'SELECT_DIAGNOSIS_MODE' | 'READY_TO_COMPLETE' | 'GO_TO_ONBOARDING';

export type SensitivityStatus = 'UNASSESSED' | 'LOW' | 'MEDIUM' | 'HIGH';

export type RecommendationImpact = 'RECALCULATE_REQUIRED' | 'NONE';

export type SurveyStatus = 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';

export type DiagnosisMode = 'QUICK' | 'DETAILED';

/** 단일 선택 질문도 배열 하나로 보냅니다. */
export interface AnswerSaveRequest {
  optionCodes: string[];
}

export interface AnswerSaveResponse {
  surveyResponseId: number;
  questionCode: QuestionCode;
  savedOptionCodes: string[];
  /** 앞 답변이 바뀌어 서버에서 무효화된 뒤쪽 질문들. 로컬 답변도 같이 비워야 합니다. */
  clearedQuestionCodes: QuestionCode[];
  derivedSensitivityStatus: SensitivityStatus | null;
  nextAction: SurveyNextAction;
  nextQuestionCode: QuestionCode | null;
  recommendationImpact: RecommendationImpact;
}

/** 진단 모드는 사용자가 피부 타입 화면에서 고르는 값이라, 답변 저장과 별개의 API로 서버에 알립니다. */
export interface DiagnosisModeRequest {
  diagnosisMode: DiagnosisMode;
}

export interface DiagnosisModeResponse {
  surveyId: number;
  diagnosisMode: DiagnosisMode;
  sensitivityStatus: SensitivityStatus;
  nextAction: SurveyNextAction;
  nextQuestionCode: QuestionCode | null;
  updatedAt: string;
}

/**
 * 답변 저장과 진단 모드 저장은 응답 형태가 다르지만, 다음 화면을 정하는 데 필요한 값은 같습니다.
 * 두 응답을 이 형태로 맞춘 뒤 라우팅에 넘깁니다.
 */
export interface SurveyNextStep {
  nextAction: SurveyNextAction;
  nextQuestionCode: QuestionCode | null;
}

export interface SurveyCompletionResponse {
  surveyResponseId: number;
  status: SurveyStatus;
  diagnosisMode: DiagnosisMode | null;
  sensitivityStatus: SensitivityStatus;
  typeNeutralMode: boolean;
  completedAt: string;
}

export interface Survey {
  id: number;
  sessionId: number;
  diagnosisMode: DiagnosisMode | null;
  status: SurveyStatus;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}
