import { MAX_RATING, normalizeRating } from '@/shared/utils/format';

function formatRatingStars(rating: number) {
  const filledCount = Math.floor(normalizeRating(rating) ?? 0);

  return '★'.repeat(filledCount) + '☆'.repeat(MAX_RATING - filledCount);
}

export { formatRatingStars };
