export type SkinType = 'DRY' | 'OILY' | 'COMBINATION' | 'DEHYDRATED_OILY' | 'UNKNOWN';

export interface SkinTypeOption {
  value: SkinType;
  label: string;
  caption: string;
}

export const SKIN_TYPE_OPTIONS: SkinTypeOption[] = [
  {
    value: 'DRY',
    label: '건성',
    caption: '항상 건조하고 당김이 있어요',
  },
  {
    value: 'OILY',
    label: '지성',
    caption: '금방 기름기가 생겨요',
  },
  {
    value: 'COMBINATION',
    label: '복합성',
    caption: '부위마다 기름진 곳과 건조한 곳이 달라요',
  },
  {
    value: 'DEHYDRATED_OILY',
    label: '수부지',
    caption: '겉은 기름지지만 피부 속은 건조해요',
  },
  {
    value: 'UNKNOWN',
    label: '잘 모르겠어요',
    caption: '가이드를 보고 알려드릴게요',
  },
];
