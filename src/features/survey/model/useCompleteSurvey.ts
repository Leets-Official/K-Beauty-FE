import { useMutation } from '@tanstack/react-query';

import { surveyApi } from '@/features/survey/model/surveyApi';
import { useSurveyStore } from '@/features/survey/model/useSurveyStore';
import { DEFAULT_ERROR_MESSAGE } from '@/shared/apis';
import { toast } from '@/shared/ui/Toast';

/**
 * 마지막 답변까지 저장되면 서버가 `nextAction: 'READY_TO_COMPLETE'`를 돌려주고,
 * 그때 이 API를 호출해야 설문이 완료 상태가 됩니다. 로딩 화면에서 한 번 호출합니다.
 */
function useCompleteSurvey() {
  return useMutation({
    mutationFn: () => {
      const { surveyId } = useSurveyStore.getState();

      if (surveyId === null) {
        return Promise.reject(new Error(DEFAULT_ERROR_MESSAGE));
      }

      return surveyApi.complete(surveyId);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE);
    },
  });
}

export { useCompleteSurvey };
