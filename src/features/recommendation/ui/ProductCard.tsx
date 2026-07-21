import * as React from 'react';

import { Star } from 'lucide-react';

import { cn } from '@/shared/utils/cn';
import { formatPrice, MAX_RATING, normalizeRating } from '@/shared/utils/format';

type ProductCardDetailActionProps =
  | {
      detailHref: string;
      onDetailClick?: never;
    }
  | {
      detailHref?: never;
      onDetailClick: React.MouseEventHandler<HTMLButtonElement>;
    };

export type ProductCardProps = React.ComponentProps<'article'> &
  ProductCardDetailActionProps & {
    name: string;
    brand: string;
    price: number;
    rank?: number;
    rating?: number;
    image?: React.ReactNode;
  };

function ProductCard({
  className,
  name,
  brand,
  price,
  rank,
  rating,
  image,
  detailHref,
  onDetailClick,
  ...props
}: ProductCardProps) {
  const normalizedRating = normalizeRating(rating);
  const ratingLabel = normalizedRating?.toFixed(1);

  return (
    <article
      data-slot="product-card"
      className={cn(
        'bg-card text-card-foreground ring-border-subtle overflow-hidden rounded-[32px] shadow-sm ring-1',
        className,
      )}
      {...props}
    >
      <div className="bg-background-subtle flex aspect-[2.2/1] items-center justify-center">
        {image}
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
              {Array.from({ length: MAX_RATING }, (_, index) => {
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
                        className="text-accent-apricot absolute inset-y-0 left-0 overflow-hidden"
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

        <p className="typo-title2 text-primary mt-2 font-bold">{formatPrice(price)}</p>

        {detailHref !== undefined ? (
          <a
            href={detailHref}
            className="text-primary mt-1 self-start text-sm font-semibold underline-offset-4 hover:underline"
          >
            자세히
          </a>
        ) : (
          <button
            type="button"
            onClick={onDetailClick}
            className="text-primary mt-1 self-start text-sm font-semibold underline-offset-4 hover:underline"
          >
            자세히
          </button>
        )}
      </div>
    </article>
  );
}

export { ProductCard };
