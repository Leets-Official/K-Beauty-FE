import { useMutation, useQueryClient } from '@tanstack/react-query';

import { recommendationApi } from '@/features/recommendation/model/recommendationApi';
import { recommendationQueries } from '@/features/recommendation/model/recommendationQueries';

function useSelectRecommendationCandidateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    scope: { id: 'recommendation-candidate-selection' },
    mutationFn: (variables: Parameters<typeof recommendationApi.selectCandidate>[0]) =>
      recommendationApi.selectCandidate(variables).then((response) => response.data.data),
    onSuccess: (recommendation) => {
      queryClient.setQueryData(recommendationQueries.current(), recommendation);
    },
  });
}

export { useSelectRecommendationCandidateMutation };
