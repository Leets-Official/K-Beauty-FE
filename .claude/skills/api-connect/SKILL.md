---
name: api-connect
description: K-Beauty React Router SPA에서 Swagger/OpenAPI 명세를 참고해 API 타입, shared API 함수, React Query hook, 세션 토큰 처리 흐름을 연결한다. 사용자가 "API 연결", "API 붙여줘", "엔드포인트 연결", "React Query로 연결"을 요청하거나 Swagger/OpenAPI URL 또는 명세를 제공했을 때 사용한다.
---

# API Connect

K-Beauty 클라이언트의 현재 구조에 맞춰 API를 연결한다. 이 서비스는 로그인 기능이 없고, 세션 생성 응답 body의 `data.sessionToken`을 이후 요청의 `X-Session-Token` 헤더로 전송해 현재 세션을 저장/조회한다.

## 전제

- React Router 7 SPA 구조이다.
- API 인스턴스는 `src/shared/apis/apiClient.ts`의 `apiClient`를 사용한다.
- 모든 API의 공통 prefix인 `/api`는 `apiClient`의 `API_PREFIX`에서만 관리한다.
- 도메인 API 함수 path에는 `/api`를 붙이지 않는다.
- 세션 토큰은 `sessionStorage`/`localStorage`에 저장하지 않고 런타임 메모리에만 보관한다.
- 서버 상태는 `@tanstack/react-query`로 관리한다.
- 세션처럼 앱 전역에서 쓰는 API 함수는 `src/shared/apis/{domain}.ts`에 작성한다.
- 설문/추천처럼 feature 전용 API 함수는 `src/features/{feature}/model/{domain}Api.ts`에 작성한다.
- 앱 전역 DTO는 `src/shared/types/{domain}.ts`, feature 전용 DTO는 `src/features/{feature}/model/{domain}.ts`에 작성한다.
- React Query hook은 사용하는 feature의 `model` 폴더에 작성한다.
- `lib`에는 API 호출 코드를 두지 않고 순수 계산/변환/검증 함수만 둔다.
- UI 컴포넌트는 API 함수를 직접 호출하지 않고 feature hook을 사용한다.

## 1. API 명세 확인

Swagger/OpenAPI URL이나 붙여넣은 명세가 있으면 먼저 엔드포인트를 정리한다.

확인할 항목:

- HTTP method
- path
- path parameter
- query parameter
- request body
- response body
- response header
- 에러 코드와 메시지
- 세션 토큰이 필요한지 여부

엔드포인트 목록은 짧은 표로 보여주고, 여러 개면 연결할 번호를 확인한다.

```text
| # | Method | Path | Summary | Session |
|---|--------|------|---------|---------|
| 1 | POST | /api/sessions | 세션 생성 | 불필요 |
| 2 | GET | /api/sessions/current | 현재 세션 조회 | 필요 |
```

명세의 path가 `/api/...`로 시작하더라도 실제 API 함수 작성 시에는 `API_PREFIX`를 제외한다.

```text
OpenAPI path: /api/sessions/current
API function path: /sessions/current
```

## 2. 연결 전략 결정

| 상황                          | 전략                                    | 위치                                                 |
| ----------------------------- | --------------------------------------- | ---------------------------------------------------- |
| 페이지 진입 시 필요한 조회    | React Query `useQuery`                  | `features/{feature}/model/use{Name}Query.ts`         |
| 버튼/폼 제출로 생성·수정·삭제 | React Query `useMutation`               | `features/{feature}/model/use{Name}Mutation.ts`      |
| 세션 생성                     | API 함수 + mutation 또는 앱 초기화 흐름 | `shared/apis/session.ts`, feature/model              |
| 현재 세션 조회                | React Query `useQuery`                  | `features/{feature}/model/useCurrentSessionQuery.ts` |
| 설문 생성/답변/완료           | React Query `useMutation`/`useQuery`    | `features/survey/model`                              |
| 화면 전용 선택 상태           | Zustand 또는 local state                | 기존 feature store 또는 component                    |

모호할 때만 사용자에게 묻는다. 예를 들어 “이 조회가 페이지 진입 시 바로 필요한지, 버튼 클릭 후 필요한지” 정도만 확인한다.

## 3. 기존 코드 확인

작업 전에 반드시 확인한다.

```bash
sed -n '1,220p' src/shared/apis/apiClient.ts
find src/shared/apis -maxdepth 2 -type f
find src/shared/types -maxdepth 2 -type f
find src/features -maxdepth 3 -type d
```

확인할 것:

- `apiClient`의 baseURL, `API_PREFIX`, timeout, 세션 인터셉터
- 이미 존재하는 shared API 파일과 feature API 파일
- 이미 존재하는 DTO 타입
- 대상 feature의 `model`, `lib`, `ui` 구조

## 4. 타입 작성

DTO 타입은 소유권에 맞는 `model` 또는 `shared/types`에 둔다.

- 세션처럼 앱 전역에서 쓰는 DTO: `src/shared/types/{domain}.ts`
- 설문/추천처럼 feature 전용 DTO: `src/features/{feature}/model/{domain}.ts`

작성 규칙:

- 객체는 `interface`를 우선 사용한다.
- enum은 문자열 union type을 사용한다.
- 날짜/시간은 `string`으로 둔다.
- 명세가 불명확한 값은 `unknown`으로 두고 사용자에게 알린다.
- API 응답 DTO와 UI 모델이 다르면 DTO 이름에 `Response`, `Request`, `Body`를 붙인다.

```ts
export type DiagnosisType = 'QUICK' | 'DETAILED';
export type SessionStatus = 'IN_PROGRESS' | 'COMPLETED' | 'RESTARTED';

export interface SurveyAnswers {
  skinConcern: string;
  skinType: string;
  typeNeutralMode: string;
  sensitivityStatus: string;
  cautionCategories: string[];
}

export interface CurrentSessionResponse {
  diagnosisType: DiagnosisType;
  status: SessionStatus;
  surveyAnswers: SurveyAnswers;
  recommendationId: string | null;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface CreateSessionResponse {
  sessionToken: string;
  status: SessionStatus;
  createdAt: string;
}
```

## 5. API 함수 작성

앱 전역 API 파일은 `src/shared/apis/{domain}.ts`에 둔다.

```ts
import { apiClient } from '@/shared/apis/apiClient';
import type {
  ApiResponse,
  CreateSessionResponse,
  CurrentSessionResponse,
} from '@/shared/types/session';

const SESSION_BASE_PATH = '/sessions';

const sessionApi = {
  create: () => apiClient.post<ApiResponse<CreateSessionResponse>>(SESSION_BASE_PATH),

  getCurrent: () =>
    apiClient.get<ApiResponse<CurrentSessionResponse>>(`${SESSION_BASE_PATH}/current`),
};

export { sessionApi };
```

`src/shared/apis/index.ts`에서 필요한 API와 세션 유틸을 re-export한다.

```ts
export { sessionApi } from '@/shared/apis/session';
```

feature 전용 API 파일은 `src/features/{feature}/model/{domain}Api.ts`에 둔다.

```ts
import { apiClient } from '@/shared/apis/apiClient';
import type { ApiResponse } from '@/shared/types/api';

import type { CreateSurveyResponse } from './survey';

const SURVEY_BASE_PATH = '/surveys';

const surveyApi = {
  create: () => apiClient.post<ApiResponse<CreateSurveyResponse>>(SURVEY_BASE_PATH),
};

export { surveyApi };
```

## 6. 세션 토큰 처리

세션 생성 API가 응답 body의 `data.sessionToken`으로 토큰을 내려주면 저장한다.

```ts
import { setSessionToken } from '@/shared/apis';
import { sessionApi } from '@/shared/apis/session';

async function createSession() {
  const response = await sessionApi.create();
  const sessionToken = response.data.data.sessionToken;

  if (typeof sessionToken === 'string') {
    setSessionToken(sessionToken);
  }
}
```

주의:

- 일반 API 함수에서 `sessionStorage`를 직접 읽지 않는다.
- `sessionStorage`/`localStorage`에 세션 토큰을 저장하지 않는다.
- 새로고침하면 메모리 토큰이 사라지므로 필요한 경우 세션 생성부터 다시 시작한다.
- `X-Session-Token` 헤더는 `apiClient` 요청 인터셉터가 자동으로 붙인다.
- 세션 생성 API처럼 아직 토큰이 없는 요청은 저장된 토큰이 없으므로 헤더 없이 호출된다.

## 7. React Query Hook 작성

Query key factory를 같은 feature의 `model`에 둔다.

```ts
const sessionQueries = {
  all: ['session'] as const,
  current: () => [...sessionQueries.all, 'current'] as const,
};

export { sessionQueries };
```

조회 hook:

```ts
import { useQuery } from '@tanstack/react-query';

import { sessionApi } from '@/shared/apis/session';

import { sessionQueries } from './sessionQueries';

function useCurrentSessionQuery() {
  return useQuery({
    queryKey: sessionQueries.current(),
    queryFn: () => sessionApi.getCurrent().then((response) => response.data),
  });
}

export { useCurrentSessionQuery };
```

mutation hook:

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { setSessionToken } from '@/shared/apis';
import { sessionApi } from '@/shared/apis/session';

import { sessionQueries } from './sessionQueries';

function useCreateSessionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sessionApi.create,
    onSuccess: (response) => {
      const sessionToken = response.data.data.sessionToken;

      if (typeof sessionToken === 'string') {
        setSessionToken(sessionToken);
      }

      queryClient.invalidateQueries({ queryKey: sessionQueries.all });
    },
  });
}

export { useCreateSessionMutation };
```

## 8. React Query Provider 확인

`QueryClientProvider`가 없으면 `src/app/providers`에 추가하고 `src/app/root.tsx`에서 감싼다.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

interface QueryProviderProps {
  children: React.ReactNode;
}

function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export { QueryProvider };
```

## 9. UI 연결

UI는 hook만 사용한다.

```tsx
import { useCurrentSessionQuery } from '@/features/session/model/useCurrentSessionQuery';

function SessionStatusView() {
  const { data, isPending, isError } = useCurrentSessionQuery();

  if (isPending) {
    return <p>불러오는 중</p>;
  }

  if (isError) {
    return <p>세션을 불러오지 못했어요.</p>;
  }

  return <p>{data.status}</p>;
}
```

## 10. Good/Bad

Good:

- `apiClient` 인스턴스를 재사용한다.
- 앱 전역 API 함수는 `shared/apis`, feature 전용 API 함수는 `features/{feature}/model`에 둔다.
- 앱 전역 DTO는 `shared/types`, feature 전용 DTO는 `features/{feature}/model`에 둔다.
- React Query hook은 `features/{feature}/model`에 둔다.
- `response.data` 추출은 React Query hook에서 처리한다.
- query key는 배열과 객체로 구조화한다.
- 세션 토큰은 `setSessionToken`, `clearSessionToken` 유틸로만 다룬다.

Bad:

- UI 컴포넌트에서 `axios`, `fetch`, `apiClient`를 직접 호출한다.
- API 함수마다 baseURL, timeout, session header를 반복한다.
- `queryKey: ['domain-id']`처럼 문자열 조합 key를 쓴다.
- DTO 타입을 UI 컴포넌트 파일 안에 임시로 만든다.
- 명세가 불명확한 값을 `any`로 처리한다.
