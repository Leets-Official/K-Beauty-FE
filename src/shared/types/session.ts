type SessionStatus = 'IN_PROGRESS' | 'COMPLETED' | 'RESTARTED';

interface CreateSessionResponse {
  sessionToken: string;
  status: SessionStatus;
  createdAt: string;
}

export type { CreateSessionResponse, SessionStatus };
