import { CircleAlert, ShieldCheck } from 'lucide-react';

import {
  QUESTION_CODE,
  SENSITIVITY_OPTIONS,
  SURVEY_STEP,
  SURVEY_TOTAL_STEPS,
  useSurveyAnswerSubmit,
  useSurveyStore,
  type Sensitivity,
} from '@/features/survey/model';
import {
  SurveyOptionCard,
  SurveyOptionIcon,
  SurveyStepLayout,
  type SurveyOptionIconConfig,
} from '@/features/survey/ui';
import { Button } from '@/shared/ui/button';

const SENSITIVITY_ICONS: Record<Sensitivity, SurveyOptionIconConfig> = {
  SENSITIVE_YES: {
    Icon: CircleAlert,
    containerClassName: 'bg-primary-100/60',
    iconClassName: 'text-action-primary',
  },
  SENSITIVE_NO: {
    Icon: ShieldCheck,
    containerClassName: 'bg-mint-100/70',
    iconClassName: 'text-accent-mint',
  },
};

function SurveySensitiveStep() {
  const sensitive = useSurveyStore((state) => state.sensitive);
  const setSensitive = useSurveyStore((state) => state.setSensitive);
  const { submit, isPending } = useSurveyAnswerSubmit();

  return (
    <SurveyStepLayout
      title={
        <>
          새로운 제품을 쓰면
          <br />
          예민한 편인가요?
        </>
      }
      description="민감도를 파악하면 더 안전한 추천이 가능해요"
      contentRole="radiogroup"
      contentLabel="예민한 편인지 여부"
      currentStep={SURVEY_STEP.sensitive}
      totalSteps={SURVEY_TOTAL_STEPS}
      titleClassName="typo-title3 mt-4"
      descriptionClassName="typo-body2 text-text-secondary mt-3"
      contentClassName="mt-5 gap-3"
      footer={
        <Button
          className="w-full"
          disabled={sensitive === null || isPending}
          onClick={() => sensitive && submit(QUESTION_CODE.sensitive, [sensitive])}
        >
          다음
        </Button>
      }
    >
      {SENSITIVITY_OPTIONS.map((option) => (
        <SurveyOptionCard
          key={option.value}
          label={option.label}
          caption={option.caption}
          icon={<SurveyOptionIcon {...SENSITIVITY_ICONS[option.value]} />}
          selected={sensitive === option.value}
          onSelect={() => !isPending && setSensitive(option.value)}
          disabled={isPending}
          variant="large"
          indicatorClassName="size-6"
        />
      ))}
    </SurveyStepLayout>
  );
}

export { SurveySensitiveStep };
