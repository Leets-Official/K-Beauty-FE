import { useMutation } from '@tanstack/react-query';

import { shareApi } from '@/features/recommendation/model/shareApi';

function useCreateRecommendationShareMutation() {
  return useMutation({
    mutationFn: () => shareApi.create().then((response) => response.data.data),
  });
}

export { useCreateRecommendationShareMutation };
