import { useMutation } from '@tanstack/react-query';

import { surveyApi } from '@/features/survey/model/surveyApi';
import { useSurveyStore } from '@/features/survey/model/useSurveyStore';
import { createSession, getSessionToken } from '@/shared/apis';

let starting: Promise<number> | null = null;

async function start() {
  // 세션은 익명 사용자 식별용이라 설문마다 새로 받을 필요가 없습니다. 없을 때만 발급받습니다.
  if (!getSessionToken()) {
    await createSession();
  }

  const survey = await surveyApi.create();

  // 서버에는 답변이 없는 새 설문이라, 이전 설문의 답변이 남아 화면과 어긋나지 않게 먼저 비웁니다.
  useSurveyStore.getState().reset();
  useSurveyStore.getState().setSurveyId(survey.id);

  return survey.id;
}

/** 설문을 새로 시작합니다. 세션은 있으면 이어 쓰며, 동시에 여러 번 불려도 요청은 한 번만 나갑니다. */
function startSurvey(): Promise<number> {
  starting ??= start().finally(() => {
    starting = null;
  });

  return starting;
}

/**
 * 답변을 저장하려면 세션 토큰과 surveyId가 먼저 있어야 합니다.
 * 온보딩을 거쳐 왔으면 그때 만든 설문을 그대로 쓰고, 첫 질문으로 바로 들어온 경우에는 여기서 시작합니다.
 */
function ensureSurveyId(): Promise<number> {
  const { surveyId } = useSurveyStore.getState();

  if (surveyId !== null && getSessionToken()) {
    return Promise.resolve(surveyId);
  }

  return startSurvey();
}

function useStartSurveyMutation() {
  return useMutation({
    mutationFn: startSurvey,
  });
}

export { ensureSurveyId, useStartSurveyMutation };
