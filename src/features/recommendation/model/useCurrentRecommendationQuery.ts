import { useQuery } from '@tanstack/react-query';

import { mapRecommendationResponse } from '@/features/recommendation/lib/mapRecommendationResponse';
import { recommendationApi } from '@/features/recommendation/model/recommendationApi';
import { recommendationQueries } from '@/features/recommendation/model/recommendationQueries';

function useCurrentRecommendationQuery(enabled = true) {
  return useQuery({
    queryKey: recommendationQueries.current(),
    queryFn: () => recommendationApi.getCurrent().then((response) => response.data.data),
    select: mapRecommendationResponse,
    enabled,
  });
}

export { useCurrentRecommendationQuery };
