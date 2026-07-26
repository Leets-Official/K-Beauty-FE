export type ResearchPreference = 'OFTEN' | 'SOMETIMES' | 'RARELY';

export interface ResearchPreferenceOption {
  value: ResearchPreference;
  label: string;
  caption: string;
}

export const RESEARCH_PREFERENCE_OPTIONS: ResearchPreferenceOption[] = [
  {
    value: 'OFTEN',
    label: '자주 찾아봐요',
    caption: '성분이나 리뷰를 꼼꼼히 확인해요',
  },
  {
    value: 'SOMETIMES',
    label: '가끔 봐요',
    caption: '마음에 드는 제품이 있을 때 확인해요',
  },
  {
    value: 'RARELY',
    label: '거의 안 봐요',
    caption: '주로 추천이나 광고로 선택해요',
  },
];
