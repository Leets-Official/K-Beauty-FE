export const SURVEY_ROUTES = {
  onboarding: '/',
  concern: '/survey',
  skinType: '/survey/skin-type',
  sensitive: '/survey/sensitive',
  discomfort: '/survey/discomfort',
  research: '/survey/research',
  loading: '/loading',
  result: '/recommendation',
} as const;

export type SurveyRoute = (typeof SURVEY_ROUTES)[keyof typeof SURVEY_ROUTES];
