export type SessionStatus = 'IN_PROGRESS' | 'COMPLETED' | 'RESTARTED';

export interface SessionCreateResponse {
  sessionToken: string;
  status: SessionStatus;
  createdAt: string;
}
