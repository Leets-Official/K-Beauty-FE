import { RECOMMENDATION_STEPS } from '@/features/recommendation/model/recommendation';
import { useRecommendationSteps } from '@/features/recommendation/model/useRecommendationSteps';
import { RecommendationActions } from '@/features/recommendation/ui/RecommendationActions';
import { BackIcon, SparkleIcon } from '@/features/recommendation/ui/RecommendationIcons';
import { RecommendationStepCard } from '@/features/recommendation/ui/RecommendationStepCard';
import { cn } from '@/shared/utils/cn';

type RecommendationResultPageProps = React.ComponentProps<'main'>;

function RecommendationResultPage({ className, ...props }: RecommendationResultPageProps) {
  const { steps, replaceProduct } = useRecommendationSteps(RECOMMENDATION_STEPS);

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
            <BackIcon aria-hidden="true" />
          </button>
          <span className="text-action-primary typo-caption1 flex items-center gap-1">
            <SparkleIcon aria-hidden="true" />
            추천 완료
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
          {steps.map((step) => (
            <RecommendationStepCard
              key={step.id}
              {...step}
              onReplaceProduct={(candidateId) => replaceProduct(step.id, candidateId)}
            />
          ))}
        </div>
      </section>

      <RecommendationActions steps={steps} className="px-4 pb-8" />
    </main>
  );
}

export { RecommendationResultPage, type RecommendationResultPageProps };
