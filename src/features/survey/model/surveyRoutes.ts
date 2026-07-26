export const SURVEY_ROUTES = {
  concern: '/survey/concern',
  skinType: '/survey/skin-type',
  sensitive: '/survey/sensitive',
  discomfort: '/survey/discomfort',
  research: '/survey/research',
  loading: '/loading',
  result: '/result',
} as const;

export type SurveyRoute = (typeof SURVEY_ROUTES)[keyof typeof SURVEY_ROUTES];
