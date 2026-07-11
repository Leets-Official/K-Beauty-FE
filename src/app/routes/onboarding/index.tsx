import { useState } from 'react';

import { Progress, ProgressLabel, ProgressValue } from '@/shared/ui/progress';

const progressSteps = [
  { label: '피부 고민 선택', value: 20 },
  { label: '피부 타입 선택', value: 40 },
  { label: '민감도 확인', value: 60 },
  { label: '제품군 선택', value: 80 },
  { label: '추천 결과 준비', value: 100 },
];

export default function OnboardingRoute() {
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = progressSteps[stepIndex];

  const handleNextStep = () => {
    setStepIndex((currentIndex) => (currentIndex + 1) % progressSteps.length);
  };

  return (
    <main className="bg-background text-foreground min-h-screen px-6 py-10">
      <section className="mx-auto flex max-w-xl flex-col gap-6">
        <div className="space-y-2">
          <p className="typo-caption1 text-secondary-rose">ONBOARDING</p>
          <h1 className="typo-title1">복잡한 성분표 없이 추천해요.</h1>
          <p className="typo-body1 text-text-muted">
            진행률 컴포넌트 예시입니다. 현재 단계와 진행률 값을 함께 표시합니다.
          </p>
        </div>

        <Progress value={currentStep.value} className="h-auto w-full gap-3">
          <ProgressLabel>{currentStep.label}</ProgressLabel>
          <ProgressValue />
        </Progress>

        <button
          type="button"
          className="typo-button1 bg-button-gradient text-primary-foreground rounded-lg px-5 py-3 transition-transform active:scale-[0.98]"
          onClick={handleNextStep}
        >
          다음 단계
        </button>
      </section>
    </main>
  );
}
