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
        className="mt-4 flex size-[184px] items-center justify-center self-center rounded-full"
        data-slot="onboarding-illustration"
      >
        <div
          className={cn(
            'flex size-full items-center justify-center rounded-full',
            slide.circleClassName,
          )}
        >
          <BlobCharacter {...slide.character} />
        </div>
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
