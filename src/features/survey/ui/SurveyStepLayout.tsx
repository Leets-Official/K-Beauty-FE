import * as React from 'react';

import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

import { Progress } from '@/shared/ui/progress';
import { cn } from '@/shared/utils/cn';

interface SurveyStepLayoutProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onBack?: () => void;
  contentRole?: React.AriaRole;
  contentLabel?: string;
  currentStep?: number;
  totalSteps?: number;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
}

function SurveyStepLayout({
  title,
  description,
  children,
  footer,
  onBack,
  contentRole,
  contentLabel,
  currentStep,
  totalSteps,
  className,
  titleClassName,
  descriptionClassName,
  contentClassName,
  footerClassName,
}: SurveyStepLayoutProps) {
  const navigate = useNavigate();
  const handleBack = onBack ?? (() => navigate(-1));
  const showProgress = currentStep != null && totalSteps != null && totalSteps > 0;

  const backButton = (
    <button
      type="button"
      aria-label="뒤로가기"
      onClick={handleBack}
      className="text-text-primary -ml-2 flex size-10 shrink-0 items-center justify-center"
    >
      <ChevronLeft className="size-6" />
    </button>
  );

  return (
    <main
      className={cn(
        'mx-auto flex min-h-dvh w-full max-w-[var(--app-mobile-width)] flex-col px-5 pt-4 pb-8',
        className,
      )}
    >
      {showProgress ? (
        <div className="flex items-center gap-3">
          {backButton}
          <div className="flex flex-1 flex-col gap-2">
            <span className="typo-caption1 text-text-secondary">
              {currentStep} / {totalSteps}
            </span>
            <Progress
              value={(currentStep / totalSteps) * 100}
              aria-label={`설문 진행률 ${currentStep} / ${totalSteps}`}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      ) : (
        backButton
      )}

      <h1 className={cn('text-text-primary', titleClassName ?? 'typo-title1 mt-4')}>{title}</h1>
      {description ? (
        <p className={cn(descriptionClassName ?? 'typo-body1 text-text-muted mt-2')}>
          {description}
        </p>
      ) : null}

      <div
        role={contentRole}
        aria-label={contentLabel}
        className={cn('mt-6 flex flex-col gap-3', contentClassName)}
      >
        {children}
      </div>

      {footer ? (
        <div className={cn('mt-auto flex flex-col gap-4 pt-10', footerClassName)}>{footer}</div>
      ) : null}
    </main>
  );
}

export { SurveyStepLayout };
