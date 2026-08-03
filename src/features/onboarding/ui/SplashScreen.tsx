import { cosmetchMarkImage } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

interface SplashScreenProps {
  className?: string;
}

function SplashScreen({ className }: SplashScreenProps) {
  return (
    <main
      className={cn(
        'relative isolate mx-auto flex min-h-dvh w-full max-w-[var(--app-mobile-width)] flex-col items-center justify-center overflow-hidden bg-[linear-gradient(175deg,var(--background-subtle)_3.67%,var(--background-canvas)_59.27%)]',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="bg-accent-apricot absolute top-[18%] right-[8%] z-[1] size-30 rounded-full opacity-[0.22] blur-[44px]"
      />
      <div
        aria-hidden="true"
        className="bg-accent-mint absolute bottom-[22%] left-[6%] z-[2] size-20 rounded-full opacity-[0.22] blur-[32px]"
      />

      <div className="relative z-0 flex flex-col items-center">
        <div className="border-primary-100 shadow-logo-mark flex size-22 items-center justify-center overflow-hidden rounded-xl border-2">
          <img
            alt=""
            aria-hidden="true"
            className="size-full object-cover"
            src={cosmetchMarkImage}
          />
        </div>
        <h1 className="text-text-primary mt-5 text-[28px] leading-[42px] font-extrabold tracking-[var(--title-letter-spacing)]">
          COSMETCH
        </h1>
        <p className="text-text-secondary mt-[5px] text-[11px] leading-4 font-normal tracking-[0.1em]">
          GUIDE
        </p>
      </div>
    </main>
  );
}

export { SplashScreen, type SplashScreenProps };
