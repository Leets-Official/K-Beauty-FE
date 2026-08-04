import { useSurveyStepGuard } from '@/features/survey/model/useSurveyStepGuard';
import { SurveyResearchStep } from '@/features/survey/ui/SurveyResearchStep';

export default function SurveyResearchRoute() {
  const isAllowed = useSurveyStepGuard(['concern', 'skinType', 'sensitive']);

  if (!isAllowed) {
    return null;
  }

  return <SurveyResearchStep />;
}
