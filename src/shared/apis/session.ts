import { apiClient } from '@/shared/apis/apiClient';
import type { ApiResponse } from '@/shared/types/api';
import type { CreateSessionResponse } from '@/shared/types/session';

const SESSION_BASE_PATH = '/sessions';

const sessionApi = {
  create: () => apiClient.post<ApiResponse<CreateSessionResponse>>(SESSION_BASE_PATH),
};

export { sessionApi };
