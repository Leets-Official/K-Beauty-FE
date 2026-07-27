import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { ONBOARDING_SLIDES } from '@/features/onboarding/model/onboardingSlides';
import { OnboardingProgress } from '@/features/onboarding/ui/OnboardingProgress';
import { OnboardingSlide } from '@/features/onboarding/ui/OnboardingSlide';
import { SplashScreen } from '@/features/onboarding/ui/SplashScreen';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';

const SPLASH_DURATION = 2000;

interface OnboardingProps {
  className?: string;
}

function Onboarding({ className }: OnboardingProps) {
  const navigate = useNavigate();
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = ONBOARDING_SLIDES[currentSlideIndex];
  const isLastSlide = currentSlideIndex === ONBOARDING_SLIDES.length - 1;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setIsSplashVisible(false), SPLASH_DURATION);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleNext = () => {
    if (isLastSlide) {
      navigate('/survey');
      return;
    }

    setCurrentSlideIndex((index) => index + 1);
  };

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
          onClick={() => navigate('/survey')}
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
            total={ONBOARDING_SLIDES.length}
          />
          <Button className="h-12 w-full shadow-none" onClick={handleNext}>
            {isLastSlide ? '추천 시작하기' : '다음'}
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
