import * as React from 'react';

import { Check } from 'lucide-react';

import { cn } from '@/shared/utils/cn';

type SurveyOptionCardVariant = 'default' | 'large' | 'skinType';

const CARD_VARIANT_CLASS_NAMES: Record<SurveyOptionCardVariant, string> = {
  default: 'border-border-subtle min-h-20 gap-3 rounded-xl border p-4',
  large: 'border-primary-200 min-h-option-card gap-4 rounded-2xl border-2 px-5 py-4',
  skinType: 'border-primary-200 min-h-option-card gap-3 rounded-xl border-2 px-5 py-4',
};

const INDICATOR_SIZE_CLASS_NAMES: Record<SurveyOptionCardVariant, string> = {
  default: 'size-5',
  large: 'size-check',
  skinType: 'size-5',
};

const INDICATOR_IDLE_CLASS_NAMES: Record<SurveyOptionCardVariant, string> = {
  default: 'border-border-action-soft',
  large: 'border-neutral-300',
  skinType: 'border-neutral-300',
};

const LABEL_CLASS_NAMES: Record<SurveyOptionCardVariant, string> = {
  default: 'typo-body1 font-bold',
  large: 'typo-label1',
  skinType: 'typo-body1 font-bold',
};

const CAPTION_CLASS_NAMES: Record<SurveyOptionCardVariant, string> = {
  default: 'typo-caption1 text-text-muted',
  large: 'typo-body1 text-text-secondary',
  skinType: 'typo-caption1 text-text-muted',
};

interface SurveyOptionCardProps {
  label: string;
  caption?: string;
  icon?: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
  className?: string;
  indicatorClassName?: string;
  labelClassName?: string;
  captionClassName?: string;
  selectionMode?: 'single' | 'multiple';
  variant?: SurveyOptionCardVariant;
}

function SurveyOptionCard({
  label,
  caption,
  icon,
  selected,
  onSelect,
  disabled = false,
  className,
  indicatorClassName,
  labelClassName,
  captionClassName,
  selectionMode = 'single',
  variant = 'default',
}: SurveyOptionCardProps) {
  const isMultiple = selectionMode === 'multiple';

  return (
    <button
      type="button"
      role={isMultiple ? 'checkbox' : 'radio'}
      aria-checked={selected}
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        'bg-surface-default box-border flex w-full items-center text-left transition-all',
        'hover:border-foreground/15 focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
        'disabled:pointer-events-none disabled:opacity-50',
        CARD_VARIANT_CLASS_NAMES[variant],
        className,
        selected && 'border-border-action',
      )}
    >
      {icon}

      <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
        <span
          className={cn(
            'text-text-primary w-full truncate',
            labelClassName ?? LABEL_CLASS_NAMES[variant],
          )}
        >
          {label}
        </span>
        {caption ? (
          <span className={cn('w-full truncate', captionClassName ?? CAPTION_CLASS_NAMES[variant])}>
            {caption}
          </span>
        ) : null}
      </span>

      <span
        aria-hidden="true"
        className={cn(
          'flex shrink-0 items-center justify-center rounded-full border-2 transition-colors',
          INDICATOR_SIZE_CLASS_NAMES[variant],
          isMultiple && 'rounded-sm',
          selected ? 'border-border-action' : INDICATOR_IDLE_CLASS_NAMES[variant],
          selected && isMultiple && 'bg-action-primary',
          indicatorClassName,
        )}
      >
        {selected ? (
          isMultiple ? (
            <Check aria-hidden="true" className="text-text-inverse size-4 stroke-[3]" />
          ) : (
            <span className="bg-action-primary size-2.5 rounded-full" />
          )
        ) : null}
      </span>
    </button>
  );
}

export { SurveyOptionCard, type SurveyOptionCardVariant };
