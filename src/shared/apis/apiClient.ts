import axios from 'axios';

import type { ApiResponse } from '@/shared/types/api';

const API_PREFIX = '/api';
const API_TIMEOUT = 10_000;
const SESSION_TOKEN_HEADER = 'X-Session-Token';
const DEFAULT_ERROR_MESSAGE = '문제가 발생했어요. 잠시 후 다시 시도해주세요.';

let sessionToken: string | null = null;

function setSessionToken(token: string) {
  sessionToken = token;
}

function getSessionToken() {
  return sessionToken;
}

function clearSessionToken() {
  sessionToken = null;
}

class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// 백엔드 주소를 번들에 넣지 않기 위해 항상 같은 출처의 /api로 요청합니다.
// 실제 주소는 서버 쪽 BACKEND_ORIGIN에만 두고, 로컬은 vite dev proxy가,
// 운영은 vercel.json rewrite와 api/proxy.js가 백엔드로 전달합니다.
const apiClient = axios.create({
  baseURL: API_PREFIX,
  timeout: API_TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = getSessionToken();

  if (token) {
    config.headers.set(SESSION_TOKEN_HEADER, token);
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const status = error.response?.status ?? 0;
    const body = error.response?.data as Partial<ApiResponse<unknown>> | undefined;

    // 400번대는 "이미 완료된 설문입니다"처럼 사용자에게 그대로 보여줄 만한 안내라 서버 메시지를 쓰고,
    // 500번대와 네트워크 오류는 내부 사정이라 공통 문구로 바꿉니다.
    const isClientError = status >= 400 && status < 500;
    const message = isClientError
      ? (body?.message ?? DEFAULT_ERROR_MESSAGE)
      : DEFAULT_ERROR_MESSAGE;

    return Promise.reject(new ApiError(status, message));
  },
);

export {
  API_PREFIX,
  ApiError,
  DEFAULT_ERROR_MESSAGE,
  SESSION_TOKEN_HEADER,
  apiClient,
  clearSessionToken,
  getSessionToken,
  setSessionToken,
};
