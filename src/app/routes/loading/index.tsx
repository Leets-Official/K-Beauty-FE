import { useSurveyStepGuard } from '@/features/survey/model/useSurveyStepGuard';
import { SurveyLoadingStep } from '@/features/survey/ui/SurveyLoadingStep';

export default function LoadingRoute() {
  // 바로 추천(QUICK) 흐름에서도 최소한 고민과 피부 타입은 답한 상태여야 합니다.
  const isAllowed = useSurveyStepGuard(['concern', 'skinType']);

  if (!isAllowed) {
    return null;
  }

  return <SurveyLoadingStep />;
}
