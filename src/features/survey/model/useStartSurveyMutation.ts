import { useMutation } from '@tanstack/react-query';

import { setSessionToken } from '@/shared/apis';
import { sessionApi } from '@/shared/apis/session';

import { surveyApi } from './surveyApi';

async function startSurvey() {
  const sessionResponse = await sessionApi.create();
  const { sessionToken } = sessionResponse.data.data;

  setSessionToken(sessionToken);

  const surveyResponse = await surveyApi.create();

  return {
    session: sessionResponse.data.data,
    survey: surveyResponse.data.data,
  };
}

function useStartSurveyMutation() {
  return useMutation({
    mutationFn: startSurvey,
  });
}

export { useStartSurveyMutation };
