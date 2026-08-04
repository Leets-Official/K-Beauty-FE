import type { OnboardingSlideData } from '@/features/onboarding/model';
import { cn } from '@/shared/utils/cn';

interface OnboardingSlideProps {
  slide: OnboardingSlideData;
  className?: string;
}

function OnboardingTitle({ slide }: Pick<OnboardingSlideProps, 'slide'>) {
  if ('titleAccent' in slide) {
    const restTitle = slide.title.replace(slide.titleAccent, '');

    return (
      <h2 id="onboarding-slide-title" className="typo-title2 text-text-primary">
        <span className="text-primary-500">{slide.titleAccent}</span>
        {restTitle}
      </h2>
    );
  }

  return (
    <h2 id="onboarding-slide-title" className="typo-title2 text-text-primary">
      {slide.title}
    </h2>
  );
}

function OnboardingSlide({ slide, className }: OnboardingSlideProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <div
        className="bg-neutral-150 -mx-4 mt-4 flex justify-center overflow-hidden pt-8"
        data-slot="onboarding-illustration"
      >
        <img
          className="h-auto max-h-[52dvh] w-[min(262px,72vw)] object-contain"
          src={slide.image.src}
          alt={slide.image.alt}
        />
      </div>

      <div key={slide.title} className="animate-onboarding-text-enter mt-7 text-center">
        <OnboardingTitle slide={slide} />
        <p className="typo-caption1 text-text-secondary mt-2">{slide.description}</p>
      </div>
    </div>
  );
}

export { OnboardingSlide, type OnboardingSlideProps };
