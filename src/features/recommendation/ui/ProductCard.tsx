import * as React from 'react';

import { Star } from 'lucide-react';

import { ProductBottle, type BottleTone, type BottleVariant } from '@/shared/ui/ProductBottle';
import { cn } from '@/shared/utils/cn';

export type ProductCardProps = React.ComponentProps<'article'> & {
  name: string;
  brand: string;
  price: number;
  rank?: number;
  rating?: number;
  image?: React.ReactNode;
  bottleVariant?: BottleVariant;
  bottleTone?: BottleTone;
  detailLabel?: string;
  detailHref?: string;
  onDetailClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const priceFormatter = new Intl.NumberFormat('ko-KR');
const maxRating = 5;

function ProductCard({
  className,
  name,
  brand,
  price,
  rank,
  rating,
  image,
  bottleVariant,
  bottleTone,
  detailLabel = '자세히',
  detailHref,
  onDetailClick,
  ...props
}: ProductCardProps) {
  const productVisual = image ?? (
    <ProductBottle variant={bottleVariant} tone={bottleTone} size={68} title={`${name} 일러스트`} />
  );
  const normalizedRating =
    typeof rating === 'number' && Number.isFinite(rating)
      ? Math.min(Math.max(rating, 0), maxRating)
      : undefined;
  const ratingLabel = normalizedRating?.toFixed(1);

  return (
    <article
      data-slot="product-card"
      className={cn(
        'bg-card text-card-foreground overflow-hidden rounded-[32px] shadow-sm ring-1 ring-[color-mix(in_srgb,var(--secondary-mist)_35%,transparent)]',
        className,
      )}
      {...props}
    >
      <div className="bg-surface-soft flex aspect-[2.2/1] items-center justify-center">
        {productVisual}
      </div>

      <div className="flex flex-col gap-2 p-5">
        <div className="flex items-center gap-2">
          {rank ? (
            <span className="typo-caption1 bg-primary text-primary-foreground rounded-full px-2 py-1">
              {rank}위
            </span>
          ) : null}
          <span className="typo-caption1 text-muted-foreground">{brand}</span>
        </div>

        <h3 className="typo-body1 font-bold">{name}</h3>

        {typeof normalizedRating === 'number' ? (
          <div className="text-muted-foreground flex items-center gap-2">
            <div className="flex items-center gap-0.5" aria-label={`평점 ${ratingLabel}`}>
              {Array.from({ length: maxRating }, (_, index) => {
                const fillRatio = Math.min(Math.max(normalizedRating - index, 0), 1);

                return (
                  <span
                    key={index}
                    aria-hidden="true"
                    className="text-muted-foreground/25 relative size-4"
                  >
                    <Star className="size-4" fill="currentColor" strokeWidth={0} />
                    {fillRatio > 0 ? (
                      <span
                        className="absolute inset-y-0 left-0 overflow-hidden text-[var(--primary-yellow)]"
                        style={{ width: `${fillRatio * 100}%` }}
                      >
                        <Star className="size-4" fill="currentColor" strokeWidth={0} />
                      </span>
                    ) : null}
                  </span>
                );
              })}
            </div>
            <span className="typo-caption1">{ratingLabel}</span>
          </div>
        ) : null}

        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="typo-title2 text-primary font-bold">{priceFormatter.format(price)}원</p>
          {detailHref ? (
            <a
              href={detailHref}
              className="typo-caption1 bg-surface-soft text-primary rounded-full px-3 py-2 font-semibold"
            >
              {detailLabel}
            </a>
          ) : onDetailClick ? (
            <button
              type="button"
              className="typo-caption1 bg-surface-soft text-primary rounded-full px-3 py-2 font-semibold"
              onClick={onDetailClick}
            >
              {detailLabel}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export { ProductCard };
