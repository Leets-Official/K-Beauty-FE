import onboardingFirstImage from '@/shared/assets/images/onboarding_1.png';

export const ONBOARDING_SLIDES = [
  {
    title: '가입 없이 바로 진단',
    titleAccent: '가입 없이',
    description: '로그인 없이 피부 질문에 답하고 바로 시작해요.',
    image: {
      src: onboardingFirstImage,
      alt: '피부 고민 설문 화면',
    },
  },
  {
    title: '피부 고민 맞춤 매칭',
    description: '피부 타입과 고민에 맞는 최적의 제품을 찾아드려요',
    image: {
      src: onboardingFirstImage,
      alt: '피부 고민 설문 화면',
    },
  },
  {
    title: '전문가 성분 분석',
    description: '복잡한 성분표 없이 전문가가 대신 분석해 드려요',
    image: {
      src: onboardingFirstImage,
      alt: '피부 고민 설문 화면',
    },
  },
] as const;

export type OnboardingSlideData = (typeof ONBOARDING_SLIDES)[number];
