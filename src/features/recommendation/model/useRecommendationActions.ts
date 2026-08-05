import { useState } from 'react';

import { formatRecommendationText } from '@/features/recommendation/lib';
import { toast } from '@/shared/ui/Toast';

import type { RecommendationStep } from './recommendation';
import { useCreateRecommendationShareMutation } from './useCreateRecommendationShareMutation';

function useRecommendationActions(steps: RecommendationStep[]) {
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const createShareMutation = useCreateRecommendationShareMutation();

  async function copyRecommendation() {
    try {
      await navigator.clipboard.writeText(formatRecommendationText(steps));
      toast.success('추천 결과가 복사되었어요!');
    } catch {
      toast.error('추천 결과를 복사하지 못했어요.');
    }
  }

  function shareRecommendation() {
    createShareMutation.mutate(undefined, {
      onSuccess: async ({ shareToken }) => {
        const generatedShareUrl = `${window.location.origin}/recommendation?share=${encodeURIComponent(shareToken)}`;

        try {
          await navigator.clipboard.writeText(generatedShareUrl);
          setShareUrl(null);
          toast.success('공유 링크가 생성되고 복사되었어요!');
        } catch {
          setShareUrl(generatedShareUrl);
          toast.error('공유 링크를 복사하지 못했어요. 아래 링크를 직접 복사해주세요.');
        }
      },
      onError: () => {
        toast.error('공유 링크를 만들지 못했어요.');
      },
    });
  }

  return {
    copyRecommendation,
    isCreatingShare: createShareMutation.isPending,
    shareRecommendation,
    shareUrl,
  };
}

export { useRecommendationActions };
