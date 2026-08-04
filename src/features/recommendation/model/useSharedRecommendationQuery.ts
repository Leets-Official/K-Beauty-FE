import { useQuery } from '@tanstack/react-query';

import { mapRecommendationResponse } from '@/features/recommendation/lib/mapRecommendationResponse';
import { recommendationQueries } from '@/features/recommendation/model/recommendationQueries';
import { shareApi } from '@/features/recommendation/model/shareApi';

function useSharedRecommendationQuery(shareToken: string | null) {
  return useQuery({
    queryKey: recommendationQueries.shared(shareToken ?? ''),
    queryFn: () => shareApi.getByToken(shareToken ?? '').then((response) => response.data.data),
    select: mapRecommendationResponse,
    enabled: Boolean(shareToken),
  });
}

export { useSharedRecommendationQuery };
