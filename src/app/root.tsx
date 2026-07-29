import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

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
        <Outlet />

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
