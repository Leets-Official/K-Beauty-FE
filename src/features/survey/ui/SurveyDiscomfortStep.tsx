import {
  PRODUCT_DISCOMFORT_OPTIONS,
  type ProductDiscomfortType,
} from '@/features/survey/model/productDiscomfort';
import { QUESTION_CODE } from '@/features/survey/model/surveyAnswer';
import { SURVEY_STEP, SURVEY_TOTAL_STEPS } from '@/features/survey/model/surveyProgress';
import { useSurveyAnswerSubmit } from '@/features/survey/model/useSaveSurveyAnswer';
import { useSurveyStore } from '@/features/survey/model/useSurveyStore';
import { SurveyOptionCard } from '@/features/survey/ui/SurveyOptionCard';
import {
  SurveyOptionIcon,
  type SurveyOptionIconConfig,
} from '@/features/survey/ui/SurveyOptionIcon';
import { SurveyStepLayout } from '@/features/survey/ui/SurveyStepLayout';
import {
  CircleHelpIcon,
  DropletsIcon,
  FlaskConicalIcon,
  LayersIcon,
  WindIcon,
} from '@/shared/assets/icons';
import { Button } from '@/shared/ui/button';

const DISCOMFORT_ICONS: Record<ProductDiscomfortType, SurveyOptionIconConfig> = {
  FRAGRANCE: {
    Icon: WindIcon,
    containerClassName: 'bg-lavender-100/70',
    iconClassName: 'text-lavender-600',
  },
  ALCOHOL: {
    Icon: DropletsIcon,
    containerClassName: 'bg-primary-100/60',
    iconClassName: 'text-action-primary',
  },
  OILY_TEXTURE: {
    Icon: LayersIcon,
    containerClassName: 'bg-neutral-150/80',
    iconClassName: 'text-text-muted',
  },
  EXFOLIATION: {
    Icon: FlaskConicalIcon,
    containerClassName: 'bg-mint-100/70',
    iconClassName: 'text-accent-mint',
  },
  UNKNOWN: {
    Icon: CircleHelpIcon,
    containerClassName: 'bg-neutral-150/80',
    iconClassName: 'text-text-secondary',
  },
};

function SurveyDiscomfortStep() {
  const discomfortTypes = useSurveyStore((state) => state.discomfortTypes);
  const setDiscomfortTypes = useSurveyStore((state) => state.setDiscomfortTypes);
  const { submit, isPending } = useSurveyAnswerSubmit();

  const toggle = (value: ProductDiscomfortType) => {
    if (value === 'UNKNOWN') {
      setDiscomfortTypes(discomfortTypes.includes('UNKNOWN') ? [] : ['UNKNOWN']);
      return;
    }

    const knownTypes = discomfortTypes.filter((item) => item !== 'UNKNOWN');

    setDiscomfortTypes(
      knownTypes.includes(value)
        ? knownTypes.filter((item) => item !== value)
        : [...knownTypes, value],
    );
  };

  return (
    <SurveyStepLayout
      title={
        <>
          어떤 제품을 쓸 때
          <br />
          불편했나요?
        </>
      }
      description="해당하는 것을 모두 선택해주세요"
      contentRole="group"
      contentLabel="불편했던 제품 유형"
      currentStep={SURVEY_STEP.discomfort}
      totalSteps={SURVEY_TOTAL_STEPS}
      className="px-7"
      titleClassName="typo-title3 mt-4"
      descriptionClassName="typo-body2 text-text-secondary mt-3"
      contentClassName="mt-5 gap-3"
      footer={
        <Button
          className="w-full"
          disabled={discomfortTypes.length === 0 || isPending}
          onClick={() => submit(QUESTION_CODE.discomfort, discomfortTypes)}
        >
          다음
        </Button>
      }
    >
      {PRODUCT_DISCOMFORT_OPTIONS.map((option) => (
        <SurveyOptionCard
          key={option.value}
          label={option.label}
          caption={option.caption}
          icon={<SurveyOptionIcon {...DISCOMFORT_ICONS[option.value]} />}
          selected={discomfortTypes.includes(option.value)}
          onSelect={() => toggle(option.value)}
          selectionMode="multiple"
          variant="large"
          captionClassName="typo-caption3 text-text-muted"
        />
      ))}
    </SurveyStepLayout>
  );
}

export { SurveyDiscomfortStep };
