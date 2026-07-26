import type { ComponentType, SVGProps } from 'react';

import { cn } from '@/shared/utils/cn';

interface SurveyOptionIconConfig {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  containerClassName: string;
  iconClassName: string;
}

interface SurveyOptionIconProps extends SurveyOptionIconConfig {
  iconSizeClassName?: string;
}

function SurveyOptionIcon({
  Icon,
  containerClassName,
  iconClassName,
  iconSizeClassName = 'size-6',
}: SurveyOptionIconProps) {
  return (
    <span
      className={cn(
        'flex size-12 shrink-0 items-center justify-center rounded-full',
        containerClassName,
      )}
    >
      <Icon aria-hidden="true" focusable="false" className={cn(iconSizeClassName, iconClassName)} />
    </span>
  );
}

export { SurveyOptionIcon, type SurveyOptionIconConfig };
