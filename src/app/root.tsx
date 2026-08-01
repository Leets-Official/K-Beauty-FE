import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import { ToastProvider } from '@/shared/ui/Toast';

import './styles/global.css';

export default function Root() {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>K-Beauty</title>
        <Meta />
        <Links />
      </head>

      <body>
        <ToastProvider>
          <Outlet />

          <ScrollRestoration />
          <Scripts />
        </ToastProvider>
      </body>
    </html>
  );
}
