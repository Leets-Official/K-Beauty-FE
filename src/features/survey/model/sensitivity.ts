export type Sensitivity = 'SENSITIVE_YES' | 'SENSITIVE_NO';

export interface SensitivityOption {
  value: Sensitivity;
  label: string;
  caption: string;
}

export const SENSITIVITY_OPTIONS: SensitivityOption[] = [
  {
    value: 'SENSITIVE_YES',
    label: '네, 쉽게 예민해져요',
    caption: '트러블이나 자극을 자주 느껴요',
  },
  {
    value: 'SENSITIVE_NO',
    label: '아니요, 괜찮아요',
    caption: '웬만한 제품은 다 잘 맞아요',
  },
];
