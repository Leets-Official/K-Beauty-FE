import type { ComponentProps } from 'react';

import { NoticeAlertIcon, UnassessedInfoIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

import type { RecommendationProduct } from '@/features/recommendation/model/recommendation';

interface RecommendationEasyViewProps extends ComponentProps<'div'> {
  product: RecommendationProduct;
}

function RecommendationEasyView({ className, product, ...props }: RecommendationEasyViewProps) {
  return (
    <div className={cn('mt-3 flex flex-col gap-2', className)} {...props}>
      <ul className="flex flex-col gap-2">
        {product.easyGuide.map((guide) => (
          <li key={guide} className="typo-caption1 text-text-primary flex gap-2">
            <span className="bg-accent-mint mt-1.5 size-1.5 shrink-0 rounded-full" />
            {guide}
          </li>
        ))}
      </ul>
      <div className="bg-primary-50 text-action-primary typo-caption2 flex w-fit max-w-full items-center gap-2 rounded-full px-3 py-2">
        <NoticeAlertIcon aria-hidden="true" className="size-3 shrink-0" />
        <p>{product.notice}</p>
      </div>
      <div className="bg-badge-neutral text-text-secondary typo-caption2 flex w-fit max-w-full items-center gap-2 rounded-full px-3 py-2">
        <UnassessedInfoIcon aria-hidden="true" className="size-3 shrink-0" />
        <p>{product.assessmentNote}</p>
      </div>
    </div>
  );
}

export { RecommendationEasyView, type RecommendationEasyViewProps };
