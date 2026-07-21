# Code Style

## TypeScript

### Type vs Interface

- Props, object shapes → `interface`를 우선 사용합니다. 확장 가능성을 열어둡니다.
- Union, mapped type, utility type, tuple → `type`을 사용합니다.

```ts
// Good
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

type Status = 'idle' | 'loading' | 'success' | 'error';

// Avoid
type ButtonProps = {
  variant?: string;
};
```

### Type Export

- 일반 컴포넌트와 유틸은 named export를 기본으로 합니다.
- route/root 같은 framework entry file은 React Router 요구사항에 따라 default export를 허용합니다.
  - Includes: `src/app/root.tsx`, `src/app/routes/**/index.tsx`, route module files

```tsx
// shared/ui/Button.tsx
export { Button, buttonVariants, type ButtonProps };

// app/routes/onboarding/index.tsx
// Route files are an exception.
export default function OnboardingRoute() {
  return <div />;
}
```

### React 19

- React 19 기준으로 작성합니다.
- 새 컴포넌트에 `forwardRef`를 도입하지 않습니다. `ref`가 필요하면 일반 prop처럼 받는 방식을 우선합니다.
- `useMemo`, `useCallback`, `React.memo`는 실제 성능 문제가 있거나 참조 안정성이 필요한 경우에만 사용합니다.

## Import

### Path Alias

- `src` 내부 모듈 import는 `@/` alias를 우선 사용합니다.
- 같은 폴더의 아주 가까운 파일이 아니면 `../` 상대 경로 import를 피합니다.

```ts
// Good
import { cn } from '@/shared/utils/cn';
import { Button } from '@/shared/ui/button';

// Avoid
import { cn } from '../../shared/utils/cn';
```

### Import Order

Prettier와 ESLint의 정렬 결과를 따릅니다. 수동 정렬이 필요하면 아래 순서를 기준으로 합니다.

1. React
2. external libraries
3. internal modules (`@/`)
4. type-only imports (`import type`)

```ts
import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/utils/cn';
```

## Naming Conventions

| Item             | Rule                         | Example                         |
| ---------------- | ---------------------------- | ------------------------------- |
| Component        | PascalCase                   | `Button`, `ProductCard`         |
| Hook             | camelCase + `use` prefix     | `useSurveyStore`, `useDebounce` |
| Utility function | camelCase                    | `cn`, `formatPrice`             |
| Constant         | UPPER_SNAKE_CASE             | `MAX_RATING`                    |
| Type / Interface | PascalCase                   | `ButtonProps`, `BottleTone`     |
| SVG icon export  | PascalCase + `Icon` suffix   | `ProductTonerIcon`              |
| Zustand store    | `use{Name}Store`             | `useSurveyStore`                |
| cva variants     | `{componentName}Variants`    | `buttonVariants`                |
| data-slot        | kebab-case component name    | `data-slot="product-card"`      |
| CSS variables    | kebab-case semantic token    | `--text-primary`                |
| Tailwind tokens  | category + semantic modifier | `bg-action-primary`             |

## File Naming

| File Type               | Rule                          | Example                        |
| ----------------------- | ----------------------------- | ------------------------------ |
| Route file              | React Router route convention | `index.tsx`                    |
| Component               | PascalCase.tsx for new files  | `ProductCard.tsx`              |
| Existing shared UI file | Preserve current lowercase    | `button.tsx`, `badge.tsx`      |
| Hook                    | camelCase.ts                  | `useDebounce.ts`               |
| Store                   | camelCase.ts                  | `useSurveyStore.ts`            |
| Utility / Library       | camelCase.ts                  | `cn.ts`, `format.ts`           |
| SVG asset               | snake_case.svg                | `product_toner.svg`            |
| Barrel export           | index.ts                      | `shared/assets/icons/index.ts` |

## Tailwind CSS

- Class order is auto-sorted by `prettier-plugin-tailwindcss`.
- Use `cn()` for conditional classes.
- Use design token classes first. Do not hardcode colors, spacing, or typography unless the user approved a new token.

```tsx
// Good
<div className={cn('bg-surface-default text-text-primary', selected && 'border-border-action')} />

// Avoid
<div className={`bg-[#fff8f5] ${selected ? 'border-[#f77b6a]' : ''}`} />
```

### Design Token Usage

- Color tokens are defined in `src/app/styles/global.css`.
- Prefer semantic tokens such as `text-text-primary`, `bg-background-canvas`, `border-border-subtle`.
- Use primitive tokens such as `bg-primary-500` only when a semantic token does not fit the purpose.
- Ask the user before adding or changing global tokens.

## Responsive

Mobile first로 작성합니다.

현재 프로젝트는 고정 모바일 앱 폭(`--app-mobile-width`)을 기준으로 시작합니다. breakpoint token이 추가되기 전까지 임의의 custom breakpoint를 만들지 않습니다.

```tsx
// Good
<main className="mx-auto min-h-dvh w-full max-w-[var(--app-mobile-width)]" />
```

## Component Guidelines

- Reusable UI components live in `src/shared/ui/`.
- Feature-specific UI components live in `src/features/{feature}/ui/`.
- Components should expose `className`.
- Use `cva` when a component has variant/size combinations.
- Keep accessibility attributes explicit when state is represented visually (`aria-pressed`, `aria-checked`, `aria-label`, etc.).

```tsx
const badgeVariants = cva('inline-flex items-center', {
  variants: {
    variant: {
      mint: 'bg-badge-mint-soft text-text-mint',
    },
  },
  defaultVariants: {
    variant: 'mint',
  },
});

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants, type BadgeProps };
```

## Formatting

- Use Prettier for formatting.
- Tailwind class sorting is handled by `prettier-plugin-tailwindcss`.
- Run `pnpm run format:check` before finishing larger changes.

## Comments

- Prefer self-explanatory code.
- Add comments only when they explain a non-obvious decision, constraint, or workaround.
- Do not add comments that simply restate the code.
