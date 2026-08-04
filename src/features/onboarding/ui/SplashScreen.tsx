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
          className="cosmetch-splash-mark border-primary-100 shadow-logo-mark relative flex size-24 items-center justify-center overflow-hidden rounded-[22px] border-2"
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
              rx="20"
              fill="url(#cosmetchSplashBg)"
            />
            <g
              className="cosmetch-splash-c-source"
              clipPath="url(#cosmetchSplashCClip)"
              mask="url(#cosmetchSplashCReveal)"
            >
              <image
                width="96"
                height="96"
                preserveAspectRatio="xMidYMid slice"
                href={cosmetchMarkImage}
              />
            </g>
            <g
              className="cosmetch-splash-c-upper-source"
              clipPath="url(#cosmetchSplashCUpperClip)"
              mask="url(#cosmetchSplashCReveal)"
            >
              <image
                width="96"
                height="96"
                preserveAspectRatio="xMidYMid slice"
                href={cosmetchMarkImage}
              />
            </g>
            <path
              className="cosmetch-splash-c-upper-bridge"
              d="M37.5 41.4C41.2 38.8 49.4 38.6 55.9 40.8"
              stroke="white"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              mask="url(#cosmetchSplashCReveal)"
            />
            <defs>
              <linearGradient
                id="cosmetchSplashBg"
                x1="10"
                y1="8"
                x2="89"
                y2="92"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F85A48" />
                <stop offset="1" stopColor="#F24A39" />
              </linearGradient>
              <clipPath id="cosmetchSplashCClip">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M26.33 42.87L23.58 46.55L21.59 51.37L20.9 55.5L21.13 61.17L22.51 66.45L24.88 71.27L28.33 75.71L32.23 79.16L37.13 82.14L41.95 83.98L47.69 84.98L53.36 84.9L58.49 83.9L63.31 81.91L67.14 79.31L70.81 75.41L72.65 72.34L73.88 68.59L73.42 65.76L71.35 64.38L68.98 65L65.84 69.21L62.16 72.27L58.41 74.11L55.35 74.95L50.07 75.33L45.7 74.72L41.11 73.19L36.59 70.58L33.07 67.44L30.09 63.31L28.4 59.02L28.02 54.51L28.78 50.99L30.47 47.77L34.3 44.02L39.2 41.72L39.43 38.89L38.66 38.28L33.15 38.81L29.47 40.42Z"
                />
              </clipPath>
              <clipPath id="cosmetchSplashCUpperClip">
                <path d="M38.97 38.35L36.75 38.28L36.75 42.64L39.43 41.49L39.5 39.04Z" />
                <path d="M40.88 40.11L40.88 40.96L41.26 41.34L50.53 41.34L50.99 40.88L50.83 39.73L49.68 38.97L42.33 38.97L41.49 39.27Z" />
                <path d="M52.82 38.28L52.29 38.97L52.36 41.57L55.81 43.02L55.81 38.35L54.66 38.05L53.36 38.05Z" />
              </clipPath>
              <mask id="cosmetchSplashCReveal">
                <rect
                  className="cosmetch-splash-c-reveal"
                  x="0"
                  y="0"
                  width="96"
                  height="96"
                  fill="white"
                />
              </mask>
            </defs>
          </svg>
        </div>
        <h1 className="cosmetch-splash-title cosmetch-wordmark text-text-primary mt-5 text-[34px] leading-[42px]">
          <span className="cosmetch-wordmark-c">C</span>osmetch
        </h1>
        <p className="cosmetch-splash-guide text-text-secondary mt-[5px] text-[11px] leading-4 font-normal tracking-[0.1em]">
          GUIDE
        </p>
      </div>
    </main>
  );
}

export { SplashScreen, type SplashScreenProps };
