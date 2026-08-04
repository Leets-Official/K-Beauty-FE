type SessionStatus = 'IN_PROGRESS' | 'COMPLETED' | 'RESTARTED';

interface CreateSessionResponse {
  sessionToken: string;
  status: SessionStatus;
  createdAt: string;
}

type SessionCreateResponse = CreateSessionResponse;

export type { CreateSessionResponse, SessionCreateResponse, SessionStatus };
