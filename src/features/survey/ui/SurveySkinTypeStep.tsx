import { useState } from 'react';
import { useNavigate } from 'react-router';

import { getSkinTypeNextRoute } from '@/features/survey/lib/getNextRoute';
import { SKIN_TYPE_OPTIONS, type SkinType } from '@/features/survey/model/skinType';
import { SURVEY_STEP, SURVEY_TOTAL_STEPS } from '@/features/survey/model/surveyProgress';
import { SURVEY_ROUTES } from '@/features/survey/model/surveyRoutes';
import { useSurveyStore } from '@/features/survey/model/useSurveyStore';
import { SkinTypeGuideBottomSheet } from '@/features/survey/ui/SkinTypeGuideBottomSheet';
import { SurveyOptionCard } from '@/features/survey/ui/SurveyOptionCard';
import {
  SurveyOptionIcon,
  type SurveyOptionIconConfig,
} from '@/features/survey/ui/SurveyOptionIcon';
import { SurveyStepLayout } from '@/features/survey/ui/SurveyStepLayout';
import {
  CircleHelpIcon,
  CirclesIcon,
  DropletIcon,
  FlameIcon,
  LayersIcon,
} from '@/shared/assets/icons';
import { Button } from '@/shared/ui/button';

const SKIN_TYPE_ICONS: Record<SkinType, SurveyOptionIconConfig> = {
  DRY: {
    Icon: FlameIcon,
    containerClassName: 'bg-primary-100/60',
    iconClassName: 'text-action-primary',
  },
  OILY: {
    Icon: DropletIcon,
    containerClassName: 'bg-mint-100/70',
    iconClassName: 'text-accent-mint',
  },
  COMBINATION: {
    Icon: CirclesIcon,
    containerClassName: 'bg-apricot-100/60',
    iconClassName: 'text-accent-apricot',
  },
  DEHYDRATED_OILY: {
    Icon: LayersIcon,
    containerClassName: 'bg-lavender-100/70',
    iconClassName: 'text-lavender-600',
  },
  UNKNOWN: {
    Icon: CircleHelpIcon,
    containerClassName: 'bg-neutral-150/80',
    iconClassName: 'text-text-secondary',
  },
};

function SurveySkinTypeStep() {
  const navigate = useNavigate();
  const skinType = useSurveyStore((state) => state.skinType);
  const setSkinType = useSurveyStore((state) => state.setSkinType);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const handleSelect = (value: SkinType) => {
    setSkinType(value);

    if (value === 'UNKNOWN') {
      setIsGuideOpen(true);
    }
  };

  const handleGuideSelect = (value: Exclude<SkinType, 'UNKNOWN'>) => {
    setSkinType(value);
    setIsGuideOpen(false);
  };

  const handleRecommendAsUnknown = () => {
    setSkinType('UNKNOWN');
    setIsGuideOpen(false);
    navigate(SURVEY_ROUTES.skinType);
  };

  return (
    <>
      <SurveyStepLayout
        title={
          <>
            어떤 피부를
            <br />
            가지고 계신가요?
          </>
        }
        description="바로 추천해 드릴게요"
        contentRole="radiogroup"
        contentLabel="피부 타입"
        currentStep={SURVEY_STEP.skinType}
        totalSteps={SURVEY_TOTAL_STEPS}
        className="pt-control-lg px-7 pb-12"
        titleClassName="typo-title3 mt-8"
        descriptionClassName="typo-body1 text-text-muted mt-3"
        contentClassName="mt-5"
        footerClassName="gap-2"
        footer={
          <>
            <div className="flex items-center gap-3">
              <span className="bg-primary-200 h-px flex-1" />
              <span className="typo-caption1 text-text-muted">또는</span>
              <span className="bg-primary-200 h-px flex-1" />
            </div>

            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="h-control-lg flex-1 border-2 px-3"
                disabled={!skinType}
                onClick={() => navigate(getSkinTypeNextRoute('detail'))}
              >
                더 자세히 알아보고 싶어요
              </Button>
              <Button
                variant="secondary"
                className="h-control-lg flex-1 border-2 px-3"
                disabled={!skinType}
                onClick={() => navigate(getSkinTypeNextRoute('recommend'))}
              >
                바로 추천해주세요
              </Button>
            </div>
          </>
        }
      >
        {SKIN_TYPE_OPTIONS.map((option) => (
          <SurveyOptionCard
            key={option.value}
            label={option.label}
            caption={option.caption}
            icon={
              <SurveyOptionIcon {...SKIN_TYPE_ICONS[option.value]} iconSizeClassName="size-5" />
            }
            selected={skinType === option.value}
            onSelect={() => handleSelect(option.value)}
            variant="skinType"
          />
        ))}
      </SurveyStepLayout>

      <SkinTypeGuideBottomSheet
        open={isGuideOpen}
        onOpenChange={setIsGuideOpen}
        onSelect={handleGuideSelect}
        onRecommendAsUnknown={handleRecommendAsUnknown}
      />
    </>
  );
}

export { SurveySkinTypeStep };
