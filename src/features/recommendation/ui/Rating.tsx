import { formatRatingStars } from '@/features/recommendation/lib/formatRatingStars';
import { cn } from '@/shared/utils/cn';

import type { RecommendationProduct } from '@/features/recommendation/model/recommendation';

interface RatingProps
  extends React.ComponentProps<'div'>, Pick<RecommendationProduct, 'rating' | 'reviewCount'> {}

function Rating({ className, rating, reviewCount, ...props }: RatingProps) {
  return (
    <div
      className={cn('typo-caption2 flex items-center gap-1', className)}
      aria-label={`평점 ${rating}점`}
      {...props}
    >
      <span className="text-accent-apricot tracking-wider" aria-hidden="true">
        {formatRatingStars(rating)}
      </span>
      <span className="text-text-secondary">
        {rating.toFixed(1)} ({reviewCount.toLocaleString('ko-KR')}개 리뷰)
      </span>
    </div>
  );
}

export { Rating, type RatingProps };
