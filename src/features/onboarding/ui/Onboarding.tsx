import { useEffect, useState } from 'react';

import { useOnboardingFlow } from '@/features/onboarding/model';
import {
  OnboardingProgress,
  OnboardingSlideImage,
  OnboardingSlideText,
  OngoingSurveyDialog,
  SplashScreen,
} from '@/features/onboarding/ui';
import { cosmetchMarkImage } from '@/shared/assets/icons';
import { Button } from '@/shared/ui/button';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/shared/ui/carousel';
import { cn } from '@/shared/utils/cn';

interface OnboardingProps {
  className?: string;
}

function Onboarding({ className }: OnboardingProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const {
    isSplashVisible,
    currentSlide,
    currentSlideIndex,
    slides,
    totalSlides,
    isLastSlide,
    isOngoingSurveyDialogOpen,
    isStarting,
    isContinuing,
    continueOngoingSurvey,
    startSurvey,
    setIsOngoingSurveyDialogOpen,
    goToNextSlide,
    goToSlide,
  } = useOnboardingFlow();

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const handleSelect = () => {
      goToSlide(carouselApi.selectedScrollSnap());
    };

    handleSelect();
    carouselApi.on('select', handleSelect);
    carouselApi.on('reInit', handleSelect);

    return () => {
      carouselApi.off('select', handleSelect);
      carouselApi.off('reInit', handleSelect);
    };
  }, [carouselApi, goToSlide]);

  useEffect(() => {
    if (!carouselApi || carouselApi.selectedScrollSnap() === currentSlideIndex) {
      return;
    }

    carouselApi.scrollTo(currentSlideIndex);
  }, [carouselApi, currentSlideIndex]);

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
      <header className="flex h-6 items-center justify-between">
        <div className="flex items-center gap-1.5" aria-label="Cosmetch">
          <img className="size-5 rounded-md" src={cosmetchMarkImage} alt="" aria-hidden="true" />
          <span className="cosmetch-wordmark text-primary-600 text-[14px] leading-5">
            {'Cosmetch'}
          </span>
        </div>

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
        <Carousel
          className="-mx-4"
          opts={{ align: 'start', containScroll: 'trimSnaps', skipSnaps: false }}
          setApi={setCarouselApi}
        >
          <CarouselContent className="ml-0">
            {slides.map((slide) => (
              <CarouselItem key={slide.title} className="pl-0">
                <OnboardingSlideImage slide={slide} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <OnboardingSlideText key={currentSlideIndex} slide={currentSlide} />

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

      <OngoingSurveyDialog
        open={isOngoingSurveyDialogOpen}
        isContinuing={isContinuing}
        onContinue={continueOngoingSurvey}
        onOpenChange={setIsOngoingSurveyDialogOpen}
      />
    </main>
  );
}

export { Onboarding, type OnboardingProps };
