import { Badge } from '@/shared/ui/badge';
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetTitle,
} from '@/shared/ui/BottomSheet';
import { formatPrice } from '@/shared/utils/format';

import type { RecommendationStep } from '@/features/recommendation/model';

interface RecommendationComparisonBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  steps: RecommendationStep[];
}

function RecommendationComparisonBottomSheet({
  open,
  onOpenChange,
  steps,
}: RecommendationComparisonBottomSheetProps) {
  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      className="[scrollbar-width:none] px-6 pb-[max(32px,env(safe-area-inset-bottom))] [&::-webkit-scrollbar]:hidden"
    >
      <BottomSheetHeader>
        <BottomSheetTitle>핵심 비교 정보</BottomSheetTitle>
      </BottomSheetHeader>

      <BottomSheetContent className="mt-4">
        <table className="w-full table-fixed border-collapse" aria-label="추천 제품 핵심 비교 정보">
          <colgroup>
            <col className="w-[22%]" />
            {steps.map((step) => (
              <col key={step.id} />
            ))}
          </colgroup>

          <thead>
            <tr className="border-border-subtle border-b">
              <th aria-label="비교 항목" />
              {steps.map((step) => (
                <th
                  key={step.id}
                  scope="col"
                  className="px-1.5 pb-4 text-left align-top font-normal"
                >
                  <Badge variant="brown" className="px-2 py-1 text-[10px] font-medium">
                    {step.id}단계
                  </Badge>
                  <span className="typo-caption1 text-text-primary mt-1 block font-bold">
                    {step.purpose}
                  </span>
                  <span className="typo-caption2 text-text-muted mt-0.5 block">
                    {step.category}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              <th
                scope="row"
                className="typo-caption2 text-text-secondary px-1 py-3 text-left align-top font-normal"
              >
                제품
              </th>
              {steps.map(({ id, product }) => (
                <td
                  key={id}
                  className="border-border-subtle border-l px-1.5 py-3 align-top break-keep"
                >
                  <p className="typo-caption2 text-text-muted tracking-[0.08em]">{product.brand}</p>
                  <p className="text-text-primary mt-1 text-[11px] leading-[1.4] font-bold">
                    {product.name}
                  </p>
                </td>
              ))}
            </tr>

            <tr className="bg-primary-50/50">
              <th
                scope="row"
                className="typo-caption2 text-text-secondary px-1 py-3 text-left align-top font-normal"
              >
                가격
              </th>
              {steps.map(({ id, product }) => (
                <td
                  key={id}
                  className="border-border-subtle typo-body1 text-action-primary border-l px-1.5 py-3 align-top font-bold"
                >
                  {formatPrice(product.price)}
                </td>
              ))}
            </tr>

            <tr>
              <th
                scope="row"
                className="typo-caption2 text-text-secondary px-1 py-3 text-left align-top font-normal"
              >
                주요 성분
              </th>
              {steps.map(({ id, product }) => (
                <td key={id} className="border-border-subtle border-l px-1.5 py-3 align-top">
                  <div className="flex flex-wrap gap-1">
                    {product.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="max-w-full px-1 py-1 font-sans text-[9px] leading-none break-all whitespace-normal"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            <tr className="bg-primary-50/50">
              <th
                scope="row"
                className="typo-caption2 text-text-secondary px-1 py-3 text-left align-top font-normal"
              >
                주의사항
              </th>
              {steps.map(({ id, product }) => (
                <td
                  key={id}
                  className="border-border-subtle typo-caption2 text-text-muted border-l px-1.5 py-3 align-top break-keep"
                >
                  {product.notices.length > 0 ? product.notices.join(' · ') : '-'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        <p className="typo-caption2 mt-5 text-center text-neutral-300">
          현재 선택된 제품 기준이에요 · 후보 교체 시 자동 반영돼요
        </p>
      </BottomSheetContent>
    </BottomSheet>
  );
}

export { RecommendationComparisonBottomSheet, type RecommendationComparisonBottomSheetProps };
