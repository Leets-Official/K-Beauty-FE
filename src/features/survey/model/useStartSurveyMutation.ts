import { useMutation } from '@tanstack/react-query';

import { useSurveyStore } from '@/features/survey/model/useSurveyStore';
import { createSession } from '@/shared/apis';

import { surveyApi } from './surveyApi';

async function startSurvey() {
  const session = await createSession();
  const survey = await surveyApi.create();
  useSurveyStore.getState().setSurveyId(survey.id);

  return {
    session,
    survey,
  };
}

function useStartSurveyMutation() {
  return useMutation({
    mutationFn: startSurvey,
  });
}

export { useStartSurveyMutation };
