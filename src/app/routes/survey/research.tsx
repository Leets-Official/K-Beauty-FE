import { SurveyResearchStep, useSurveyStepGuard } from '@/features/survey';

export default function SurveyResearchRoute() {
  const isAllowed = useSurveyStepGuard(['concern', 'skinType', 'sensitive']);

  if (!isAllowed) {
    return null;
  }

  return <SurveyResearchStep />;
}
