import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router';

import { useGenerateRecommendationMutation } from '@/features/recommendation';
import { getLoadingMessageIndex, getLoadingProgress } from '@/features/survey/lib';
import {
  LOADING_COMPLETE_DELAY_MS,
  LOADING_DURATION_MS,
  LOADING_MESSAGE_INTERVAL_MS,
  LOADING_MESSAGES,
  SURVEY_ROUTES,
  surveyApi,
  useSurveyStore,
} from '@/features/survey/model';
import { DEFAULT_ERROR_MESSAGE } from '@/shared/apis';
import { DropCharacterIcon } from '@/shared/assets/icons';
import { Button } from '@/shared/ui/button';
import { Progress } from '@/shared/ui/progress';
import { toast } from '@/shared/ui/Toast';

function SurveyLoadingStep() {
  const navigate = useNavigate();
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const hasRequestedCompletion = useRef(false);
  const {
    mutate: generateRecommendation,
    isError: isGenerationError,
    isSuccess: isGenerationSuccess,
  } = useGenerateRecommendationMutation();

  useEffect(() => {
    if (hasRequestedCompletion.current) {
      return;
    }

    hasRequestedCompletion.current = true;
    const { surveyId } = useSurveyStore.getState();

    if (surveyId === null) {
      toast.error(DEFAULT_ERROR_MESSAGE);
      navigate(-1);
      return;
    }

    void surveyApi
      .complete(surveyId)
      .then(() => generateRecommendation())
      .catch((error: unknown) => {
        toast.error(error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE);
        navigate(-1);
      });
  }, [generateRecommendation, navigate]);

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

      completeTimer = setTimeout(() => setIsAnimationDone(true), LOADING_COMPLETE_DELAY_MS);
    }

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(completeTimer);
    };
  }, []);

  useEffect(() => {
    if (isAnimationDone && isGenerationSuccess) {
      navigate(SURVEY_ROUTES.result, { replace: true });
    }
  }, [isAnimationDone, isGenerationSuccess, navigate]);

  const progress = getLoadingProgress(elapsedMs, LOADING_DURATION_MS);
  const messageIndex = getLoadingMessageIndex(
    elapsedMs,
    LOADING_MESSAGE_INTERVAL_MS,
    LOADING_MESSAGES.length,
  );
  const isLastMessage = messageIndex === LOADING_MESSAGES.length - 1;

  if (isGenerationError) {
    return (
      <main className="bg-background-canvas mx-auto flex min-h-dvh w-full max-w-[var(--app-mobile-width)] flex-col items-center justify-center px-8 text-center">
        <p className="typo-title2 text-text-primary">추천 결과를 만들지 못했어요.</p>
        <p role="alert" className="typo-body1 text-text-secondary mt-2 mb-8">
          잠시 후 다시 시도해주세요.
        </p>
        <div className="flex w-full flex-col gap-3">
          <Button type="button" onClick={() => generateRecommendation()}>
            다시 시도하기
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/', { replace: true })}
          >
            설문 다시 시작하기
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background-canvas mx-auto flex min-h-dvh w-full max-w-[var(--app-mobile-width)] flex-col items-center justify-center px-8">
      <div className="relative mb-10 flex size-30 items-center justify-center">
        <span className="bg-action-primary animate-blob-pulse absolute inset-0 rounded-full opacity-20 motion-reduce:animate-none" />
        <span
          className="bg-action-primary animate-blob-pulse absolute inset-3 rounded-full opacity-30 motion-reduce:animate-none"
          style={{ animationDelay: '200ms' }}
        />
        <div className="bg-action-primary absolute inset-6 flex items-center justify-center rounded-full opacity-80">
          <DropCharacterIcon width={20} height={20} aria-hidden="true" />
        </div>
        <div className="animate-orbit absolute inset-0 motion-reduce:animate-none">
          <span className="bg-accent-apricot absolute top-0 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full" />
        </div>
        <div className="animate-orbit-reverse absolute inset-0 motion-reduce:animate-none">
          <span className="bg-accent-mint absolute bottom-0 left-1/2 size-1.75 -translate-x-1/2 translate-y-1/2 rounded-full" />
        </div>
      </div>

      <p
        key={`title-${messageIndex}`}
        className="typo-title2 text-text-primary animate-in fade-in slide-in-from-bottom-1 text-center duration-400"
      >
        {isLastMessage ? '딱 맞는 제품을' : '분석 중이에요'}
      </p>
      <p
        key={messageIndex}
        role="status"
        aria-live="polite"
        className="typo-body1 text-text-secondary animate-in fade-in slide-in-from-bottom-1 mt-2 mb-10 text-center duration-400"
      >
        {LOADING_MESSAGES[messageIndex]}
      </p>

      <Progress
        value={progress}
        aria-label="추천 결과 분석 진행률"
        className="w-full"
        trackClassName="h-1.5"
        indicatorClassName="transition-none"
        style={{ width: '100%', height: 'auto' }}
      />
      <p className="typo-caption2 text-text-muted mt-3">{Math.round(progress)}%</p>
    </main>
  );
}

export { SurveyLoadingStep };
