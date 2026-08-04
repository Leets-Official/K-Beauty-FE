import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { getSurveyNextRoute } from '@/features/survey/lib/getSurveyNextRoute';
import { ensureSurveyId } from '@/features/survey/model/ensureSurveyId';
import { surveyApi } from '@/features/survey/model/surveyApi';
import { useSurveyStore } from '@/features/survey/model/useSurveyStore';
import { DEFAULT_ERROR_MESSAGE } from '@/shared/apis';
import { toast } from '@/shared/ui/Toast';

import type {
  DiagnosisMode,
  QuestionCode,
  SurveyNextStep,
} from '@/features/survey/model/surveyAnswer';

interface SaveSurveyAnswerVariables {
  questionCode: QuestionCode;
  optionCodes: string[];
  /** 피부 타입 화면처럼 답변과 진단 모드를 함께 정하는 스텝에서만 넘깁니다. */
  diagnosisMode?: DiagnosisMode;
}

function useSaveSurveyAnswer() {
  const clearAnswers = useSurveyStore((state) => state.clearAnswers);

  return useMutation({
    mutationFn: async ({ questionCode, optionCodes, diagnosisMode }: SaveSurveyAnswerVariables) => {
      const surveyId = await ensureSurveyId();
      const answer = await surveyApi.saveAnswer(surveyId, questionCode, { optionCodes });

      // 서버가 무효화한 답변은 진단 모드 갱신 성공 여부와 무관하게 즉시 로컬에도 반영합니다.
      if (answer.clearedQuestionCodes.length > 0) {
        clearAnswers(answer.clearedQuestionCodes);
      }

      // 진단 모드를 함께 보낸 경우, 다음 화면 판단은 더 나중에 받은 응답을 따릅니다.
      const nextStep: SurveyNextStep = diagnosisMode
        ? await surveyApi.updateDiagnosisMode(surveyId, { diagnosisMode })
        : answer;

      return { answer, nextStep };
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE);
    },
  });
}

/**
 * 각 설문 스텝의 '다음' 버튼용. 저장에 성공했을 때만, 서버 응답이 알려준 다음 화면으로 넘어갑니다.
 * `diagnosisMode`는 피부 타입 화면처럼 사용자가 진단 모드를 직접 고르는 스텝에서만 넘기면 됩니다.
 */
function useSurveyAnswerSubmit() {
  const navigate = useNavigate();
  const { mutate, isPending } = useSaveSurveyAnswer();

  // 실패하면 onError의 토스트로 안내하고, 답변을 다시 고를 수 있게 화면을 유지합니다.
  const submit = (
    questionCode: QuestionCode,
    optionCodes: string[],
    diagnosisMode?: DiagnosisMode,
  ) => {
    mutate(
      { questionCode, optionCodes, diagnosisMode },
      { onSuccess: (data) => navigate(getSurveyNextRoute(data.nextStep, diagnosisMode)) },
    );
  };

  return { submit, isPending };
}

export { useSaveSurveyAnswer, useSurveyAnswerSubmit, type SaveSurveyAnswerVariables };
