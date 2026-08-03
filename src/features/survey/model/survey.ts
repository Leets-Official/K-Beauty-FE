type DiagnosisMode = 'QUICK' | 'DETAILED';

interface CreateSurveyResponse {
  id: number;
  sessionId: number;
  diagnosisMode: DiagnosisMode;
  [key: string]: unknown;
}

export type { CreateSurveyResponse, DiagnosisMode };
