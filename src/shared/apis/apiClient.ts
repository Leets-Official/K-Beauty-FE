import axios from 'axios';

import type { ApiResponse } from '@/shared/types/api';

const API_PREFIX = '/api';
const API_TIMEOUT = 10_000;
const SESSION_TOKEN_HEADER = 'X-Session-Token';
const SESSION_TOKEN_STORAGE_KEY = 'cosmetch-session-token';
const DEFAULT_ERROR_MESSAGE = '문제가 발생했어요. 잠시 후 다시 시도해주세요.';

function readStoredSessionToken() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.sessionStorage.getItem(SESSION_TOKEN_STORAGE_KEY);
}

let sessionToken: string | null = readStoredSessionToken();

function setSessionToken(token: string) {
  sessionToken = token;

  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem(SESSION_TOKEN_STORAGE_KEY, token);
  }
}

function getSessionToken() {
  return sessionToken;
}

function clearSessionToken() {
  sessionToken = null;

  if (typeof window !== 'undefined') {
    window.sessionStorage.removeItem(SESSION_TOKEN_STORAGE_KEY);
  }
}

class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

const apiOrigin = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '') ?? '';

const apiClient = axios.create({
  baseURL: `${apiOrigin}${API_PREFIX}`,
  timeout: API_TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
});

function isDebuggableRequest(url?: string) {
  return Boolean(url?.startsWith('/surveys') || url?.startsWith('/recommendations'));
}

apiClient.interceptors.request.use((config) => {
  const token = getSessionToken();

  if (token) {
    config.headers.set(SESSION_TOKEN_HEADER, token);
  }

  if (import.meta.env.DEV && isDebuggableRequest(config.url)) {
    console.debug('[api request]', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
      hasSessionToken: Boolean(token),
    });
  }

  return config;
});

apiClient.interceptors.response.use((response) => {
  if (import.meta.env.DEV && isDebuggableRequest(response.config.url)) {
    console.debug('[api response]', {
      method: response.config.method?.toUpperCase(),
      url: response.config.url,
      data: response.data,
    });
  }

  return response;
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
  SESSION_TOKEN_STORAGE_KEY,
  apiClient,
  clearSessionToken,
  getSessionToken,
  setSessionToken,
};
