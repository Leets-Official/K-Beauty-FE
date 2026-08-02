export type ProductDiscomfortType =
  'FRAGRANCE' | 'ALCOHOL' | 'OILY_TEXTURE' | 'EXFOLIATION' | 'UNKNOWN';

export interface ProductDiscomfortOption {
  value: ProductDiscomfortType;
  label: string;
  caption?: string;
}

export const PRODUCT_DISCOMFORT_OPTIONS: ProductDiscomfortOption[] = [
  {
    value: 'FRAGRANCE',
    label: '향이 강한 제품',
  },
  {
    value: 'ALCOHOL',
    label: '알코올 냄새가 강하거나 따가웠던 제품',
  },
  {
    value: 'OILY_TEXTURE',
    label: '오일감이 많은 제품',
  },
  {
    value: 'EXFOLIATION',
    label: '각질 케어 제품 (AHA · BHA)',
  },
  {
    value: 'UNKNOWN',
    label: '잘 모르겠어요',
    caption: '단독 선택만 가능해요',
  },
];
