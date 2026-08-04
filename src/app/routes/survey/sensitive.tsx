import { SurveySensitiveStep, useSurveyStepGuard } from '@/features/survey';

export default function SurveySensitiveRoute() {
  const isAllowed = useSurveyStepGuard(['concern', 'skinType']);

  if (!isAllowed) {
    return null;
  }

  return <SurveySensitiveStep />;
}
