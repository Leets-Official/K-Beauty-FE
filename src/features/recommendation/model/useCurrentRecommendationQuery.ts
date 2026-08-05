import { useQuery } from '@tanstack/react-query';

import { mapRecommendationResponse } from '@/features/recommendation/lib';

import { recommendationApi } from './recommendationApi';
import { recommendationQueries } from './recommendationQueries';

function useCurrentRecommendationQuery(enabled = true) {
  return useQuery({
    queryKey: recommendationQueries.current(),
    queryFn: () => recommendationApi.getCurrent().then((response) => response.data.data),
    select: mapRecommendationResponse,
    enabled,
  });
}

export { useCurrentRecommendationQuery };
