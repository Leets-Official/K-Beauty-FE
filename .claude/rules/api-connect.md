# API Connect Rules

K-Beauty 클라이언트는 React Router 7 SPA 구조이며, 서버 상태 관리는 `@tanstack/react-query`, HTTP 클라이언트는 `axios` 기반 `apiClient`를 사용한다.

## 기본 원칙

- 모든 HTTP 요청은 `src/shared/apis/apiClient.ts`의 `apiClient`를 통해 보낸다.
- 모든 서버 엔드포인트의 공통 prefix인 `/api`는 `apiClient`의 `API_PREFIX`에서만 관리한다.
- 도메인 API 함수의 path에는 `/api`를 반복하지 않는다.
- 세션처럼 앱 전역에서 쓰는 API 함수는 `src/shared/apis/{domain}.ts`에 둔다.
- 설문/추천처럼 feature 전용 API 함수는 `src/features/{feature}/model/{domain}Api.ts`에 둔다.
- 앱 전역 DTO 타입은 `src/shared/types/{domain}.ts`, feature 전용 DTO 타입은 `src/features/{feature}/model/{domain}.ts`에 둔다.
- `lib`에는 API 호출 코드를 두지 않고 순수 계산/변환/검증 함수만 둔다.
- 화면에서 API를 직접 호출하지 말고, feature의 `model`에 React Query hook을 만든 뒤 UI에서 hook을 사용한다.
- 서버 상태는 React Query로 관리하고, 설문 답변처럼 즉시 화면 흐름에 필요한 클라이언트 상태는 Zustand store에 둔다.
- 세션 기반 API는 `apiClient`의 `X-Session-Token` 자동 주입 흐름을 사용한다.
- 세션 토큰은 `sessionStorage`/`localStorage`에 저장하지 않고 런타임 메모리에만 보관한다.
- 응답 데이터를 화면 모델로 바꿔야 하면 feature의 `lib` 또는 `model`에서 변환한다.

## 폴더 위치

```text
src/
  shared/
    apis/
      apiClient.ts
      session.ts
      index.ts
    types/
      api.ts
      session.ts
  features/
    survey/
      model/
        survey.ts
        surveyApi.ts
        useStartSurveyMutation.ts
    recommendation/
      model/
        recommendation.ts
        recommendationApi.ts
        recommendationQueries.ts
        useRecommendationQuery.ts
        useCreateRecommendationMutation.ts
      lib/
        mapRecommendationResponse.ts
      ui/
        RecommendationResultPage.tsx
```

## API 함수 작성

### 지향

```ts
// src/features/recommendation/model/recommendationApi.ts
import { apiClient } from '@/shared/apis/apiClient';
import type {
  CreateRecommendationBody,
  Recommendation,
} from '@/features/recommendation/model/recommendation';

const RECOMMENDATION_BASE_PATH = '/recommendations';

const recommendationApi = {
  getById: (recommendationId: string) =>
    apiClient.get<Recommendation>(`${RECOMMENDATION_BASE_PATH}/${recommendationId}`),

  create: (body: CreateRecommendationBody) =>
    apiClient.post<Recommendation>(RECOMMENDATION_BASE_PATH, body),
};

export { recommendationApi };
```

### 지양

```ts
// UI에서 직접 axios/fetch 호출 금지
async function RecommendationResultPage() {
  const response = await axios.get('/api/recommendations/1');
  return <div>{response.data.name}</div>;
}
```

```ts
// baseURL, /api prefix, timeout, session token header를 API 함수마다 반복하지 않는다.
axios.get('/api/sessions/current', {
  headers: {
    'X-Session-Token': sessionStorage.getItem('k-beauty-session-token'),
  },
});
```

```ts
// apiClient가 이미 /api prefix를 갖고 있으므로 도메인 path에 /api를 붙이지 않는다.
apiClient.get('/api/sessions/current');
```

## React Query Hook 작성

### 지향

```ts
// src/features/recommendation/model/recommendationQueries.ts
const recommendationQueries = {
  all: ['recommendation'] as const,
  detail: (recommendationId: string) => [...recommendationQueries.all, recommendationId] as const,
};

export { recommendationQueries };
```

```ts
// src/features/recommendation/model/useRecommendationQuery.ts
import { useQuery } from '@tanstack/react-query';

import { recommendationApi } from './recommendationApi';

import { recommendationQueries } from './recommendationQueries';

function useRecommendationQuery(recommendationId: string) {
  return useQuery({
    queryKey: recommendationQueries.detail(recommendationId),
    queryFn: () => recommendationApi.getById(recommendationId).then((response) => response.data),
    enabled: Boolean(recommendationId),
  });
}

export { useRecommendationQuery };
```

```ts
// src/features/recommendation/model/useCreateRecommendationMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { recommendationApi } from './recommendationApi';

import { recommendationQueries } from './recommendationQueries';

function useCreateRecommendationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recommendationApi.create,
    onSuccess: (response) => {
      queryClient.setQueryData(recommendationQueries.detail(response.data.id), response.data);
    },
  });
}

export { useCreateRecommendationMutation };
```

### 지양

```ts
// queryKey를 문자열 하나로 뭉개지 않는다.
useQuery({
  queryKey: [`recommendation-${recommendationId}`],
  queryFn: getRecommendation,
});
```

```ts
// queryFn 안에서 UI 상태 변경이나 라우팅 같은 사이드 이펙트를 처리하지 않는다.
useQuery({
  queryKey: ['recommendation'],
  queryFn: async () => {
    const response = await recommendationApi.getById(id);
    navigate('/recommendation');
    return response.data;
  },
});
```

## Query Key 규칙

```ts
['session', 'current'];
['recommendation'];
['recommendation', recommendationId];
['products', { skinType, concern }];
```

- 도메인명을 첫 번째 key로 둔다.
- 상세 조회는 id를 두 번째 key로 둔다.
- 필터/페이지네이션 조건은 객체로 묶는다.
- 같은 feature 안에서 query key factory를 만들어 재사용한다.

## 세션 토큰 규칙

- 세션 생성 API 응답 body의 `data.sessionToken`은 `setSessionToken()`으로 메모리에 저장한다.
- 현재 세션 조회, 추천 생성/조회 등 세션이 필요한 요청은 `apiClient` 인터셉터의 자동 헤더 주입을 사용한다.
- API 함수마다 `sessionStorage`를 직접 읽지 않는다.
- `sessionStorage`/`localStorage`에 세션 토큰을 저장하지 않는다.
- 새로고침하면 메모리 토큰이 사라지므로 필요한 경우 세션 생성부터 다시 시작한다.
- 세션 만료 또는 재시작이 필요한 흐름에서는 `clearSessionToken()`을 호출한다.

```ts
import { apiClient, setSessionToken } from '@/shared/apis';

async function createSession() {
  const response = await apiClient.post('/sessions');
  const sessionToken = response.data.data.sessionToken;

  if (typeof sessionToken === 'string') {
    setSessionToken(sessionToken);
  }

  return response.data;
}
```

## 에러 처리

- 공통 네트워크 설정은 `apiClient`에서 처리한다.
- 사용자에게 보여줄 에러 메시지는 hook 또는 UI 가까운 곳에서 도메인 문맥에 맞게 정한다.
- 400, 404처럼 API 명세에 있는 에러는 hook 사용처에서 명확한 fallback UI를 둔다.
- React Query의 `isPending`, `isError`, `error`, `data` 상태를 UI 흐름에 맞게 처리한다.
