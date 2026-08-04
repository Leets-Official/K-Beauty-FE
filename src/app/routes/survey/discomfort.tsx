import { SurveyDiscomfortStep, useSurveyStepGuard } from '@/features/survey';

export default function SurveyDiscomfortRoute() {
  const isAllowed = useSurveyStepGuard(['concern', 'skinType', 'sensitive']);

  if (!isAllowed) {
    return null;
  }

  return <SurveyDiscomfortStep />;
}
