// 브라우저에는 같은 출처의 /api만 노출하고, 실제 백엔드 주소는 서버 전용 BACKEND_ORIGIN에만 둡니다.
// vercel.json의 rewrite가 /api/* 요청을 이 함수로 보내면서 원래 경로를 path 쿼리로 전달합니다.

// axios(10초)보다 짧게 잡아야 클라이언트가 먼저 끊지 않고 아래 502 메시지를 받습니다.
const UPSTREAM_TIMEOUT = 8_000;

const REQUEST_HEADERS_TO_REMOVE = [
  'accept-encoding',
  'connection',
  'content-length',
  'host',
  'origin',
  'referer',
  'transfer-encoding',
  'x-forwarded-host',
  'x-forwarded-port',
  'x-forwarded-proto',
];

const RESPONSE_HEADERS_TO_REMOVE = [
  'connection',
  'content-encoding',
  'content-length',
  'transfer-encoding',
];

function jsonError(status, message) {
  return Response.json({ message }, { status, headers: { 'Cache-Control': 'no-store' } });
}

function getBackendOrigin() {
  const value = process.env.BACKEND_ORIGIN?.trim();

  if (!value) {
    return null;
  }

  try {
    const origin = new URL(value);

    if (origin.protocol !== 'http:' && origin.protocol !== 'https:') {
      return null;
    }

    origin.pathname = '/';
    origin.search = '';
    origin.hash = '';

    return origin;
  } catch {
    return null;
  }
}

function getTargetUrl(request, backendOrigin) {
  const incomingUrl = new URL(request.url);
  const path = incomingUrl.searchParams.get('path');

  if (!path) {
    return null;
  }

  const segments = path.split('/').filter(Boolean);

  if (segments.length === 0 || segments.some((segment) => segment === '.' || segment === '..')) {
    return null;
  }

  const targetUrl = new URL(`/api/${segments.map(encodeURIComponent).join('/')}`, backendOrigin);

  incomingUrl.searchParams.delete('path');
  targetUrl.search = incomingUrl.searchParams.toString();

  return targetUrl;
}

export default {
  async fetch(request) {
    const backendOrigin = getBackendOrigin();

    if (!backendOrigin) {
      return jsonError(500, '서버 설정을 확인해주세요.');
    }

    const targetUrl = getTargetUrl(request, backendOrigin);

    if (!targetUrl) {
      return jsonError(400, '올바르지 않은 API 경로입니다.');
    }

    const headers = new Headers(request.headers);

    for (const header of REQUEST_HEADERS_TO_REMOVE) {
      headers.delete(header);
    }

    const init = {
      method: request.method,
      headers,
      redirect: 'follow',
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT),
    };

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      const body = await request.arrayBuffer();

      if (body.byteLength > 0) {
        init.body = body;
      }
    }

    try {
      const upstreamResponse = await fetch(targetUrl, init);
      const responseHeaders = new Headers(upstreamResponse.headers);

      for (const header of RESPONSE_HEADERS_TO_REMOVE) {
        responseHeaders.delete(header);
      }

      responseHeaders.set('Cache-Control', 'no-store');

      return new Response(upstreamResponse.body, {
        status: upstreamResponse.status,
        statusText: upstreamResponse.statusText,
        headers: responseHeaders,
      });
    } catch {
      return jsonError(502, '백엔드 서버에 연결할 수 없습니다.');
    }
  },
};
