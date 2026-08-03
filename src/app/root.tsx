import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import { QueryProvider } from '@/app/providers/QueryProvider';
import { ToastProvider } from '@/shared/ui/Toast';

import './styles/global.css';

export default function Root() {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>Cosmetch</title>
        <Meta />
        <Links />
      </head>

      <body>
        <QueryProvider>
          <ToastProvider>
            <Outlet />

            <ScrollRestoration />
            <Scripts />
          </ToastProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
