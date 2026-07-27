import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/onboarding/index.tsx'),
  route('recommendation', 'routes/recommendation/index.tsx'),
] satisfies RouteConfig;
