import type { OnboardingSlideData } from '@/features/onboarding/model';
import { cn } from '@/shared/utils/cn';

interface OnboardingSlideProps {
  slide: OnboardingSlideData;
  className?: string;
}

type OnboardingSlideImageProps = OnboardingSlideProps;
type OnboardingSlideTextProps = OnboardingSlideProps;

function OnboardingTitle({ slide }: Pick<OnboardingSlideTextProps, 'slide'>) {
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

function OnboardingSlideImage({ slide, className }: OnboardingSlideImageProps) {
  return (
    <div
      className={cn('bg-neutral-150 mt-4 flex justify-center overflow-hidden pt-8', className)}
      data-slot="onboarding-illustration"
    >
      <img
        className="h-auto max-h-[52dvh] w-[min(262px,72vw)] object-contain"
        src={slide.image.src}
        alt={slide.image.alt}
      />
    </div>
  );
}

function OnboardingSlideText({ slide, className }: OnboardingSlideTextProps) {
  return (
    <div className={cn('animate-onboarding-text-enter mt-7 text-center', className)}>
      <OnboardingTitle slide={slide} />
      <p className="typo-caption1 text-text-secondary mt-2">{slide.description}</p>
    </div>
  );
}

export {
  OnboardingSlideImage,
  OnboardingSlideText,
  type OnboardingSlideImageProps,
  type OnboardingSlideTextProps,
};
