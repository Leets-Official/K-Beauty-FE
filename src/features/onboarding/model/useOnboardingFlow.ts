import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import {
  SURVEY_ROUTES,
  surveyApi,
  useStartSurveyMutation,
  useSurveyStore,
  type Concern,
  type CurrentSurveyResponse,
  type ProductDiscomfortType,
  type QuestionCode,
  type ResearchPreference,
  type Sensitivity,
  type SkinType,
  type SurveyRoute,
} from '@/features/survey/model';
import { ApiError } from '@/shared/apis';
import { toast } from '@/shared/ui/Toast';

import { ONBOARDING_SLIDES } from './onboardingSlides';

const SPLASH_DURATION = 4000;

const ROUTE_BY_QUESTION_CODE: Record<QuestionCode, SurveyRoute> = {
  CONCERN: SURVEY_ROUTES.concern,
  SKIN_TYPE: SURVEY_ROUTES.skinType,
  SENSITIVITY: SURVEY_ROUTES.sensitive,
  CAUTION: SURVEY_ROUTES.discomfort,
  EXPLORATION_HABIT: SURVEY_ROUTES.research,
};

function syncCurrentSurveyToStore(currentSurvey: CurrentSurveyResponse) {
  const store = useSurveyStore.getState();

  store.reset();
  store.setSurveyId(currentSurvey.surveyResponseId);

  for (const answer of currentSurvey.answers) {
    const firstOptionCode = answer.optionCodes[0];

    switch (answer.questionCode) {
      case 'CONCERN':
        if (firstOptionCode) {
          store.setConcern(firstOptionCode as Concern);
        }
        break;
      case 'SKIN_TYPE':
        if (firstOptionCode) {
          store.setSkinType(firstOptionCode as SkinType);
        }
        break;
      case 'SENSITIVITY':
        if (firstOptionCode) {
          store.setSensitive(firstOptionCode as Sensitivity);
        }
        break;
      case 'CAUTION':
        store.setDiscomfortTypes(answer.optionCodes as ProductDiscomfortType[]);
        break;
      case 'EXPLORATION_HABIT':
        if (firstOptionCode) {
          store.setResearch(firstOptionCode as ResearchPreference);
        }
        break;
    }

    store.markAnswerSaved(answer.questionCode);
  }
}

function getCurrentSurveyRoute(currentSurvey: CurrentSurveyResponse) {
  if (currentSurvey.status === 'COMPLETED') {
    return SURVEY_ROUTES.result;
  }

  if (currentSurvey.nextAction === 'GO_TO_ONBOARDING') {
    return SURVEY_ROUTES.onboarding;
  }

  if (currentSurvey.nextAction === 'READY_TO_COMPLETE') {
    return SURVEY_ROUTES.loading;
  }

  if (currentSurvey.nextAction === 'SELECT_DIAGNOSIS_MODE') {
    return SURVEY_ROUTES.skinType;
  }

  return currentSurvey.currentQuestionCode
    ? ROUTE_BY_QUESTION_CODE[currentSurvey.currentQuestionCode]
    : SURVEY_ROUTES.concern;
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
  const [isContinuing, setIsContinuing] = useState(false);
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

  const continueOngoingSurvey = useCallback(async () => {
    if (isContinuing) {
      return;
    }

    setIsContinuing(true);

    try {
      const currentSurvey = await surveyApi.current();

      syncCurrentSurveyToStore(currentSurvey);
      setIsOngoingSurveyDialogOpen(false);
      navigate(getCurrentSurveyRoute(currentSurvey));
    } catch {
      toast.error('진행 중인 설문을 불러오지 못했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsContinuing(false);
    }
  }, [isContinuing, navigate]);

  return {
    isSplashVisible,
    currentSlide,
    currentSlideIndex,
    slides: ONBOARDING_SLIDES,
    totalSlides: ONBOARDING_SLIDES.length,
    isLastSlide,
    isOngoingSurveyDialogOpen,
    isStarting: startSurveyMutation.isPending || isContinuing,
    isContinuing,
    continueOngoingSurvey,
    startSurvey,
    setIsOngoingSurveyDialogOpen,
    goToNextSlide,
    goToPreviousSlide,
    goToSlide,
  };
}

export { useOnboardingFlow };
