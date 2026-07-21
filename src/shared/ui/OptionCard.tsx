import * as React from 'react';

import { cn } from '@/shared/utils/cn';

export type OptionCardProps = Omit<
  React.ComponentProps<'button'>,
  'aria-checked' | 'aria-pressed' | 'role'
> & {
  label: string;
  icon: React.ReactNode;
  caption?: string;
  selected?: boolean;
  selectionMode?: 'single' | 'multiple';
};

function OptionCard({
  className,
  label,
  icon,
  caption,
  selected = false,
  selectionMode = 'multiple',
  type,
  ...props
}: OptionCardProps) {
  const isSingleSelection = selectionMode === 'single';

  return (
    <button
      data-slot="option-card"
      type={type ?? 'button'}
      role={isSingleSelection ? 'radio' : undefined}
      aria-checked={isSingleSelection ? selected : undefined}
      aria-pressed={isSingleSelection ? undefined : selected}
      className={cn(
        'bg-surface-default border-border-subtle box-border flex h-[62px] w-[246px] items-center gap-[10px] rounded-[24px] border p-3 text-left transition-all',
        'hover:border-foreground/15 focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
        'disabled:pointer-events-none disabled:opacity-50',
        selected && 'border-border-action',
        className,
      )}
      {...props}
    >
      {icon}
      <span className="flex h-[30px] min-w-0 flex-1 flex-col items-start">
        <span className="text-text-primary h-[14px] w-full truncate font-['Outfit'] text-[11px] leading-[14px] font-semibold">
          {label}
        </span>
        {caption ? (
          <span className="text-text-muted h-[16px] w-full truncate pt-0.5 font-['Menlo'] text-[9px] leading-[14px] font-normal">
            {caption}
          </span>
        ) : null}
      </span>
    </button>
  );
}

export { OptionCard };
