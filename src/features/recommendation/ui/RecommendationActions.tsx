import { type ComponentProps, useState } from 'react';
import { useNavigate } from 'react-router';

import { type RecommendationStep, useRecommendationActions } from '@/features/recommendation/model';
import { CompareIcon, CopyIcon, ResetIcon, ShareIcon } from '@/shared/assets/icons';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';

import { RecommendationComparisonBottomSheet } from './RecommendationComparisonBottomSheet';

interface RecommendationActionsProps extends ComponentProps<'div'> {
  steps: RecommendationStep[];
}

function RecommendationActions({ className, steps, ...props }: RecommendationActionsProps) {
  const navigate = useNavigate();
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const { copyRecommendation, isCreatingShare, shareRecommendation, shareUrl } =
    useRecommendationActions(steps);

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
        disabled={isCreatingShare}
        onClick={shareRecommendation}
      >
        <ShareIcon aria-hidden="true" />
        {isCreatingShare ? '공유 링크 만드는 중...' : '공유하기'}
      </Button>

      {shareUrl ? (
        <div className="border-border-subtle bg-surface-default flex flex-col gap-2 rounded-2xl border p-3">
          <p className="typo-caption1 text-text-secondary">공유 링크를 직접 복사해주세요.</p>
          <input
            aria-label="생성된 공유 링크"
            readOnly
            value={shareUrl}
            onFocus={(event) => event.currentTarget.select()}
            onClick={(event) => event.currentTarget.select()}
            className="border-border-subtle bg-background-subtle text-text-primary typo-caption1 focus-visible:ring-ring/50 w-full rounded-xl border px-3 py-2 outline-none focus-visible:ring-2"
          />
        </div>
      ) : null}

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
