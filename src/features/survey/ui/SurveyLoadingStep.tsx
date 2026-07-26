import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router';

import { getLoadingMessageIndex } from '@/features/survey/lib/getLoadingMessageIndex';
import { getLoadingProgress } from '@/features/survey/lib/getLoadingProgress';
import {
  LOADING_COMPLETE_DELAY_MS,
  LOADING_DURATION_MS,
  LOADING_MESSAGE_INTERVAL_MS,
  LOADING_MESSAGES,
} from '@/features/survey/model/surveyLoading';
import { SURVEY_ROUTES } from '@/features/survey/model/surveyRoutes';
import { BlobCharacter } from '@/shared/ui/BlobCharacter';
import { Progress } from '@/shared/ui/progress';

function SurveyLoadingStep() {
  const navigate = useNavigate();
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let frame = requestAnimationFrame(tick);
    let completeTimer: ReturnType<typeof setTimeout> | undefined;

    function tick(now: number) {
      const elapsed = now - start;
      setElapsedMs(elapsed);

      if (elapsed < LOADING_DURATION_MS) {
        frame = requestAnimationFrame(tick);
        return;
      }

      completeTimer = setTimeout(() => {
        navigate(SURVEY_ROUTES.result, { replace: true });
      }, LOADING_COMPLETE_DELAY_MS);
    }

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(completeTimer);
    };
  }, [navigate]);

  const progress = getLoadingProgress(elapsedMs, LOADING_DURATION_MS);
  const messageIndex = getLoadingMessageIndex(
    elapsedMs,
    LOADING_MESSAGE_INTERVAL_MS,
    LOADING_MESSAGES.length,
  );
  const isLastMessage = messageIndex === LOADING_MESSAGES.length - 1;

  return (
    <main className="bg-background-canvas mx-auto flex min-h-dvh w-full max-w-[var(--app-mobile-width)] flex-col items-center justify-center px-8">
      <div className="relative mb-10 flex size-30 items-center justify-center">
        <span className="bg-action-primary animate-blob-pulse absolute inset-0 rounded-full opacity-15 motion-reduce:animate-none" />
        <span
          className="bg-action-primary animate-blob-pulse absolute inset-4 rounded-full opacity-20 motion-reduce:animate-none"
          style={{ animationDelay: '200ms' }}
        />
        <BlobCharacter
          variant="radiant"
          expression="calm"
          detail="spark"
          size={72}
          className="relative"
        />
        <div className="animate-orbit absolute inset-0 motion-reduce:animate-none">
          <span className="bg-accent-apricot absolute top-0 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full" />
        </div>
        <div className="animate-orbit-reverse absolute inset-0 motion-reduce:animate-none">
          <span className="bg-accent-mint absolute bottom-0 left-1/2 size-2 -translate-x-1/2 translate-y-1/2 rounded-full" />
        </div>
      </div>

      <p className="typo-title2 text-text-primary text-center">
        {isLastMessage ? '딱 맞는 제품을 찾았어요' : '분석 중이에요'}
      </p>
      <p
        key={messageIndex}
        role="status"
        aria-live="polite"
        className="typo-body1 text-text-secondary animate-in fade-in slide-in-from-bottom-1 mt-2 mb-10 text-center duration-300"
      >
        {LOADING_MESSAGES[messageIndex]}
      </p>

      <Progress
        value={progress}
        aria-label="추천 결과 분석 진행률"
        className="w-full"
        indicatorClassName="transition-none"
        style={{ width: '100%', height: 'auto' }}
      />
      <p className="typo-caption2 text-text-muted mt-3">{Math.round(progress)}%</p>
    </main>
  );
}

export { SurveyLoadingStep };
