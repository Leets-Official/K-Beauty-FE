import { create } from 'zustand';

import type { Concern } from '@/features/survey/model/concern';
import type { ProductDiscomfortType } from '@/features/survey/model/productDiscomfort';
import type { ResearchPreference } from '@/features/survey/model/researchPreference';
import type { Sensitivity } from '@/features/survey/model/sensitivity';
import type { SkinType } from '@/features/survey/model/skinType';
import type { QuestionCode } from '@/features/survey/model/surveyAnswer';

interface SurveyAnswers {
  concern: Concern | null;
  skinType: SkinType | null;
  sensitive: Sensitivity | null;
  discomfortTypes: ProductDiscomfortType[];
  research: ResearchPreference | null;
}

interface SurveyState extends SurveyAnswers {
  surveyId: number | null;
  savedQuestionCodes: QuestionCode[];
  setSurveyId: (surveyId: number) => void;
  setConcern: (concern: Concern) => void;
  setSkinType: (skinType: SkinType) => void;
  setSensitive: (sensitive: Sensitivity) => void;
  setDiscomfortTypes: (discomfortTypes: ProductDiscomfortType[]) => void;
  setResearch: (research: ResearchPreference) => void;
  markAnswerSaved: (questionCode: QuestionCode) => void;
  isAnswerSaved: (questionCode: QuestionCode) => boolean;
  clearAnswers: (questionCodes: QuestionCode[]) => void;
  reset: () => void;
}

const initialAnswers = {
  concern: null,
  skinType: null,
  sensitive: null,
  discomfortTypes: [],
  research: null,
} satisfies SurveyAnswers;

const initialState = {
  ...initialAnswers,
  surveyId: null,
  savedQuestionCodes: [],
} satisfies Pick<SurveyState, keyof SurveyAnswers | 'surveyId' | 'savedQuestionCodes'>;

const ANSWER_KEY_BY_QUESTION_CODE: Record<QuestionCode, keyof SurveyAnswers> = {
  CONCERN: 'concern',
  SKIN_TYPE: 'skinType',
  SENSITIVITY: 'sensitive',
  CAUTION: 'discomfortTypes',
  EXPLORATION_HABIT: 'research',
};

export const useSurveyStore = create<SurveyState>((set) => ({
  ...initialState,
  setSurveyId: (surveyId) => set({ surveyId }),
  setConcern: (concern) => set({ concern }),
  setSkinType: (skinType) => set({ skinType }),
  setSensitive: (sensitive) => set({ sensitive }),
  setDiscomfortTypes: (discomfortTypes) => set({ discomfortTypes }),
  setResearch: (research) => set({ research }),
  markAnswerSaved: (questionCode) =>
    set((state) => ({
      savedQuestionCodes: state.savedQuestionCodes.includes(questionCode)
        ? state.savedQuestionCodes
        : [...state.savedQuestionCodes, questionCode],
    })),
  isAnswerSaved: (questionCode) =>
    useSurveyStore.getState().savedQuestionCodes.includes(questionCode),
  // 서버가 무효화한 뒤쪽 답변을 로컬에서도 비워, 화면과 서버 상태를 맞춥니다.
  clearAnswers: (questionCodes) =>
    set((state) => ({
      ...Object.fromEntries(
        questionCodes.map((code) => {
          const key = ANSWER_KEY_BY_QUESTION_CODE[code];
          return [key, initialAnswers[key]];
        }),
      ),
      savedQuestionCodes: state.savedQuestionCodes.filter((code) => !questionCodes.includes(code)),
    })),
  reset: () => set(initialState),
}));
