import type { ComponentProps } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { useCurrentRecommendationQuery } from '@/features/recommendation/model/useCurrentRecommendationQuery';
import { useSelectRecommendationCandidateMutation } from '@/features/recommendation/model/useSelectRecommendationCandidateMutation';
import { useSharedRecommendationQuery } from '@/features/recommendation/model/useSharedRecommendationQuery';
import { RecommendationActions } from '@/features/recommendation/ui/RecommendationActions';
import { RecommendationStepCard } from '@/features/recommendation/ui/RecommendationStepCard';
import { BackIcon, SparkleIcon } from '@/shared/assets/icons';
import { Button } from '@/shared/ui/button';
import { toast } from '@/shared/ui/Toast';
import { cn } from '@/shared/utils/cn';

type RecommendationResultPageProps = ComponentProps<'main'>;

function RecommendationResultPage({ className, ...props }: RecommendationResultPageProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const shareToken = searchParams.get('share');
  const currentRecommendationQuery = useCurrentRecommendationQuery(!shareToken);
  const sharedRecommendationQuery = useSharedRecommendationQuery(shareToken);
  const isSharedRecommendation = Boolean(shareToken);
  const recommendationQuery = isSharedRecommendation
    ? sharedRecommendationQuery
    : currentRecommendationQuery;
  const selectCandidateMutation = useSelectRecommendationCandidateMutation();

  if (recommendationQuery.isPending) {
    return (
      <main
        className={cn(
          'bg-background-canvas flex min-h-dvh items-center justify-center px-6',
          className,
        )}
        {...props}
      >
        <p role="status" className="typo-body1 text-text-secondary">
          추천 결과를 불러오는 중이에요.
        </p>
      </main>
    );
  }

  if (recommendationQuery.isError) {
    return (
      <main
        className={cn(
          'bg-background-canvas flex min-h-dvh flex-col items-center justify-center gap-4 px-6',
          className,
        )}
        {...props}
      >
        <p className="typo-body1 text-text-secondary">추천 결과를 불러오지 못했어요.</p>
        <Button type="button" onClick={() => recommendationQuery.refetch()}>
          다시 시도하기
        </Button>
        <Button type="button" variant="secondary" onClick={() => navigate('/', { replace: true })}>
          설문 다시 시작하기
        </Button>
      </main>
    );
  }

  const recommendation = recommendationQuery.data;

  function replaceProduct(step: number, productId: number) {
    selectCandidateMutation.mutate(
      { recommendationId: recommendation.id, step, productId },
      {
        onError: () => {
          toast.error('제품을 교체하지 못했어요. 잠시 후 다시 시도해주세요.');
        },
      },
    );
  }

  return (
    <main className={cn('bg-background-canvas min-h-dvh', className)} {...props}>
      <header className="bg-background-subtle px-4 pt-11 pb-6">
        <div className="mb-7 flex items-center gap-2">
          <button
            type="button"
            aria-label="이전 화면으로 돌아가기"
            onClick={() => window.history.back()}
            className="text-text-secondary -ml-2 flex size-8 items-center justify-center"
          >
            <BackIcon aria-hidden="true" className="size-4" />
          </button>
          <span className="text-action-primary typo-caption1 flex items-center gap-1">
            <SparkleIcon aria-hidden="true" className="size-4" />
            {isSharedRecommendation ? '공유된 추천' : '추천 완료'}
          </span>
        </div>
        <h1 className="typo-title2 text-text-primary">
          고민에 맞춰
          <br />
          단계별로 하나씩 골랐어요.
        </h1>
        <p className="typo-caption1 text-text-secondary mt-2">
          단계별로 순서대로 사용하면 더 좋아요
        </p>
      </header>

      <section aria-label="단계별 추천 결과" className="px-4 py-5">
        <div className="flex flex-col gap-3">
          {recommendation.steps.map((step) => (
            <RecommendationStepCard
              key={step.id}
              {...step}
              onReplaceProduct={
                isSharedRecommendation
                  ? undefined
                  : (candidateId) => replaceProduct(step.id, candidateId)
              }
              isReplacing={
                selectCandidateMutation.isPending &&
                selectCandidateMutation.variables?.step === step.id
              }
              showCandidates={!isSharedRecommendation}
            />
          ))}
        </div>
      </section>

      {isSharedRecommendation ? null : (
        <RecommendationActions steps={recommendation.steps} className="px-4 pb-8" />
      )}
    </main>
  );
}

export { RecommendationResultPage, type RecommendationResultPageProps };
