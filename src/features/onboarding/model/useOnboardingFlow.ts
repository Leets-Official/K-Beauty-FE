import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { SURVEY_ROUTES, useStartSurveyMutation, useSurveyStore } from '@/features/survey';
import { ApiError } from '@/shared/apis';
import { toast } from '@/shared/ui/Toast';

import { ONBOARDING_SLIDES } from './onboardingSlides';

const SPLASH_DURATION = 4000;

function getOngoingSurveyRoute() {
  const { concern, discomfortTypes, research, sensitive, skinType } = useSurveyStore.getState();

  if (!concern) {
    return SURVEY_ROUTES.concern;
  }

  if (!skinType) {
    return SURVEY_ROUTES.skinType;
  }

  if (!sensitive) {
    return SURVEY_ROUTES.sensitive;
  }

  if (discomfortTypes.length === 0) {
    return SURVEY_ROUTES.discomfort;
  }

  if (!research) {
    return SURVEY_ROUTES.research;
  }

  return SURVEY_ROUTES.loading;
}

/**
 * 온보딩 화면의 흐름을 담당합니다. 스플래시 노출, 슬라이드 이동, 설문 시작과 그 성공/실패 처리까지
 * 여기서 정하고, 화면은 결과값과 핸들러만 받아 그립니다.
 */
function useOnboardingFlow() {
  const navigate = useNavigate();
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isOngoingSurveyDialogOpen, setIsOngoingSurveyDialogOpen] = useState(false);
  const startSurveyMutation = useStartSurveyMutation();

  const currentSlide = ONBOARDING_SLIDES[currentSlideIndex];
  const isLastSlide = currentSlideIndex === ONBOARDING_SLIDES.length - 1;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setIsSplashVisible(false), SPLASH_DURATION);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const startSurvey = useCallback(() => {
    if (startSurveyMutation.isPending) {
      return;
    }

    startSurveyMutation.mutate(undefined, {
      onSuccess: () => {
        navigate('/survey');
      },
      onError: (error) => {
        if (error instanceof ApiError && error.status === 409) {
          setIsOngoingSurveyDialogOpen(true);
          return;
        }

        toast.error('설문을 시작하지 못했어요. 잠시 후 다시 시도해주세요.');
      },
    });
  }, [navigate, startSurveyMutation]);

  const goToNextSlide = useCallback(() => {
    if (isLastSlide) {
      startSurvey();
      return;
    }

    setCurrentSlideIndex((index) => index + 1);
  }, [isLastSlide, startSurvey]);

  const goToPreviousSlide = useCallback(() => {
    if (currentSlideIndex === 0) {
      return;
    }

    setCurrentSlideIndex((index) => index - 1);
  }, [currentSlideIndex]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlideIndex(Math.min(Math.max(index, 0), ONBOARDING_SLIDES.length - 1));
  }, []);

  const continueOngoingSurvey = useCallback(() => {
    setIsOngoingSurveyDialogOpen(false);
    navigate(getOngoingSurveyRoute());
  }, [navigate]);

  return {
    isSplashVisible,
    currentSlide,
    currentSlideIndex,
    slides: ONBOARDING_SLIDES,
    totalSlides: ONBOARDING_SLIDES.length,
    isLastSlide,
    isOngoingSurveyDialogOpen,
    isStarting: startSurveyMutation.isPending,
    continueOngoingSurvey,
    startSurvey,
    setIsOngoingSurveyDialogOpen,
    goToNextSlide,
    goToPreviousSlide,
    goToSlide,
  };
}

export { useOnboardingFlow };
