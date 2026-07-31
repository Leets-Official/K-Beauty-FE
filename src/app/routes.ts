import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/onboarding/index.tsx'),
  route('recommendation', 'routes/recommendation/index.tsx'),
  route('recommendation/product/:productId', 'routes/recommendation/product.tsx'),
] satisfies RouteConfig;
