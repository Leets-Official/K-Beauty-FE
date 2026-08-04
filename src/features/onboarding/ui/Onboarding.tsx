import { useOnboardingFlow } from '@/features/onboarding/model';
import { OnboardingProgress, OnboardingSlide, SplashScreen } from '@/features/onboarding/ui';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';

interface OnboardingProps {
  className?: string;
}

function Onboarding({ className }: OnboardingProps) {
  const {
    isSplashVisible,
    currentSlide,
    currentSlideIndex,
    totalSlides,
    isLastSlide,
    isStarting,
    startSurvey,
    goToNextSlide,
  } = useOnboardingFlow();

  if (isSplashVisible) {
    return <SplashScreen className={className} />;
  }

  return (
    <main
      className={cn(
        'bg-background-canvas mx-auto flex min-h-dvh w-full max-w-[var(--app-mobile-width)] flex-col px-4 pt-7 pb-4',
        className,
      )}
    >
      <header className="flex h-4 justify-end">
        <button
          className="typo-caption1 text-text-secondary hover:text-text-primary focus-visible:ring-ring rounded-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
          type="button"
          disabled={isStarting}
          onClick={startSurvey}
        >
          {'건너뛰기'}
        </button>
      </header>

      <section
        className="flex flex-1 flex-col"
        aria-labelledby="onboarding-slide-title"
        aria-live="polite"
      >
        <OnboardingSlide slide={currentSlide} />

        <div className="mt-auto">
          <OnboardingProgress
            className="mb-3"
            currentIndex={currentSlideIndex}
            total={totalSlides}
          />
          <Button className="h-12 w-full shadow-none" disabled={isStarting} onClick={goToNextSlide}>
            {isStarting ? '시작하는 중...' : isLastSlide ? '추천 시작하기' : '다음'}
          </Button>
          {isLastSlide ? (
            <p className="typo-caption2 text-text-muted mt-2 text-center">
              {'평균 1분 소요 · 개인 정보 수집 없음'}
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}

export { Onboarding, type OnboardingProps };
