import * as React from 'react';

import { cn } from '@/shared/utils/cn';

const bottleToneMap = {
  mint: {
    fill: 'var(--primary-mint)',
    label: 'var(--surface)',
    cap: 'var(--text-subtle)',
  },
  lavender: {
    fill: 'var(--primary-lavender)',
    label: 'var(--surface)',
    cap: 'var(--text-subtle)',
  },
  apricot: {
    fill: 'var(--primary-yellow)',
    label: 'var(--surface)',
    cap: 'var(--text-subtle)',
  },
  coral: {
    fill: 'var(--primary-pink)',
    label: 'var(--surface)',
    cap: 'var(--text-subtle)',
  },
} as const;

export const bottleTones = Object.keys(bottleToneMap) as BottleTone[];
export const bottleVariants = ['toner', 'serum'] as const;

export type BottleTone = keyof typeof bottleToneMap;
export type BottleVariant = (typeof bottleVariants)[number];

type BottlePalette = (typeof bottleToneMap)[BottleTone];

export type ProductBottleProps = Omit<React.ComponentProps<'svg'>, 'color'> & {
  variant?: BottleVariant;
  tone?: BottleTone;
  size?: number | string;
  title?: string;
};

function TonerBottle({ palette }: { palette: BottlePalette }) {
  return (
    <>
      {/* cap knob */}
      <rect x="27" y="4" width="10" height="4" rx="2" fill={palette.cap} />
      {/* cap */}
      <rect x="24" y="7" width="16" height="9" rx="3" fill={palette.cap} />
      {/* neck */}
      <rect x="26" y="14" width="12" height="5" fill={palette.fill} />
      {/* body */}
      <rect x="12" y="17" width="40" height="42" rx="12" fill={palette.fill} />
      {/* label */}
      <rect x="19" y="27" width="26" height="17" rx="6" fill={palette.label} opacity="0.55" />
      <circle cx="32" cy="35.5" r="4" fill={palette.fill} opacity="0.35" />
      {/* sheen */}
      <path
        d="M18 24c0-2.8 2.2-5 5-5h3v38h-3c-2.8 0-5-2.2-5-5V24Z"
        fill={palette.label}
        opacity="0.28"
      />
    </>
  );
}

function SerumBottle({ palette }: { palette: BottlePalette }) {
  return (
    <>
      {/* dropper bulb */}
      <rect x="28" y="3" width="8" height="10" rx="4" fill={palette.cap} />
      {/* dropper collar */}
      <rect x="29.5" y="12" width="5" height="7" rx="1.5" fill={palette.cap} />
      {/* body */}
      <rect x="19" y="18" width="26" height="42" rx="9" fill={palette.fill} />
      {/* label */}
      <rect x="24" y="27" width="16" height="18" rx="4" fill={palette.label} opacity="0.55" />
      {/* sheen */}
      <path
        d="M23.5 25c0-2 1.6-3.6 3.6-3.6h1.4v37.2h-1.4c-2 0-3.6-1.6-3.6-3.6V25Z"
        fill={palette.label}
        opacity="0.28"
      />
    </>
  );
}

function ProductBottle({
  className,
  variant,
  tone = 'mint',
  size = 56,
  title,
  role,
  'aria-hidden': ariaHidden,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: ProductBottleProps) {
  const titleId = React.useId();
  const palette = bottleToneMap[tone];
  const isDecorative = !title && !ariaLabel && !ariaLabelledBy;

  return (
    <svg
      data-slot="product-bottle"
      data-variant={variant}
      data-tone={tone}
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role={role ?? (isDecorative ? undefined : 'img')}
      aria-hidden={ariaHidden ?? (isDecorative ? true : undefined)}
      aria-label={ariaLabel}
      aria-labelledby={title ? titleId : ariaLabelledBy}
      className={cn('inline-block shrink-0 align-middle', className)}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      {variant === 'serum' ? <SerumBottle palette={palette} /> : <TonerBottle palette={palette} />}
    </svg>
  );
}

export { ProductBottle };
