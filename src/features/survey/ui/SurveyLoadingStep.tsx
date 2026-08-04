import { useEffect, useRef, useState } from 'react';

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
import { useCompleteSurvey } from '@/features/survey/model/useCompleteSurvey';
import { DropCharacterIcon } from '@/shared/assets/icons';
import { Progress } from '@/shared/ui/progress';

function SurveyLoadingStep() {
  const navigate = useNavigate();
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const { mutate: completeSurvey, isSuccess, isError } = useCompleteSurvey();

  // completeSurvey는 마운트 직후 한 번 참조가 바뀌어 이 effect가 다시 실행됩니다.
  // 완료 요청이 두 번 나가지 않도록 첫 호출 여부를 직접 기억합니다.
  const hasRequestedRef = useRef(false);

  useEffect(() => {
    if (hasRequestedRef.current) {
      return;
    }

    hasRequestedRef.current = true;
    completeSurvey();
  }, [completeSurvey]);

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

  // 애니메이션이 끝나도 완료 처리가 되기 전에는 넘어가지 않습니다.
  useEffect(() => {
    if (isAnimationDone && isSuccess) {
      navigate(SURVEY_ROUTES.result, { replace: true });
    }
  }, [isAnimationDone, isSuccess, navigate]);

  // 완료에 실패하면 토스트로 알리고, 답변을 다시 확인할 수 있게 직전 질문으로 돌려보냅니다.
  useEffect(() => {
    if (isError) {
      navigate(-1);
    }
  }, [isError, navigate]);

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
