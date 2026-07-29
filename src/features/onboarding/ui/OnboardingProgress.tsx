import { cn } from '@/shared/utils/cn';

interface OnboardingProgressProps {
  currentIndex: number;
  total: number;
  className?: string;
}

function OnboardingProgress({ currentIndex, total, className }: OnboardingProgressProps) {
  return (
    <ol className={cn('flex justify-center gap-1', className)} aria-label="온보딩 진행 상태">
      {Array.from({ length: total }, (_, index) => (
        <li key={index}>
          <span
            aria-current={index === currentIndex ? 'step' : undefined}
            className={cn(
              'block h-1 rounded-full transition-all',
              index === currentIndex ? 'bg-primary-500 w-3' : 'bg-primary-200 w-1',
            )}
          >
            <span className="sr-only">{`${index + 1} / ${total}`}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

export { OnboardingProgress, type OnboardingProgressProps };
