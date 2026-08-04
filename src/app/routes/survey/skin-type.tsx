import { useSurveyStepGuard } from '@/features/survey/model/useSurveyStepGuard';
import { SurveySkinTypeStep } from '@/features/survey/ui/SurveySkinTypeStep';

export default function SurveySkinTypeRoute() {
  const isAllowed = useSurveyStepGuard(['concern']);

  if (!isAllowed) {
    return null;
  }

  return <SurveySkinTypeStep />;
}
