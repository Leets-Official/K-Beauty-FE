import type { SkinType } from '@/features/survey/model/skinType';
import {
  BottomSheet,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
} from '@/shared/ui/BottomSheet';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';

type KnownSkinType = Exclude<SkinType, 'UNKNOWN'>;

interface SkinTypeGuide {
  value: KnownSkinType;
  description: string;
  label: string;
  dotClassName: string;
  interactionClassName: string;
  badgeInteractionClassName: string;
}

const SKIN_TYPE_GUIDES: SkinTypeGuide[] = [
  {
    value: 'DRY',
    description: '세안 후 얼굴 전체가 당겨요',
    label: '건성',
    dotClassName: 'bg-accent-mint',
    interactionClassName:
      'hover:border-accent-mint hover:bg-mint-100/30 focus-visible:border-accent-mint focus-visible:bg-mint-100/30',
    badgeInteractionClassName:
      'group-hover:bg-accent-mint group-hover:text-text-inverse group-focus-visible:bg-accent-mint group-focus-visible:text-text-inverse',
  },
  {
    value: 'OILY',
    description: '금방 번들거리고 유분이 많아요',
    label: '지성',
    dotClassName: 'bg-accent-apricot',
    interactionClassName:
      'hover:border-accent-apricot hover:bg-apricot-100/30 focus-visible:border-accent-apricot focus-visible:bg-apricot-100/30',
    badgeInteractionClassName:
      'group-hover:bg-accent-apricot group-hover:text-text-inverse group-focus-visible:bg-accent-apricot group-focus-visible:text-text-inverse',
  },
  {
    value: 'COMBINATION',
    description: 'T존은 번들거리지만 볼은 건조해요',
    label: '복합성',
    dotClassName: 'bg-primary-500',
    interactionClassName:
      'hover:border-action-primary hover:bg-primary-100/30 focus-visible:border-action-primary focus-visible:bg-primary-100/30',
    badgeInteractionClassName:
      'group-hover:bg-action-primary group-hover:text-text-inverse group-focus-visible:bg-action-primary group-focus-visible:text-text-inverse',
  },
  {
    value: 'DEHYDRATED_OILY',
    description: '겉은 번들거리는데 속은 당겨요',
    label: '수부지',
    dotClassName: 'bg-accent-lavender',
    interactionClassName:
      'hover:border-lavender-600 hover:bg-lavender-100/30 focus-visible:border-lavender-600 focus-visible:bg-lavender-100/30',
    badgeInteractionClassName:
      'group-hover:bg-lavender-600 group-hover:text-text-inverse group-focus-visible:bg-lavender-600 group-focus-visible:text-text-inverse',
  },
];

interface SkinTypeGuideBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (skinType: KnownSkinType) => void;
  onRecommendAsUnknown: () => void;
}

function SkinTypeGuideBottomSheet({
  open,
  onOpenChange,
  onSelect,
  onRecommendAsUnknown,
}: SkinTypeGuideBottomSheetProps) {
  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <BottomSheetHeader>
        <div>
          <BottomSheetTitle>피부 타입 가이드</BottomSheetTitle>
          <BottomSheetDescription className="mt-6">
            지금 내 피부 상태와 가장 비슷한 항목을 선택해 주세요.
          </BottomSheetDescription>
        </div>
        <BottomSheetClose aria-label="피부 타입 가이드 닫기" />
      </BottomSheetHeader>

      <BottomSheetContent className="flex flex-col gap-3">
        {SKIN_TYPE_GUIDES.map((guide) => (
          <button
            key={guide.value}
            type="button"
            onClick={() => onSelect(guide.value)}
            className={cn(
              'group border-border-subtle bg-background-canvas flex min-h-[52px] w-full items-center gap-3 rounded-[20px] border px-4 py-3 text-left transition-colors',
              'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
              guide.interactionClassName,
            )}
          >
            <span
              aria-hidden="true"
              className={cn('size-2 shrink-0 rounded-full', guide.dotClassName)}
            />
            <span className="typo-body1 text-text-primary min-w-0 flex-1 font-medium">
              {guide.description}
            </span>
            <span
              className={cn(
                'typo-button2 bg-badge-neutral text-text-secondary shrink-0 rounded-full px-3 py-1.5 transition-colors',
                guide.badgeInteractionClassName,
              )}
            >
              {guide.label}
            </span>
          </button>
        ))}
      </BottomSheetContent>

      <BottomSheetFooter>
        <Button variant="secondary" className="w-full border-2" onClick={onRecommendAsUnknown}>
          이대로 추천받기
        </Button>
      </BottomSheetFooter>
    </BottomSheet>
  );
}

export { SkinTypeGuideBottomSheet };
