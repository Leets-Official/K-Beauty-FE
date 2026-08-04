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
        <div
          aria-hidden="true"
          className="cosmetch-splash-mark shadow-logo-mark relative flex size-22 items-center justify-center overflow-hidden rounded-[22px]"
        >
          <img
            alt=""
            aria-hidden="true"
            className="cosmetch-splash-original absolute inset-0 size-full object-cover"
            src={cosmetchMarkImage}
          />
          <svg
            className="cosmetch-splash-motion absolute inset-0 size-full"
            viewBox="0 0 96 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              className="cosmetch-splash-bg"
              x="1"
              y="1"
              width="94"
              height="94"
              rx="22"
              fill="#EB5A46"
              stroke="#FDDFD9"
              strokeWidth="2"
            />
            <g className="cosmetch-splash-c-shape">
              <path
                className="cosmetch-splash-c-stroke"
                d="M46.2 39.4C33.6 37.5 23.3 46.4 23.5 58.6C23.9 72.5 36.1 80.9 49.1 80.1C59.8 79.4 67.9 73.2 71.9 63.9"
                pathLength="1"
              />
            </g>
          </svg>
        </div>
        <h1 className="cosmetch-splash-title cosmetch-wordmark text-text-primary mt-5 text-[34px] leading-[42px]">
          Cosmetch
        </h1>
        <p className="cosmetch-splash-guide text-text-secondary mt-[5px] text-[11px] leading-4 font-normal tracking-[0.1em]">
          GUIDE
        </p>
      </div>
    </main>
  );
}

export { SplashScreen, type SplashScreenProps };
