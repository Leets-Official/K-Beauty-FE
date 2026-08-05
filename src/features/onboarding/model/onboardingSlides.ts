import onboardingFirstImage from '@/shared/assets/images/onboarding_1.png';
import onboardingSecondImage from '@/shared/assets/images/onboarding_2.png';
import onboardingThirdImage from '@/shared/assets/images/onboarding_3.png';

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
    title: '내 고민만 빠르게 선택',
    description: '피부 타입, 민감도, 고민만 골라 맞춤 조건을 찾아요.',
    image: {
      src: onboardingSecondImage,
      alt: '피부 고민 선택 화면',
    },
  },
  {
    title: '추천 제품 바로 확인',
    description: '복잡한 성분 고민 없이 내 피부에 맞는 제품을 확인해요.',
    image: {
      src: onboardingThirdImage,
      alt: '추천 제품 확인 화면',
    },
  },
] as const;

export type OnboardingSlideData = (typeof ONBOARDING_SLIDES)[number];
