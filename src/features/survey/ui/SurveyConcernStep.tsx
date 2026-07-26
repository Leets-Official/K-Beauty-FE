import { useNavigate } from 'react-router';

import { getConcernNextRoute } from '@/features/survey/lib/getNextRoute';
import { CONCERN_OPTIONS, type Concern } from '@/features/survey/model/concern';
import { SURVEY_STEP, SURVEY_TOTAL_STEPS } from '@/features/survey/model/surveyProgress';
import { useSurveyStore } from '@/features/survey/model/useSurveyStore';
import { SurveyOptionCard } from '@/features/survey/ui/SurveyOptionCard';
import {
  SurveyOptionIcon,
  type SurveyOptionIconConfig,
} from '@/features/survey/ui/SurveyOptionIcon';
import { SurveyStepLayout } from '@/features/survey/ui/SurveyStepLayout';
import {
  DropletsIcon,
  ScanFaceIcon,
  ShieldAlertIcon,
  SunIcon,
  TrendingUpIcon,
} from '@/shared/assets/icons';
import { Button } from '@/shared/ui/button';

const CONCERN_ICONS: Record<Concern, SurveyOptionIconConfig> = {
  MOISTURE: {
    Icon: DropletsIcon,
    containerClassName: 'bg-badge-mint-soft',
    iconClassName: 'text-text-mint',
  },
  TONE: {
    Icon: SunIcon,
    containerClassName: 'bg-apricot-100',
    iconClassName: 'text-accent-apricot',
  },
  SENSITIVE: {
    Icon: ShieldAlertIcon,
    containerClassName: 'bg-primary-100',
    iconClassName: 'text-action-primary',
  },
  AGING: {
    Icon: TrendingUpIcon,
    containerClassName: 'bg-lavender-100',
    iconClassName: 'text-lavender-600',
  },
  TROUBLE: {
    Icon: ScanFaceIcon,
    containerClassName: 'bg-apricot-100',
    iconClassName: 'text-orange-500',
  },
};

function SurveyConcernStep() {
  const navigate = useNavigate();
  const concern = useSurveyStore((state) => state.concern);
  const setConcern = useSurveyStore((state) => state.setConcern);

  const handleSelect = (value: Concern) => {
    setConcern(value);
  };

  return (
    <SurveyStepLayout
      title={
        <>
          어떤 고민이
          <br />
          가장 크신가요?
        </>
      }
      description="그 고민을 같이 해결해드릴게요"
      contentRole="radiogroup"
      contentLabel="피부 고민"
      currentStep={SURVEY_STEP.concern}
      totalSteps={SURVEY_TOTAL_STEPS}
      titleClassName="typo-title3 mt-4"
      footer={
        <Button
          className="w-full"
          disabled={!concern}
          onClick={() => navigate(getConcernNextRoute())}
        >
          다음
        </Button>
      }
    >
      {CONCERN_OPTIONS.map((option) => (
        <SurveyOptionCard
          key={option.value}
          label={option.label}
          caption={option.caption}
          icon={<SurveyOptionIcon {...CONCERN_ICONS[option.value]} />}
          selected={concern === option.value}
          onSelect={() => handleSelect(option.value)}
          variant="large"
        />
      ))}
    </SurveyStepLayout>
  );
}

export { SurveyConcernStep };
