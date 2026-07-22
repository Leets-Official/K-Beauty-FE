# Code Style

## TypeScript

### Type vs Interface

- Props and object shapes → prefer `interface` so they remain extendable.
- Unions, mapped types, utility types, and tuples → use `type`.

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

- Use named exports by default for regular components and utilities.
- Default exports are allowed for framework entry files required by React Router.
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

- Write code for React 19.
- React Compiler is enabled, so most manual memoization is unnecessary.
- Do not introduce `forwardRef` in new components. If a `ref` is needed, prefer receiving it as a regular prop.
- Use `useMemo`, `useCallback`, and `React.memo` only when there is a real performance issue or a clear need for reference stability.
- Use `useRef` only for clear purposes such as DOM access, imperative handles, or mutable values that do not participate in rendering. Do not add it for simple caching or unnecessary re-render avoidance.

## Import

### Path Alias

- Prefer the `@/` alias for imports from inside `src`.
- Avoid `../` relative imports unless the file is very close in the same folder.

```ts
// Good
import { cn } from '@/shared/utils/cn';
import { Button } from '@/shared/ui/button';

// Avoid
import { cn } from '../../shared/utils/cn';
```

### Import Order

Follow Prettier and ESLint output. When manual ordering is needed, use this order:

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
- Use primitive tokens such as `bg-primary-500` only when no semantic token fits the purpose.
- Ask the user before adding or changing global tokens.

## Responsive

Write mobile-first styles.

The current project starts from a fixed mobile app width (`--app-mobile-width`). Do not invent custom breakpoints until breakpoint tokens are added.

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
