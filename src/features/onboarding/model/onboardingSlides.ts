export const ONBOARDING_SLIDES = [
  {
    title: '4~6개의 간단한 질문',
    description: '피부에 대한 몇 가지 질문만으로 나만의 루틴을 시작할 수 있어요',
    circleClassName: 'bg-background-subtle',
    character: {
      size: 156,
      variant: 'radiant',
      detail: 'spark',
      expression: 'curious',
    },
  },
  {
    title: '피부 고민 맞춤 매칭',
    description: '피부 타입과 고민에 맞는 최적의 제품을 찾아드려요',
    circleClassName: 'bg-mint-100',
    character: {
      size: 156,
      variant: 'mint',
      detail: 'drop',
      expression: 'calm',
    },
  },
  {
    title: '전문가 성분 분석',
    description: '복잡한 성분표 없이 전문가가 대신 분석해 드려요',
    circleClassName: 'bg-lavender-100',
    character: {
      size: 156,
      variant: 'lavender',
      detail: 'none',
      expression: 'happy',
    },
  },
] as const;

export type OnboardingSlideData = (typeof ONBOARDING_SLIDES)[number];
