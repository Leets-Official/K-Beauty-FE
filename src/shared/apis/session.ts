import { apiClient, setSessionToken } from '@/shared/apis/apiClient';

import type { ApiResponse } from '@/shared/types/api';
import type { CreateSessionResponse } from '@/shared/types/session';

const SESSION_BASE_PATH = '/sessions';

const sessionApi = {
  create: () => apiClient.post<ApiResponse<CreateSessionResponse>>(SESSION_BASE_PATH),
};

/** 로그인이 없는 서비스라, 익명 세션 토큰을 발급받아 이후 모든 요청 헤더에 실어 보냅니다. */
async function createSession() {
  const response = await sessionApi.create();
  const session = response.data.data;
  setSessionToken(session.sessionToken);

  return session;
}

export { createSession, sessionApi };
