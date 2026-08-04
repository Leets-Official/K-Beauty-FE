import { useSurveyStepGuard } from '@/features/survey/model/useSurveyStepGuard';
import { SurveyDiscomfortStep } from '@/features/survey/ui/SurveyDiscomfortStep';

export default function SurveyDiscomfortRoute() {
  const isAllowed = useSurveyStepGuard(['concern', 'skinType', 'sensitive']);

  if (!isAllowed) {
    return null;
  }

  return <SurveyDiscomfortStep />;
}
