# Project Overview

K-Beauty client is a service that provides K-Beauty product recommendations based on each user's skin concerns and preferences.

The product focuses on onboarding, skin surveys, product discovery, and recommendation result screens, with a mobile-first UI.

## Tech Stack

- React 19 + TypeScript
- React Router 7, Vite 8
- React Compiler enabled via `babel-plugin-react-compiler`
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

The project is organized around React Router 7 framework mode and is split into `app`, `features`, and `shared` layers. For detailed architecture and placement rules, refer to `.claude/rules/architecture.md`.

```text
src/
  app/        # routes, root, layouts, providers, global styles
  features/   # domain feature modules
  shared/     # cross-feature shared code and reusable UI
```

## Design Tokens

Design tokens are defined in `src/app/styles/global.css`. Do not use hardcoded values; use token classes first and ask the user before adding new tokens.

For detailed token usage rules, refer to `.claude/rules/code-style.md`.

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
- React Compiler handles most memoization automatically. Do not add unnecessary `useMemo`, `useCallback`, `React.memo`, or `useRef`; use them only when there is a clear correctness or imperative DOM/state reason.

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
