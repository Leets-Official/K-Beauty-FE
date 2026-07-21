# Architecture

K-Beauty client는 React Router 7 framework mode를 기반으로 구성합니다.

최상위 코드는 `app`, `features`, `shared` 3개 레이어로 나누며, 라우팅과 앱 설정은 `app`, 도메인 기능은 `features`, 여러 기능에서 재사용하는 코드는 `shared`에 둡니다.

## Folder Structure

```text
src/
  app/                          # React Router framework mode app layer
    routes/                     # 실제 URL 경로와 연결되는 route files
      onboarding/
        index.tsx
    layouts/                    # 라우트/앱 레이아웃 컴포넌트
    providers/                  # React Query, 전역 상태 Provider 등 앱 전역 Provider
    styles/
      global.css                # 전역 CSS, Tailwind, shadcn 스타일, design tokens
    root.tsx                    # HTML 문서 구조와 전역 스크립트 설정
    routes.ts                   # React Router 라우트 설정

  features/                     # 도메인/기능 단위 모듈
    onboarding/
      ui/                       # 화면에 보이는 feature 컴포넌트
      model/                    # 상태, store, feature 내부 타입, 데이터 흐름
      lib/                      # 계산, 변환, 검증 등 순수 함수
    survey/
      ui/
      model/
      lib/
    product/
      ui/
      model/
      lib/
    recommendation/
      ui/
      model/
      lib/

  shared/                       # 여러 feature에서 재사용되는 공통 코드
    apis/                       # 공통 API 클라이언트, axios 인스턴스
    assets/
      icons/                    # SVG 아이콘, 정적 아이콘 에셋
        index.ts                # 아이콘 re-export
    constants/                  # 앱 전역 상수
    hooks/                      # 여러 feature에서 재사용되는 공통 hook
    mocks/                      # mock 데이터, MSW 핸들러 등
    stores/                     # 앱 전역 상태 store
    types/                      # 여러 feature에서 공유하는 타입
    ui/                         # shadcn/Base UI 기반 공통 UI 컴포넌트
    utils/                      # 공통 유틸 함수
```

## Core Rules

### Layer Responsibilities

- `app/`은 라우팅, 앱 부트스트랩, 전역 provider, 전역 스타일만 담당합니다.
- `features/`는 도메인별 화면 조각과 해당 기능 내부의 상태/타입/순수 로직을 담당합니다.
- `shared/`는 여러 feature에서 재사용되는 코드만 둡니다.

### Component Placement

- 특정 도메인에서만 쓰는 컴포넌트 → `features/{feature}/ui/`
- 여러 feature에서 재사용하는 UI → `shared/ui/`
- 라우트와 직접 연결되는 페이지 컴포넌트 → `app/routes/`
- 앱 전체 레이아웃 → `app/layouts/`

### Feature Folder Convention

각 feature는 필요한 범위에서 아래 구조를 사용합니다.

```text
features/{feature}/
  ui/       # 화면에 렌더링되는 컴포넌트
  model/    # 상태, store, feature 내부 타입, 데이터 흐름
  lib/      # 계산, 변환, 검증 등 순수 함수
```

- `ui/`에서 서버/API 호출 세부 구현을 직접 늘리지 않습니다.
- `lib/`는 React에 의존하지 않는 순수 로직을 우선합니다.
- feature 내부에서만 쓰는 타입은 `model/`에 두고, 여러 feature가 공유하면 `shared/types/`로 올립니다.

### Shared Folder Convention

- `shared/apis/` — 공통 API 클라이언트, axios 인스턴스, 여러 feature에서 공유하는 API helpers
- `shared/assets/` — 이미지, 아이콘, SVG 등 정적 에셋
- `shared/constants/` — 앱 전역 상수
- `shared/hooks/` — 여러 feature에서 재사용하는 custom hook
- `shared/mocks/` — mock 데이터, MSW 핸들러 등
- `shared/stores/` — 앱 전역 Zustand store
- `shared/types/` — 여러 feature에서 공유하는 TypeScript 타입
- `shared/ui/` — 공통 UI 컴포넌트
- `shared/utils/` — 공통 유틸 함수

### Routing

- 라우트 설정은 `src/app/routes.ts`에서 관리합니다.
- 실제 URL과 연결되는 route file은 `src/app/routes/` 아래에 둡니다.
- React Router 7 framework mode의 파일/설정 방식을 따릅니다.
- 현재 앱은 `react-router.config.ts`에서 `ssr: false`로 SPA 모드로 동작합니다.

### Re-export

- 공통 UI 컴포넌트가 늘어나면 `shared/ui/index.ts`를 만들어 re-export하는 방식을 우선합니다.
- 아이콘은 `shared/assets/icons/index.ts`에서 re-export합니다.
- route files는 barrel export 대상이 아닙니다.

```ts
// Good
import { ProductTonerIcon } from '@/shared/assets/icons';

// Avoid
import ProductTonerIcon from '@/shared/assets/icons/product_toner.svg?react';
```

### Data Flow

- Server state(fetch/mutate) → `@tanstack/react-query` + `shared/apis/`
- Client global state → Zustand (`shared/stores/`)
- Feature-local state and types → `features/{feature}/model/`
- Local component state → `useState`
- Pure calculations, formatters, validators → `features/{feature}/lib/` or `shared/utils/`

### Design Tokens

- 전역 design token은 `src/app/styles/global.css`에서 관리합니다.
- 색상, typography, gradient 등은 token class를 우선 사용합니다.
- hardcoded color/spacing/typography value가 필요하면 먼저 사용자에게 새 토큰 추가 여부를 확인합니다.
