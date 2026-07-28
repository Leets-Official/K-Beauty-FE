import { CosmetchMarkIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

interface SplashScreenProps {
  className?: string;
}

function SplashScreen({ className }: SplashScreenProps) {
  return (
    <main
      className={cn(
        'from-background-canvas via-background-canvas to-apricot-100 mx-auto flex min-h-dvh w-full max-w-[var(--app-mobile-width)] items-center justify-center bg-gradient-to-br',
        className,
      )}
    >
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

export { SplashScreen, type SplashScreenProps };
