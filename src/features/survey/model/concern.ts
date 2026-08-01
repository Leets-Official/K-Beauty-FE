export type Concern = 'MOISTURE' | 'TONE' | 'SENSITIVE' | 'AGING' | 'TROUBLE';

export interface ConcernOption {
  value: Concern;
  label: string;
  caption: string;
}

export const CONCERN_OPTIONS: ConcernOption[] = [
  { value: 'MOISTURE', label: '수분이 부족해요', caption: '촉촉하고 탄탄한 피부를 원해요' },
  { value: 'TONE', label: '피부톤이 고르지 않아요', caption: '잡티나 칙칙함을 개선하고 싶어요' },
  { value: 'SENSITIVE', label: '예민한 편이에요', caption: '자극 없는 순한 제품이 필요해요' },
  { value: 'AGING', label: '처짐·주름·탄력', caption: '탄력있는 피부를 가꾸고 싶어요' },
  { value: 'TROUBLE', label: '트러블·모공', caption: '깨끗하고 매끈한 피부를 원해요' },
];
