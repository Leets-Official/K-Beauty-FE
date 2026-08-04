import { SurveySkinTypeStep, useSurveyStepGuard } from '@/features/survey';

export default function SurveySkinTypeRoute() {
  const isAllowed = useSurveyStepGuard(['concern']);

  if (!isAllowed) {
    return null;
  }

  return <SurveySkinTypeStep />;
}
