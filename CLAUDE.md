# Project Overview

K-Beauty client는 사용자의 피부 고민과 선호를 바탕으로 K-Beauty 제품 추천 경험을 제공하는 서비스입니다.

온보딩, 피부 설문, 제품 탐색, 추천 결과 화면을 중심으로 구성하며, 모바일 우선 UI를 기준으로 개발합니다.

## Tech Stack

- React 19 + TypeScript
- React Router 7, Vite 8
- Tailwind CSS v4, `tw-animate-css`
- `class-variance-authority` (`cva`) for component variants
- `cn()` from `@/shared/utils/cn` — className merge utility
- Base UI, shadcn/ui style conventions
- lucide-react for icons
- tanstack query, zustand
- axios for API client
- SVGR (`*.svg?react`) for local SVG icons
- **pnpm** only

## Project Structure

프로젝트는 React Router 7 framework mode를 기준으로 `app`, `features`, `shared` 레이어로 나눕니다. 자세한 아키텍처와 배치 규칙은 `.claude/rules/architecture.md`를 참고합니다.

```text
src/
  app/        # routes, root, layouts, providers, global styles
  features/   # domain feature modules
  shared/     # cross-feature shared code and reusable UI
```

## Design Tokens

No hardcoded values. Always use token classes first. Ask the user before adding new tokens.

Design tokens are defined in `src/app/styles/global.css`.

| Category   | Class examples                                                                                     |
| ---------- | -------------------------------------------------------------------------------------------------- |
| Text       | `text-text-primary` `text-text-secondary` `text-text-muted` `text-text-inverse`                    |
| Background | `bg-background-canvas` `bg-background-subtle` `bg-surface-default` `bg-surface-petal`              |
| Action     | `bg-action-primary` `bg-action-active` `bg-action-disabled` `text-action-primary`                  |
| Accent     | `bg-accent-apricot` `bg-accent-mint` `bg-accent-lavender` `bg-accent-petal` `bg-accent-deep`       |
| Border     | `border-border-subtle` `border-border-action` `border-border-action-soft` `border-border-disabled` |
| Gradient   | `bg-button-gradient` `bg-progress-gradient`                                                        |
| Typography | `typo-title1` `typo-title2` `typo-body1` `typo-button1` `typo-button2` `typo-caption1~2`           |

Primitive token groups:

- `neutral-0~900`
- `primary-50~900`
- `apricot-100/500/700`
- `mint-100/500/700`
- `lavender-100/500/700`
- `brown-600/900`
- `alpha-primary-*`, `alpha-mint-*`

## Component Pattern

Reusable UI components live in `src/shared/ui/`.

```tsx
const variants = cva('base', {
  variants: {
    variant: {},
    size: {},
  },
  defaultVariants: {},
});

interface Props extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof variants> {}

function Component({ className, variant, size, ...props }: Props) {
  return <div className={cn(variants({ variant, size }), className)} {...props} />;
}

export { Component, variants, type Props };
```

- Always expose `className`.
- Prefer existing shared UI components before creating new ones.
- Use `cva` when a component has variants or sizes.
- Use `cn()` from `@/shared/utils/cn` for className merging.
- Keep component styles token-based.
- Avoid hardcoded color, spacing, or typography values unless there is no token yet and the user agrees to add one.
- Prefer React 19 style refs as regular props. Do not introduce new `forwardRef` unless a dependency requires it.

## Routing

- Routes are configured in `src/app/routes.ts`.
- The app currently runs as SPA mode with `ssr: false` in `react-router.config.ts`.
- Route files live under `src/app/routes/`.

## Assets

- Local SVG icons live in `src/shared/assets/icons/`.
- Use SVGR imports when a component needs to render an SVG as React:

```tsx
import Icon from '@/shared/assets/icons/example.svg?react';
```

- Shared icon exports should be added to `src/shared/assets/icons/index.ts` when needed.

## Commands

- **Install:** `pnpm install`
- **Dev:** `pnpm run dev`
- **Build:** `pnpm run build`
- **Typecheck:** `pnpm run typecheck`
- **Lint:** `pnpm run lint`
- **Format:** `pnpm run format`
- **Format check:** `pnpm run format:check`

Use **pnpm only**. Do not use npm or yarn.

## Detail Rules

Architecture, code style, component guide, state management, and git conventions are documented in `.claude/rules/`. Refer to those files for comprehensive guidance.
