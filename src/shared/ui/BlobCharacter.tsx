import * as React from 'react';

import { cn } from '@/shared/utils/cn';

const blobBasePalette = {
  face: 'var(--text)',
  shadow: 'var(--text-subtle)',
} as const;

const blobToneMap = {
  radiant: {
    ...blobBasePalette,
    fill: 'var(--primary-pink)',
    highlight: 'var(--surface-tint)',
    detail: 'var(--primary-yellow)',
  },
  apricot: {
    ...blobBasePalette,
    fill: 'var(--primary-yellow)',
    highlight: 'var(--surface)',
    detail: 'var(--primary-pink)',
  },
  mint: {
    ...blobBasePalette,
    fill: 'var(--primary-mint)',
    highlight: 'var(--surface)',
    detail: 'var(--primary-pink)',
  },
  lavender: {
    ...blobBasePalette,
    fill: 'var(--primary-lavender)',
    highlight: 'var(--surface)',
    detail: 'var(--primary-pink)',
  },
  petal: {
    ...blobBasePalette,
    fill: 'var(--surface-tint)',
    highlight: 'var(--surface)',
    detail: 'var(--primary-mint)',
  },
  warm: {
    ...blobBasePalette,
    fill: 'var(--surface-soft)',
    highlight: 'var(--surface)',
    detail: 'var(--primary-pink)',
  },
} as const;

export const blobTones = Object.keys(blobToneMap) as BlobTone[];
export const blobExpressions = ['happy', 'calm', 'curious', 'worried', 'sleepy'] as const;
export const blobDetails = ['none', 'drop', 'spark', 'leaf', 'bubble', 'swirl'] as const;

export type BlobTone = keyof typeof blobToneMap;
export type BlobExpression = (typeof blobExpressions)[number];
export type BlobDetail = (typeof blobDetails)[number];

type BlobPalette = {
  fill: string;
  highlight: string;
  detail: string;
  face: string;
  shadow: string;
};

export type BlobCharacterProps = Omit<React.ComponentProps<'svg'>, 'color'> & {
  tone?: BlobTone;
  expression?: BlobExpression;
  detail?: BlobDetail;
  fillColor?: string;
  expressionColor?: string;
  detailColor?: string;
  size?: number | string;
  title?: string;
};

function BlobFace({ expression, palette }: { expression: BlobExpression; palette: BlobPalette }) {
  switch (expression) {
    case 'calm':
      return (
        <>
          <circle cx="24" cy="29" r="2.1" fill={palette.face} />
          <circle cx="41" cy="29" r="2.1" fill={palette.face} />
          <path
            d="M26.5 39.5c3.6 2.3 7.8 2.3 11.1 0"
            fill="none"
            stroke={palette.face}
            strokeLinecap="round"
            strokeWidth="2.4"
          />
        </>
      );
    case 'curious':
      return (
        <>
          <circle cx="24" cy="31" r="2.5" fill={palette.face} />
          <circle cx="42" cy="28.5" r="2.1" fill={palette.face} />
          <circle cx="23.25" cy="30.25" r="0.65" fill="var(--surface)" />
          <circle cx="41.35" cy="27.85" r="0.55" fill="var(--surface)" />
          <path
            d="M27 39.6c3.4 3 8.2 2.5 11.4-.9"
            fill="none"
            stroke={palette.face}
            strokeLinecap="round"
            strokeWidth="2.4"
          />
        </>
      );
    case 'worried':
      return (
        <>
          <circle cx="24" cy="30" r="2.1" fill={palette.face} />
          <circle cx="41" cy="30" r="2.1" fill={palette.face} />
          <path
            d="M26.5 43c3.1-3.5 8.6-3.5 11.7 0"
            fill="none"
            stroke={palette.face}
            strokeLinecap="round"
            strokeWidth="2.4"
          />
        </>
      );
    case 'sleepy':
      return (
        <>
          <path
            d="M21.5 30h5"
            fill="none"
            stroke={palette.face}
            strokeLinecap="round"
            strokeWidth="2.4"
          />
          <path
            d="M39 30h5"
            fill="none"
            stroke={palette.face}
            strokeLinecap="round"
            strokeWidth="2.4"
          />
          <path
            d="M28.5 40h8"
            fill="none"
            stroke={palette.face}
            strokeLinecap="round"
            strokeWidth="2.4"
          />
        </>
      );
    case 'happy':
    default:
      return (
        <>
          <circle cx="24" cy="30" r="2.1" fill={palette.face} />
          <circle cx="41" cy="30" r="2.1" fill={palette.face} />
          <circle cx="23.35" cy="29.35" r="0.55" fill="var(--surface)" />
          <circle cx="40.35" cy="29.35" r="0.55" fill="var(--surface)" />
          <path
            d="M24.5 39c4.5 5 12.5 5 17 0"
            fill="none"
            stroke={palette.face}
            strokeLinecap="round"
            strokeWidth="2.6"
          />
        </>
      );
  }
}

function BlobDetailMark({
  detail,
  palette,
  detailColor,
}: {
  detail: BlobDetail;
  palette: BlobPalette;
  detailColor?: string;
}) {
  switch (detail) {
    case 'none':
    default:
      return null;
    case 'drop':
      return (
        <path
          d="M49.745 6.445c0 0-4.225 6.76-4.225 9.295 0 2.788 2.028 4.225 4.225 4.225s4.225-1.437 4.225-4.225c0-2.535-4.225-9.295-4.225-9.295Z"
          fill={detailColor ?? palette.fill}
          opacity="0.85"
        />
      );
    case 'spark':
      return (
        <g fill="none" stroke={detailColor ?? palette.detail} strokeLinecap="round">
          <path d="M50.59 6.445v5.915" strokeWidth="1.69" />
          <path d="M47.633 9.402h5.915" strokeWidth="1.69" />
          <path d="m48.478 7.29 4.225 4.225" strokeWidth="1.268" />
          <path d="m52.703 7.29-4.225 4.225" strokeWidth="1.268" />
        </g>
      );
    case 'leaf':
      return (
        <path
          d="M37.05 8.45c4.55-2.6 8.45 3.25 3.9 7.15-1.95 1.95-4.55 0-3.9-7.15Z"
          fill={detailColor ?? palette.detail}
          opacity="0.7"
          transform="translate(-1.8 -2.85) scale(1.3)"
        />
      );
    case 'bubble':
      return (
        <g
          fill={detailColor ?? 'var(--surface)'}
          opacity="0.55"
          transform="translate(-1.8 -2.85) scale(1.3)"
        >
          <circle cx="40.3" cy="10.4" r="2.925" />
          <circle cx="44.2" cy="14.3" r="1.82" />
          <circle cx="40.95" cy="15.6" r="1.17" />
        </g>
      );
    case 'swirl':
      return (
        <path
          d="M37.05 9.1c2.6-2.6 6.5-.65 5.2 2.6-1.3 3.25-4.55 2.6-5.2 0"
          fill="none"
          stroke={detailColor ?? palette.detail}
          strokeLinecap="round"
          strokeWidth="1.43"
          transform="translate(-1.8 -2.85) scale(1.3)"
        />
      );
  }
}

function BlobCharacter({
  className,
  tone = 'radiant',
  expression = 'happy',
  detail = 'none',
  fillColor,
  expressionColor,
  detailColor,
  size = 56,
  title,
  role,
  'aria-hidden': ariaHidden,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: BlobCharacterProps) {
  const titleId = React.useId();
  const defaultPalette = blobToneMap[tone];
  const palette: BlobPalette = {
    ...defaultPalette,
    fill: fillColor ?? defaultPalette.fill,
    face: expressionColor ?? defaultPalette.face,
  };
  const isDecorative = !title && !ariaLabel && !ariaLabelledBy;

  return (
    <svg
      data-slot="blob-character"
      data-tone={tone}
      data-expression={expression}
      data-detail={detail}
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
      <path
        d="M32.3 6.1c13.1 0 24 8.8 25.4 21.9 1.3 12.3-6.6 25.4-19.3 28.5-12.8 3.1-27-2.6-31-15.2C3.5 29.2 9.2 15.4 20.5 9.5c3.7-2 7.6-3.2 11.8-3.4Z"
        fill={palette.shadow}
        opacity="0.34"
        transform="translate(0 3)"
      />
      <path
        d="M32.3 5.6c12.8 0 23.8 8.8 25.2 21.5 1.4 12.4-6.8 24.7-19.4 27.8-12.7 3.1-26.7-2.3-30.6-14.7C3.7 28 9.4 14.9 20.5 9.1c3.7-2 7.6-3.2 11.8-3.5Z"
        fill={palette.fill}
      />
      <ellipse
        cx="23.6"
        cy="17"
        rx="8.9"
        ry="4.5"
        fill={palette.highlight}
        opacity="0.9"
        transform="rotate(-27 23.6 17)"
      />
      <BlobDetailMark detail={detail} palette={palette} detailColor={detailColor} />
      <BlobFace expression={expression} palette={palette} />
    </svg>
  );
}

export { BlobCharacter };
