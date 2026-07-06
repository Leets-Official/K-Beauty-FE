import { index, route, layout, type RouteConfig } from '@react-router/dev/routes';

export default [
  layout('layouts/PublicLayout.tsx', [route('login', 'routes/(public)/login/index.tsx')]),

  layout('layouts/PrivateLayout.tsx', [index('routes/(private)/home/index.tsx')]),
] satisfies RouteConfig;
