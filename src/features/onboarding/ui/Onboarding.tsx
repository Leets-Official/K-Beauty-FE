import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { CosmetchMarkIcon } from '@/shared/assets/icons';
import { BlobCharacter } from '@/shared/ui/BlobCharacter';
import { Button } from '@/shared/ui/button';

const SPLASH_DURATION = 2000;

const ONBOARDING_SLIDES = [
  {
    title: '4~6개의 간단한 질문',
    description: '피부에 대한 몇 가지 질문만으로 나만의 루틴을 시작할 수 있어요',
    circleClassName: 'bg-primary-50',
    character: <BlobCharacter size={136} variant="radiant" detail="spark" expression="happy" />,
  },
  {
    title: '피부 고민 맞춤 매칭',
    description: '피부 타입과 고민에 맞는 최적의 제품을 찾아드려요',
    circleClassName: 'bg-mint-100',
    character: <BlobCharacter size={136} variant="mint" detail="drop" expression="calm" />,
  },
  {
    title: '전문가 성분 분석',
    description: '복잡한 성분표 없이 전문가가 대신 분석해 드려요',
    circleClassName: 'bg-lavender-100',
    character: <BlobCharacter size={136} variant="lavender" detail="leaf" expression="curious" />,
  },
] as const;

function SplashScreen() {
  return (
    <main className="from-background-canvas via-background-canvas to-apricot-100 mx-auto flex min-h-dvh w-full max-w-[var(--app-mobile-width)] items-center justify-center bg-gradient-to-br">
      <div className="flex flex-col items-center">
        <CosmetchMarkIcon aria-hidden="true" className="size-11" />
        <h1 className="text-text-primary mt-3 text-[14px] leading-none font-bold tracking-[-0.04em]">
          COSMETCH
        </h1>
        <p className="text-text-secondary mt-1 text-[6px] leading-none font-medium tracking-[0.08em]">
          GUIDE
        </p>
      </div>
    </main>
  );
}

export function Onboarding() {
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
    return <SplashScreen />;
  }

  return (
    <main className="bg-background-canvas mx-auto flex min-h-dvh w-full max-w-[var(--app-mobile-width)] flex-col px-4 pt-7 pb-4">
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
        <div
          className="mt-4 flex size-[184px] items-center justify-center self-center rounded-full"
          data-slot="onboarding-illustration"
        >
          <div
            className={`flex size-full items-center justify-center rounded-full ${currentSlide.circleClassName}`}
          >
            {currentSlide.character}
          </div>
        </div>

        <div className="mt-6">
          <h2 id="onboarding-slide-title" className="typo-title2 text-text-primary">
            {currentSlide.title}
          </h2>
          <p className="typo-caption1 text-text-secondary mt-2">{currentSlide.description}</p>
        </div>

        <div className="mt-auto">
          <ol className="mb-3 flex justify-center gap-1" aria-label="Onboarding progress">
            {ONBOARDING_SLIDES.map(({ title }, index) => (
              <li key={title}>
                <span
                  aria-current={index === currentSlideIndex ? 'step' : undefined}
                  className={`block h-1 rounded-full transition-all ${
                    index === currentSlideIndex ? 'bg-primary-500 w-3' : 'bg-primary-200 w-1'
                  }`}
                >
                  <span className="sr-only">{`${index + 1} / ${ONBOARDING_SLIDES.length}`}</span>
                </span>
              </li>
            ))}
          </ol>
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
