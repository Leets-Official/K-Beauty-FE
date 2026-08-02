import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/onboarding/index.tsx'),
  route('recommendation', 'routes/recommendation/index.tsx'),
  route('recommendation/product/:productId', 'routes/recommendation/product.tsx'),
  route('survey', 'routes/survey/concern.tsx'),
  route('survey/skin-type', 'routes/survey/skin-type.tsx'),
  route('survey/sensitive', 'routes/survey/sensitive.tsx'),
  route('survey/discomfort', 'routes/survey/discomfort.tsx'),
  route('survey/research', 'routes/survey/research.tsx'),
  route('loading', 'routes/loading/index.tsx'),
] satisfies RouteConfig;
