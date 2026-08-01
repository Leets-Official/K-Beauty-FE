// 설문 전체 진행 단계(concern → research). 총 5단계로 고정한다.
// 분기(skin-type '바로 추천', sensitive '아니요')로 일부 단계를 건너뛰더라도
// 각 화면의 단계 번호는 고정된 위치를 사용한다.
export const SURVEY_TOTAL_STEPS = 5;

export const SURVEY_STEP = {
  concern: 1,
  skinType: 2,
  sensitive: 3,
  discomfort: 4,
  research: 5,
} as const;
