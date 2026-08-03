import { BlobCharacter } from '@/shared/ui/BlobCharacter';
import { cn } from '@/shared/utils/cn';

import type { OnboardingSlideData } from '@/features/onboarding/model/onboardingSlides';

interface OnboardingSlideProps {
  slide: OnboardingSlideData;
  className?: string;
}

function OnboardingSlide({ slide, className }: OnboardingSlideProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <div
        className="relative mt-4 flex size-60 items-center justify-center self-center"
        data-slot="onboarding-illustration"
      >
        <div
          aria-hidden="true"
          className={cn('absolute inset-0 rounded-full', slide.circleClassName)}
        />
        <div
          aria-hidden="true"
          className="bg-accent-apricot absolute top-3 left-45 size-12 rounded-full opacity-[0.35] blur-[20px]"
        />
        <BlobCharacter {...slide.character} className="relative" />
      </div>

      <div className="mt-6">
        <h2 id="onboarding-slide-title" className="typo-title2 text-text-primary">
          {slide.title}
        </h2>
        <p className="typo-caption1 text-text-secondary mt-2">{slide.description}</p>
      </div>
    </div>
  );
}

export { OnboardingSlide, type OnboardingSlideProps };
