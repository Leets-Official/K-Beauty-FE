# Architecture

The K-Beauty client is built on React Router 7 framework mode.

Top-level source code is split into three layers: `app`, `features`, and `shared`. Routing and application setup belong in `app`, domain-specific functionality belongs in `features`, and code reused across multiple features belongs in `shared`.

## Folder Structure

```text
src/
  app/                          # React Router framework mode app layer
    routes/                     # Route files connected to actual URL paths
      onboarding/
        index.tsx
    layouts/                    # Route/app layout components
    providers/                  # App-wide providers such as React Query and global state providers
    styles/
      global.css                # Global CSS, Tailwind, shadcn styles, design tokens
    root.tsx                    # HTML document structure and global scripts
    routes.ts                   # React Router route configuration

  features/                     # Domain/feature modules
    onboarding/
      ui/                       # Feature components rendered on screen
      model/                    # State, stores, feature-local types, data flow
      lib/                      # Pure functions for calculation, transformation, validation
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

  shared/                       # Shared code reused across features
    apis/                       # Shared API clients, axios instances
    assets/
      icons/                    # SVG icons and static icon assets
        index.ts                # Icon re-exports
    constants/                  # App-wide constants
    hooks/                      # Shared hooks reused across features
    mocks/                      # Mock data, MSW handlers, etc.
    stores/                     # App-wide Zustand stores
    types/                      # Types shared across features
    ui/                         # Shared UI components based on shadcn/Base UI conventions
    utils/                      # Shared utility functions
```

## Core Rules

### Layer Responsibilities

- `app/` is responsible only for routing, app bootstrap, app-wide providers, and global styles.
- `features/` owns domain-specific UI pieces, feature-local state/types, and pure logic.
- `shared/` contains only code reused by multiple features.

### Component Placement

- Components used only in one domain → `features/{feature}/ui/`
- UI reused across multiple features → `shared/ui/`
- Page components directly connected to routes → `app/routes/`
- App-wide layouts → `app/layouts/`

### Feature Folder Convention

Use this structure for each feature as needed.

```text
features/{feature}/
  ui/       # Components rendered on screen
  model/    # State, stores, feature-local types, data flow
  lib/      # Pure functions for calculation, transformation, validation
```

- Do not grow detailed server/API implementation inside `ui/`.
- Prefer React-independent pure logic in `lib/`.
- Keep feature-only types in `model/`; move types shared by multiple features to `shared/types/`.

### Shared Folder Convention

- `shared/apis/` — shared API clients, axios instances, API helpers reused across features
- `shared/assets/` — static assets such as images, icons, and SVGs
- `shared/constants/` — app-wide constants
- `shared/hooks/` — custom hooks reused across features
- `shared/mocks/` — mock data, MSW handlers, etc.
- `shared/stores/` — app-wide Zustand stores
- `shared/types/` — TypeScript types shared across features
- `shared/ui/` — shared UI components
- `shared/utils/` — shared utility functions

### Routing

- Route configuration is managed in `src/app/routes.ts`.
- Route files connected to actual URL paths live under `src/app/routes/`.
- Follow React Router 7 framework mode conventions for route files and configuration.
- The app currently runs in SPA mode with `ssr: false` in `react-router.config.ts`.

### Re-export

- When shared UI components grow, prefer adding `shared/ui/index.ts` for re-exports.
- Icons must be re-exported from `shared/assets/icons/index.ts`.
- Direct `*.svg?react` imports should be used only inside the icon barrel file; application code should import from `@/shared/assets/icons`.
- Route files are not barrel-export targets.

```ts
// Good
import { ProductTonerIcon } from '@/shared/assets/icons';

// Avoid
import ProductTonerIcon from '@/shared/assets/icons/product_toner.svg?react';
```

### Data Flow

- Server state (fetch/mutate) → `@tanstack/react-query` + `shared/apis/`
- Client global state → Zustand (`shared/stores/`)
- Feature-local state and types → `features/{feature}/model/`
- Local component state → `useState`
- Pure calculations, formatters, validators → `features/{feature}/lib/` or `shared/utils/`

### Design Tokens

- Global design tokens are managed in `src/app/styles/global.css`.
- Prefer token classes for color, typography, gradients, and related styling.
- Ask the user before adding a new token when a hardcoded color, spacing, or typography value seems necessary.
