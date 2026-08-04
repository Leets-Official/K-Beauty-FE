import { useSurveyStepGuard } from '@/features/survey/model/useSurveyStepGuard';
import { SurveySensitiveStep } from '@/features/survey/ui/SurveySensitiveStep';

export default function SurveySensitiveRoute() {
  const isAllowed = useSurveyStepGuard(['concern', 'skinType']);

  if (!isAllowed) {
    return null;
  }

  return <SurveySensitiveStep />;
}
