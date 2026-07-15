import * as React from 'react';

import BlobCharacterBaseIcon from '@/shared/assets/icons/blob_character.svg?react';
import BubbleIcon from '@/shared/assets/icons/bubble.svg?react';
import CalmFaceIcon from '@/shared/assets/icons/calm_face.svg?react';
import CuriousFaceIcon from '@/shared/assets/icons/curious_face.svg?react';
import DropIcon from '@/shared/assets/icons/drop.svg?react';
import HappyFaceIcon from '@/shared/assets/icons/happy_face.svg?react';
import LeafIcon from '@/shared/assets/icons/leaf.svg?react';
import SleepyFaceIcon from '@/shared/assets/icons/sleepy_face.svg?react';
import SparkIcon from '@/shared/assets/icons/spark.svg?react';
import SwirlIcon from '@/shared/assets/icons/swirl.svg?react';
import WorriedFaceIcon from '@/shared/assets/icons/worried_face.svg?react';
import { cn } from '@/shared/utils/cn';

type SvgIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const blobBasePalette = {
  face: 'var(--text)',
  shadow: 'var(--text-subtle)',
} as const;

const blobVariantMap = {
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

const faceIconMap: Record<BlobExpression, SvgIcon> = {
  happy: HappyFaceIcon,
  calm: CalmFaceIcon,
  curious: CuriousFaceIcon,
  worried: WorriedFaceIcon,
  sleepy: SleepyFaceIcon,
};

const detailIconMap: Record<Exclude<BlobDetail, 'none'>, SvgIcon> = {
  drop: DropIcon,
  spark: SparkIcon,
  leaf: LeafIcon,
  bubble: BubbleIcon,
  swirl: SwirlIcon,
};

export const blobVariants = Object.keys(blobVariantMap) as BlobVariant[];
export const blobExpressions = ['happy', 'calm', 'curious', 'worried', 'sleepy'] as const;
export const blobDetails = ['none', 'drop', 'spark', 'leaf', 'bubble', 'swirl'] as const;

export type BlobVariant = keyof typeof blobVariantMap;
export type BlobExpression = (typeof blobExpressions)[number];
export type BlobDetail = (typeof blobDetails)[number];

type BlobPalette = (typeof blobVariantMap)[BlobVariant];

export type BlobCharacterProps = Omit<React.ComponentProps<'svg'>, 'color'> & {
  variant?: BlobVariant;
  expression?: BlobExpression;
  detail?: BlobDetail;
  fillColor?: string;
  expressionColor?: string;
  detailColor?: string;
  size?: number | string;
  title?: string;
};

// The `drop` mark echoes the body fill, `bubble` sits on the surface color, the
// rest use the variant's accent. `detailColor` overrides all of them.
function resolveDetailColor(
  detail: Exclude<BlobDetail, 'none'>,
  palette: BlobPalette,
  detailColor?: string,
): string {
  if (detailColor) return detailColor;
  if (detail === 'drop') return palette.fill;
  if (detail === 'bubble') return 'var(--surface)';
  return palette.detail;
}

function hasOwnKey<T extends object>(object: T, key: PropertyKey): key is keyof T {
  return Object.prototype.hasOwnProperty.call(object, key);
}

function BlobCharacter({
  className,
  variant = 'radiant',
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
  const resolvedVariant = hasOwnKey(blobVariantMap, variant) ? variant : 'radiant';
  const resolvedExpression = hasOwnKey(faceIconMap, expression) ? expression : 'happy';
  const resolvedDetail = detail === 'none' || hasOwnKey(detailIconMap, detail) ? detail : 'none';
  const palette = blobVariantMap[resolvedVariant];
  const bodyFill = fillColor ?? palette.fill;
  const faceColor = expressionColor ?? palette.face;
  const isDecorative = !title && !ariaLabel && !ariaLabelledBy;

  const FaceIcon = faceIconMap[resolvedExpression];
  const DetailIcon = resolvedDetail === 'none' ? null : detailIconMap[resolvedDetail];
  const resolvedDetailColor =
    resolvedDetail === 'none'
      ? undefined
      : resolveDetailColor(resolvedDetail, palette, detailColor);

  return (
    <svg
      data-slot="blob-character"
      data-variant={resolvedVariant}
      data-expression={resolvedExpression}
      data-detail={resolvedDetail}
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
      <BlobCharacterBaseIcon
        width={64}
        height={64}
        aria-hidden="true"
        style={
          {
            '--blob-fill': bodyFill,
            '--blob-highlight': palette.highlight,
            '--blob-shadow': palette.shadow,
          } as React.CSSProperties
        }
      />
      {DetailIcon ? (
        <DetailIcon x={0} y={0} width={64} height={64} style={{ color: resolvedDetailColor }} />
      ) : null}
      <FaceIcon x={0} y={0} width={64} height={64} style={{ color: faceColor }} />
    </svg>
  );
}

export { BlobCharacter };
