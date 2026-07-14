const koreanWonFormatter = new Intl.NumberFormat('ko-KR');

export const MAX_RATING = 5;

export function formatPrice(price: number) {
  return `${koreanWonFormatter.format(price)}원`;
}

export function normalizeRating(rating: number | undefined) {
  if (typeof rating !== 'number' || !Number.isFinite(rating)) {
    return undefined;
  }

  return Math.min(Math.max(rating, 0), MAX_RATING);
}
