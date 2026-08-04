import { type ComponentProps, useState } from 'react';
import { useNavigate } from 'react-router';

import { formatRecommendationText } from '@/features/recommendation/lib/formatRecommendationText';
import { useCreateRecommendationShareMutation } from '@/features/recommendation/model/useCreateRecommendationShareMutation';
import { RecommendationComparisonBottomSheet } from '@/features/recommendation/ui/RecommendationComparisonBottomSheet';
import { CompareIcon, CopyIcon, ResetIcon, ShareIcon } from '@/shared/assets/icons';
import { Button } from '@/shared/ui/button';
import { toast } from '@/shared/ui/Toast';
import { cn } from '@/shared/utils/cn';

import type { RecommendationStep } from '@/features/recommendation/model/recommendation';

interface RecommendationActionsProps extends ComponentProps<'div'> {
  steps: RecommendationStep[];
}

function RecommendationActions({ className, steps, ...props }: RecommendationActionsProps) {
  const navigate = useNavigate();
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
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
        const shareUrl = `${window.location.origin}/recommendation?share=${encodeURIComponent(shareToken)}`;

        try {
          await navigator.clipboard.writeText(shareUrl);
          toast.success('공유 링크가 생성되고 복사되었어요!');
        } catch {
          toast.error('공유 링크는 만들었지만 복사하지 못했어요.');
        }
      },
      onError: () => {
        toast.error('공유 링크를 만들지 못했어요.');
      },
    });
  }

  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      <Button
        type="button"
        variant="secondary"
        className="bg-surface-default w-full"
        onClick={copyRecommendation}
      >
        <CopyIcon aria-hidden="true" />
        추천 결과 텍스트 복사
      </Button>

      <Button
        type="button"
        variant="secondary"
        className="bg-surface-default w-full"
        disabled={createShareMutation.isPending}
        onClick={shareRecommendation}
      >
        <ShareIcon aria-hidden="true" />
        {createShareMutation.isPending ? '공유 링크 만드는 중...' : '공유하기'}
      </Button>

      <Button
        type="button"
        variant="secondary"
        className="bg-surface-default w-full"
        aria-haspopup="dialog"
        onClick={() => setIsComparisonOpen(true)}
      >
        <CompareIcon aria-hidden="true" />
        핵심 비교 정보 확인
      </Button>

      <Button
        type="button"
        variant="ghost"
        className="text-text-muted mt-1 w-full"
        onClick={() => navigate('/')}
      >
        <ResetIcon aria-hidden="true" />
        처음부터 다시 하기
      </Button>

      <RecommendationComparisonBottomSheet
        open={isComparisonOpen}
        onOpenChange={setIsComparisonOpen}
        steps={steps}
      />
    </div>
  );
}

export { RecommendationActions, type RecommendationActionsProps };
