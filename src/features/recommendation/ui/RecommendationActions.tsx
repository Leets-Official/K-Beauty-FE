import { useNavigate } from 'react-router';

import { CompareIcon, CopyIcon, ResetIcon } from '@/features/recommendation/ui/RecommendationIcons';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';

type RecommendationActionsProps = React.ComponentProps<'div'>;

function RecommendationActions({ className, ...props }: RecommendationActionsProps) {
  const navigate = useNavigate();

  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      <Button type="button" variant="secondary" className="bg-surface-default w-full">
        <CopyIcon aria-hidden="true" />
        추천 결과 텍스트 복사
      </Button>

      <Button type="button" variant="secondary" className="bg-surface-default w-full">
        <CompareIcon aria-hidden="true" />
        핵심 비교 정보 확인
      </Button>

      <Button
        type="button"
        variant="ghost"
        className="text-text-muted mt-1 w-full"
        onClick={() => navigate('/')}
      >
        <ResetIcon aria-hidden="true" />
        처음부터 다시 하기
      </Button>
    </div>
  );
}

export { RecommendationActions, type RecommendationActionsProps };
