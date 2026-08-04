import {
  RESEARCH_PREFERENCE_OPTIONS,
  type ResearchPreference,
} from '@/features/survey/model/researchPreference';
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
import { BookOpenIcon, EyeIcon, EyeOffIcon } from '@/shared/assets/icons';
import { Button } from '@/shared/ui/button';

const RESEARCH_ICONS: Record<ResearchPreference, SurveyOptionIconConfig> = {
  FREQUENTLY: {
    Icon: BookOpenIcon,
    containerClassName: 'bg-lavender-100/70',
    iconClassName: 'text-text-lavender',
  },
  OCCASIONALLY: {
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
  const research = useSurveyStore((state) => state.research);
  const setResearch = useSurveyStore((state) => state.setResearch);
  const { submit, isPending } = useSurveyAnswerSubmit();

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
          disabled={research === null || isPending}
          onClick={() => research && submit(QUESTION_CODE.research, [research])}
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
          onSelect={() => !isPending && setResearch(option.value)}
          disabled={isPending}
          variant="large"
        />
      ))}
    </SurveyStepLayout>
  );
}

export { SurveyResearchStep };
