import { CircleAlert, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router';

import { getSensitiveNextRoute } from '@/features/survey/lib/getNextRoute';
import { SURVEY_STEP, SURVEY_TOTAL_STEPS } from '@/features/survey/model/surveyProgress';
import { useSurveyStore } from '@/features/survey/model/useSurveyStore';
import { SurveyOptionCard } from '@/features/survey/ui/SurveyOptionCard';
import {
  SurveyOptionIcon,
  type SurveyOptionIconConfig,
} from '@/features/survey/ui/SurveyOptionIcon';
import { SurveyStepLayout } from '@/features/survey/ui/SurveyStepLayout';
import { Button } from '@/shared/ui/button';

interface SensitiveOption extends SurveyOptionIconConfig {
  value: boolean;
  label: string;
  caption: string;
}

const SENSITIVE_OPTIONS = [
  {
    value: true,
    label: '네, 쉽게 예민해져요',
    caption: '트러블이나 자극을 자주 느껴요',
    Icon: CircleAlert,
    containerClassName: 'bg-primary-100/60',
    iconClassName: 'text-action-primary',
  },
  {
    value: false,
    label: '아니요, 괜찮아요',
    caption: '웬만한 제품은 다 잘 맞아요',
    Icon: ShieldCheck,
    containerClassName: 'bg-mint-100/70',
    iconClassName: 'text-accent-mint',
  },
] as const satisfies readonly SensitiveOption[];

function SurveySensitiveStep() {
  const navigate = useNavigate();
  const sensitive = useSurveyStore((state) => state.sensitive);
  const setSensitive = useSurveyStore((state) => state.setSensitive);

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
          disabled={sensitive === null}
          onClick={() => navigate(getSensitiveNextRoute(sensitive ?? false))}
        >
          다음
        </Button>
      }
    >
      {SENSITIVE_OPTIONS.map((option) => (
        <SurveyOptionCard
          key={String(option.value)}
          label={option.label}
          caption={option.caption}
          icon={<SurveyOptionIcon {...option} />}
          selected={sensitive === option.value}
          onSelect={() => setSensitive(option.value)}
          variant="large"
          indicatorClassName="size-6"
        />
      ))}
    </SurveyStepLayout>
  );
}

export { SurveySensitiveStep };
