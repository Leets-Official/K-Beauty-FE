import { useMutation, useQueryClient } from '@tanstack/react-query';

import { recommendationApi } from './recommendationApi';
import { recommendationQueries } from './recommendationQueries';

function useGenerateRecommendationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => recommendationApi.generate().then((response) => response.data.data),
    onSuccess: (recommendation) => {
      queryClient.setQueryData(recommendationQueries.current(), recommendation);
    },
  });
}

export { useGenerateRecommendationMutation };
