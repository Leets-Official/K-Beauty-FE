import { useNavigate } from 'react-router';

import { getResearchNextRoute } from '@/features/survey/lib/getNextRoute';
import {
  RESEARCH_PREFERENCE_OPTIONS,
  type ResearchPreference,
} from '@/features/survey/model/researchPreference';
import { SURVEY_STEP, SURVEY_TOTAL_STEPS } from '@/features/survey/model/surveyProgress';
import { useSurveyStore } from '@/features/survey/model/useSurveyStore';
import { SurveyOptionCard } from '@/features/survey/ui/SurveyOptionCard';
import {
  SurveyOptionIcon,
  type SurveyOptionIconConfig,
} from '@/features/survey/ui/SurveyOptionIcon';
import { SurveyStepLayout } from '@/features/survey/ui/SurveyStepLayout';
import { BookOpenIcon, EyeIcon, EyeOffIcon } from '@/shared/assets/icons';
import { Button } from '@/shared/ui/button';

const RESEARCH_ICONS: Record<ResearchPreference, SurveyOptionIconConfig> = {
  OFTEN: {
    Icon: BookOpenIcon,
    containerClassName: 'bg-lavender-100/70',
    iconClassName: 'text-text-lavender',
  },
  SOMETIMES: {
    Icon: EyeIcon,
    containerClassName: 'bg-mint-100/70',
    iconClassName: 'text-accent-mint',
  },
  RARELY: {
    Icon: EyeOffIcon,
    containerClassName: 'bg-neutral-150/80',
    iconClassName: 'text-text-muted',
  },
};

function SurveyResearchStep() {
  const navigate = useNavigate();
  const research = useSurveyStore((state) => state.research);
  const setResearch = useSurveyStore((state) => state.setResearch);

  return (
    <SurveyStepLayout
      title={
        <>
          성분이나 리뷰를
          <br />
          찾아보시나요?
        </>
      }
      description="리뷰 탐색 스타일에 맞게 정보를 보여드릴게요"
      contentRole="radiogroup"
      contentLabel="성분이나 리뷰를 찾아보는지 여부"
      currentStep={SURVEY_STEP.research}
      totalSteps={SURVEY_TOTAL_STEPS}
      className="px-6"
      titleClassName="typo-title3 mt-4"
      descriptionClassName="typo-body2 text-text-secondary mt-3"
      contentClassName="mt-5 gap-3"
      footer={
        <Button
          className="w-full"
          disabled={research === null}
          onClick={() => navigate(getResearchNextRoute())}
        >
          다음
        </Button>
      }
    >
      {RESEARCH_PREFERENCE_OPTIONS.map((option) => (
        <SurveyOptionCard
          key={option.value}
          label={option.label}
          caption={option.caption}
          icon={<SurveyOptionIcon {...RESEARCH_ICONS[option.value]} />}
          selected={research === option.value}
          onSelect={() => setResearch(option.value)}
          variant="large"
        />
      ))}
    </SurveyStepLayout>
  );
}

export { SurveyResearchStep };
