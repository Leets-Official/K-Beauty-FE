import type { Concern } from '@/features/survey/model/concern';

const CONCERN_REASON: Record<Concern, { concern: string; benefit: string }> = {
  MOISTURE: {
    concern: '수분 부족 고민',
    benefit: '즉각적으로 수분을 채워줘요.',
  },
  TONE: {
    concern: '피부톤 고민',
    benefit: '피부톤을 고르게 해줘요.',
  },
  SENSITIVE: {
    concern: '민감 피부 고민',
    benefit: '피부를 편안하게 진정시켜줘요.',
  },
  AGING: {
    concern: '탄력 고민',
    benefit: '피부 탄력 관리에 도움을 줘요.',
  },
  TROUBLE: {
    concern: '트러블·모공 고민',
    benefit: '피부를 깨끗하고 매끈하게 관리해줘요.',
  },
};

function hasBatchim(text: string) {
  const code = text.trim().at(-1)?.charCodeAt(0);
  return code !== undefined && code >= 0xac00 && code <= 0xd7a3 && (code - 0xac00) % 28 > 0;
}

function formatIngredients(tags: string[]) {
  const [first, second] = tags;

  if (first && second) {
    return `${first}${hasBatchim(first) ? '과' : '와'} ${second}${hasBatchim(second) ? '이' : '가'}`;
  }

  if (first) {
    return `${first}${hasBatchim(first) ? '이' : '가'}`;
  }

  return '주요 성분이';
}

function formatRecommendationReason(concern: Concern | null, tags: string[]) {
  const reason = concern
    ? CONCERN_REASON[concern]
    : { concern: '피부 고민', benefit: '피부를 건강하게 관리해줘요.' };

  return `${reason.concern}에 맞춰 ${formatIngredients(tags)} ${reason.benefit}`;
}

export { formatRecommendationReason };
