---
name: api-connect
description: Connects API types, shared API functions, React Query hooks, and session token handling flows in the K-Beauty React Router SPA by referencing Swagger/OpenAPI specifications. Use this when the user requests "API integration", "connect this API", "connect an endpoint", "connect with React Query", or provides a Swagger/OpenAPI URL or specification.
---

# API Connect

Connect APIs according to the current structure of the K-Beauty client. This service does not have login functionality. It sends the `data.sessionToken` from the session creation response body as the `X-Session-Token` header on subsequent requests to store and retrieve the current session.

## Assumptions

- The app uses a React Router 7 SPA structure.
- Use the `apiClient` instance from `src/shared/apis/apiClient.ts`.
- The common `/api` prefix for all APIs must be managed only by `API_PREFIX` in `apiClient`.
- Do not add `/api` to domain API function paths.
- Manage the session token only through `apiClient` utilities such as `setSessionToken()` and `clearSessionToken()`.
- To support refresh and same-tab re-entry, only `apiClient` may persist the session token in `sessionStorage`. Do not store it in `localStorage`.
- Manage server state with `@tanstack/react-query`.
- API functions used globally across the app, such as session APIs, should be written in `src/shared/apis/{domain}.ts`.
- Feature-specific API functions, such as survey or recommendation APIs, should be written in `src/features/{feature}/model/{domain}Api.ts`.
- App-wide DTOs should be written in `src/shared/types/{domain}.ts`; feature-specific DTOs should be written in `src/features/{feature}/model/{domain}.ts`.
- React Query hooks should be written in the `model` folder of the feature that uses them.
- Do not put API call code in `lib`; keep only pure calculation, transformation, and validation functions there.
- UI components should not call API functions directly. They should use feature hooks.

## 1. Check The API Specification

If a Swagger/OpenAPI URL or pasted specification is available, first summarize the endpoints.

Check the following:

- HTTP method
- path
- path parameters
- query parameters
- request body
- response body
- response headers
- error codes and messages
- whether a session token is required

Show the endpoint list as a short table. If there are multiple endpoints, ask which number should be connected.

```text
| # | Method | Path | Summary | Session |
|---|--------|------|---------|---------|
| 1 | POST | /api/sessions | Create session | Not required |
| 2 | GET | /api/sessions/current | Get current session | Required |
```

Even if the path in the specification starts with `/api/...`, exclude `API_PREFIX` when writing the actual API function.

```text
OpenAPI path: /api/sessions/current
API function path: /sessions/current
```

## 2. Decide The Integration Strategy

| Situation                                | Strategy                                 | Location                                             |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------------------- |
| Data needed on page entry                | React Query `useQuery`                   | `features/{feature}/model/use{Name}Query.ts`         |
| Create/update/delete from button or form | React Query `useMutation`                | `features/{feature}/model/use{Name}Mutation.ts`      |
| Session creation                         | API function + mutation or app init flow | `shared/apis/session.ts`, feature/model              |
| Current session lookup                   | React Query `useQuery`                   | `features/{feature}/model/useCurrentSessionQuery.ts` |
| Survey creation/answer/completion        | React Query `useMutation`/`useQuery`     | `features/survey/model`                              |
| Screen-specific selection state          | Zustand or local state                   | Existing feature store or component                  |

Ask the user only when the requirement is ambiguous. For example, only clarify whether the query should run immediately on page entry or only after a button click.

## 3. Check Existing Code

Always check these before working.

```bash
sed -n '1,220p' src/shared/apis/apiClient.ts
find src/shared/apis -maxdepth 2 -type f
find src/shared/types -maxdepth 2 -type f
find src/features -maxdepth 3 -type d
```

Check the following:

- `apiClient` baseURL, `API_PREFIX`, timeout, and session interceptor
- Existing shared API files and feature API files
- Existing DTO types
- The target feature's `model`, `lib`, and `ui` structure

## 4. Write Types

Place DTO types in `model` or `shared/types` according to ownership.

- DTOs used globally across the app, such as session DTOs: `src/shared/types/{domain}.ts`
- Feature-specific DTOs, such as survey or recommendation DTOs: `src/features/{feature}/model/{domain}.ts`

Rules:

- Prefer `interface` for objects.
- Use string union types instead of enums.
- Keep date/time values as `string`.
- Use `unknown` for unclear values in the specification and tell the user.
- If API response DTOs and UI models are different, suffix DTO names with `Response`, `Request`, or `Body`.

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

## 5. Write API Functions

Put app-wide API files in `src/shared/apis/{domain}.ts`.

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

Re-export the necessary APIs and session utilities from `src/shared/apis/index.ts`.

```ts
export { sessionApi } from '@/shared/apis/session';
```

Put feature-specific API files in `src/features/{feature}/model/{domain}Api.ts`.

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

## 6. Handle The Session Token

If the session creation API returns the token as `data.sessionToken` in the response body, store it.

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

Notes:

- Do not read `sessionStorage` directly from regular API functions.
- Do not write the session token to browser storage outside `apiClient`.
- Do not store the session token in `localStorage`.
- The token is preserved across refreshes in the same tab through `sessionStorage`, but it is cleared when the tab or window is closed.
- The `apiClient` request interceptor automatically attaches the `X-Session-Token` header.
- Requests without an existing token, such as session creation, are called without the header because no token has been stored yet.

## 7. Write React Query Hooks

Place the query key factory in the same feature's `model` folder.

```ts
const sessionQueries = {
  all: ['session'] as const,
  current: () => [...sessionQueries.all, 'current'] as const,
};

export { sessionQueries };
```

Query hook:

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

Mutation hook:

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

## 8. Check The React Query Provider

If `QueryClientProvider` does not exist, add it under `src/app/providers` and wrap the app in `src/app/root.tsx`.

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

## 9. Connect UI

UI should use hooks only.

```tsx
import { useCurrentSessionQuery } from '@/features/session/model/useCurrentSessionQuery';

function SessionStatusView() {
  const { data, isPending, isError } = useCurrentSessionQuery();

  if (isPending) {
    return <p>Loading</p>;
  }

  if (isError) {
    return <p>Could not load the session.</p>;
  }

  return <p>{data.status}</p>;
}
```

## 10. Good/Bad

Good:

- Reuse the `apiClient` instance.
- Put app-wide API functions in `shared/apis` and feature-specific API functions in `features/{feature}/model`.
- Put app-wide DTOs in `shared/types` and feature-specific DTOs in `features/{feature}/model`.
- Put React Query hooks in `features/{feature}/model`.
- Extract `response.data` in React Query hooks.
- Structure query keys with arrays and objects.
- Handle session tokens only through the `setSessionToken` and `clearSessionToken` utilities.

Bad:

- Calling `axios`, `fetch`, or `apiClient` directly from UI components.
- Repeating baseURL, timeout, and session headers in each API function.
- Using string-composed keys such as `queryKey: ['domain-id']`.
- Creating DTO types temporarily inside UI component files.
- Using `any` for values that are unclear in the specification.
