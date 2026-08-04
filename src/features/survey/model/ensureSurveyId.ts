import { surveyApi } from '@/features/survey/model/surveyApi';
import { useSurveyStore } from '@/features/survey/model/useSurveyStore';
import { createSession, getSessionToken } from '@/shared/apis';

let bootstrapping: Promise<number> | null = null;

async function bootstrap() {
  if (!getSessionToken()) {
    await createSession();
  }

  const survey = await surveyApi.create();
  useSurveyStore.getState().setSurveyId(survey.id);

  return survey.id;
}

/**
 * 답변을 저장하려면 세션 토큰과 surveyId가 먼저 있어야 합니다.
 * 없으면 만들고 있으면 재사용하며, 동시에 여러 번 불려도 요청은 한 번만 나갑니다.
 */
export function ensureSurveyId(): Promise<number> {
  const { surveyId } = useSurveyStore.getState();

  if (surveyId !== null && getSessionToken()) {
    return Promise.resolve(surveyId);
  }

  bootstrapping ??= bootstrap().finally(() => {
    bootstrapping = null;
  });

  return bootstrapping;
}
