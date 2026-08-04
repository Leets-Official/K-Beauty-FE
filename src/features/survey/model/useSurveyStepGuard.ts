import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { SURVEY_ROUTES } from '@/features/survey/model/surveyRoutes';
import { useSurveyStore } from '@/features/survey/model/useSurveyStore';

type SurveyAnswerKey = 'concern' | 'skinType' | 'sensitive' | 'discomfortTypes' | 'research';

function isAnswered(value: unknown) {
  return Array.isArray(value) ? value.length > 0 : value !== null;
}

/**
 * 앞 단계 답변 없이 도착한 설문 화면을 첫 질문으로 되돌립니다.
 *
 * 세션 토큰과 답변은 메모리에만 있어서 새로고침하면 사라지는데 URL은 그대로 남습니다.
 * 그 상태로 답을 저장하면 서버에 설문이 새로 생겨 앞 답변과 이어지지 않으므로, 아예 처음부터 다시 받습니다.
 * 북마크나 링크로 중간 화면에 직접 들어온 경우도 같습니다.
 *
 * 화면을 그릴지 여부(`isAllowed`)를 돌려주므로, 되돌아가기 직전에 빈 화면이 잠깐 보이는 것을 막을 수 있습니다.
 */
function useSurveyStepGuard(requiredAnswerKeys: SurveyAnswerKey[]) {
  const navigate = useNavigate();
  const isAllowed = useSurveyStore((state) =>
    requiredAnswerKeys.every((key) => isAnswered(state[key])),
  );

  useEffect(() => {
    if (!isAllowed) {
      // replace를 써서, 되돌아간 뒤 뒤로가기로 다시 막힌 화면에 들어오지 않게 합니다.
      navigate(SURVEY_ROUTES.concern, { replace: true });
    }
  }, [isAllowed, navigate]);

  return isAllowed;
}

export { useSurveyStepGuard, type SurveyAnswerKey };
