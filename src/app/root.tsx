import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import { QueryProvider } from '@/app/providers/QueryProvider';
import { ToastProvider } from '@/shared/ui/Toast';

import './styles/global.css';

const META_TITLE = '인기보다 나에게 맞게, Cosmetch';
const META_DESCRIPTION =
  "'인기순'의 함정에서 벗어나, 데이터로 '나만의 화장품'을 찾는 스마트 솔루션";
const META_IMAGE_URL = 'https://www.cosmetch.kr/assets/og/og_img.png';

export default function Root() {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>{META_TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:site_name" content="Cosmetch" />
        <meta property="og:title" content={META_TITLE} />
        <meta property="og:description" content={META_DESCRIPTION} />
        <meta property="og:image" content={META_IMAGE_URL} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="728" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={META_TITLE} />
        <meta name="twitter:description" content={META_DESCRIPTION} />
        <meta name="twitter:image" content={META_IMAGE_URL} />
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
