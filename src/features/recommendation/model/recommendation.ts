export interface RecommendationProduct {
  id: string;
  brand: string;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  description: string;
  reason: string;
  easyGuide: string[];
  notice: string;
  assessmentNote: string;
  tags: string[];
}

export interface RecommendationStep {
  id: number;
  purpose: string;
  category: string;
  product: RecommendationProduct;
  candidates: RecommendationProduct[];
}

export const RECOMMENDATION_STEPS: RecommendationStep[] = [
  {
    id: 1,
    purpose: '피부결 정돈',
    category: '스킨 · 토너',
    product: {
      id: 'anua-heartleaf-toner',
      brand: 'ANUA',
      name: '허니문 글로우 세이브 더 퀸 토너',
      price: 28000,
      rating: 4.8,
      reviewCount: 12400,
      description: '다른 후보 보기에 사용할 설명문이에요',
      reason: '수분 부족 고민에 맞게 히알루론산과 판테놀이 즉각적으로 수분을 채워줘요.',
      easyGuide: [
        '빠른 흡수로 끈적임 없이 촉촉함을 유지',
        '나이아신아마이드로 피부 톤 균일하게 정돈',
      ],
      notice: '향료 성분이 포함되어 있어 민감한 피부는 패치 테스트 권장',
      assessmentNote: 'UNASSESSED · 주요 성분 정보를 확인했어요.',
      tags: ['히알루로산', '판테놀', '나이아신아마이드'],
    },
    candidates: [
      {
        id: 'some-by-mi-miracle-toner',
        brand: 'SOME BY MI',
        name: 'AHA BHA PHA 30 데이즈 미라클 토너',
        price: 18000,
        rating: 4.6,
        reviewCount: 20000,
        description: '각질 정돈에 특화된 산 복합 토너',
        reason: '각질과 피지 고민을 함께 관리할 수 있는 산 성분 조합이에요.',
        easyGuide: ['묵은 각질을 부드럽게 정돈해요.', '산뜻한 사용감으로 번들거림을 줄여줘요.'],
        notice: '산 성분이 포함되어 있어 처음에는 주 2~3회 사용을 권장해요.',
        assessmentNote: 'UNASSESSED · 주요 성분 정보를 확인했어요.',
        tags: ['AHA', 'BHA', 'PHA'],
      },
      {
        id: 'klairs-unscented-toner',
        brand: 'KLAIRS',
        name: '수딩 모이스트 수분 토너',
        price: 19900,
        rating: 4.7,
        reviewCount: 20000,
        description: '민감 피부도 사용 가능한 저자극 보습 토너',
        reason: '민감 피부도 부담 없이 사용할 수 있는 순한 보습 성분을 골랐어요.',
        easyGuide: [
          '무향 제품이라 향에 민감한 피부도 편안해요.',
          '세안 후 피부에 빠르게 수분을 채워줘요.',
        ],
        notice: '특정 식물 추출물에 민감하다면 패치 테스트해 주세요.',
        assessmentNote: 'UNASSESSED · 주요 성분 정보를 확인했어요.',
        tags: ['히알루론산', '알로에베라'],
      },
    ],
  },
  {
    id: 2,
    purpose: '집중 케어',
    category: '에센스 · 세럼',
    product: {
      id: 'cosrx-niacinamide-serum',
      brand: 'COSRX',
      name: '히알루론산 수분 에센스',
      price: 22000,
      rating: 4.7,
      reviewCount: 9800,
      description: '다른 후보 보기에 사용할 설명문이에요',
      reason: '고농축 히알루론산이 피부 깊숙이 수분을 공급하고 장벽을 강화해줘요.',
      easyGuide: ['자세히 보기에 사용할 설명문1 이에요', '자세히 보기에 사용할 설명문2 이에요'],
      notice: '자세히 보기시 위험을 알려줄 문구에요',
      assessmentNote: 'UNASSESSED · 주요 성분 정보를 확인했어요.',
      tags: ['히알루론산', '나이아신아마이드'],
    },
    candidates: [
      {
        id: 'brand 1',
        brand: '대체 브랜드 1',
        name: '대체 상품 1',
        price: 20000,
        rating: 5.0,
        reviewCount: 20000,
        description: '다른 후보 보기에 사용할 설명문이에요',
        reason: '비슷한 피부 고민을 관리할 수 있는 대체 상품이에요.',
        easyGuide: [
          '가볍게 흡수되어 다음 단계와 함께 쓰기 좋아요.',
          '꾸준히 사용해 피부 컨디션을 관리해요.',
        ],
        notice: '처음 사용할 때는 소량으로 피부 반응을 확인해 주세요.',
        assessmentNote: 'UNASSESSED · 주요 성분 정보를 확인했어요.',
        tags: ['태그1', '태그2'],
      },
      {
        id: 'brand 2',
        brand: '대체 브랜드 2',
        name: '대체 상품 2',
        price: 20000,
        rating: 5.0,
        reviewCount: 20000,
        description: '다른 후보 보기에 사용할 설명문이에요',
        reason: '비슷한 피부 고민을 관리할 수 있는 대체 상품이에요.',
        easyGuide: [
          '가볍게 흡수되어 다음 단계와 함께 쓰기 좋아요.',
          '꾸준히 사용해 피부 컨디션을 관리해요.',
        ],
        notice: '처음 사용할 때는 소량으로 피부 반응을 확인해 주세요.',
        assessmentNote: 'UNASSESSED · 주요 성분 정보를 확인했어요.',
        tags: ['태그1', '태그2'],
      },
    ],
  },
  {
    id: 3,
    purpose: '보습 마무리',
    category: '크림',
    product: {
      id: 'beauty-of-joseon-dynasty-cream',
      brand: 'BEAUTY OF JOSEON',
      name: '레브이올 나이트 리페어 세럼',
      price: 22000,
      rating: 4.7,
      reviewCount: 8900,
      description: '다른 후보 보기에 사용할 설명문이에요',
      reason: '레티놀과 나이아신아마이드가 수면 중 피부를 집중 재생하고 탄력을 회복시켜주요.',
      easyGuide: ['자세히 보기에 사용할 설명문1 이에요', '자세히 보기에 사용할 설명문2 이에요'],
      notice: '자세히 보기시 위험을 알려줄 문구에요',
      assessmentNote: 'UNASSESSED · 주요 성분 정보를 확인했어요.',
      tags: ['레티놀 0.1%', '나이아신아마이드'],
    },
    candidates: [
      {
        id: 'brand 3',
        brand: '대체 브랜드 3',
        name: '대체 상품 3',
        price: 20000,
        rating: 5.0,
        reviewCount: 20000,
        description: '다른 후보 보기에 사용할 설명문이에요',
        reason: '보습과 탄력 고민을 함께 관리할 수 있는 대체 상품이에요.',
        easyGuide: [
          '스킨케어 마지막 단계에서 부드럽게 펴 발라요.',
          '건조한 부위에는 한 번 더 덧발라요.',
        ],
        notice: '처음 사용할 때는 소량으로 피부 반응을 확인해 주세요.',
        assessmentNote: 'UNASSESSED · 주요 성분 정보를 확인했어요.',
        tags: ['세라마이드', '인삼추출물'],
      },
      {
        id: 'round-lab-birch-cream',
        brand: 'ROUND LAB',
        name: '자작나무 수분 크림',
        price: 20000,
        rating: 5.0,
        reviewCount: 20000,
        description: '다른 후보 보기에 사용할 설명문이에요',
        reason: '수분 부족으로 건조한 피부를 편안하게 마무리해 주는 상품이에요.',
        easyGuide: [
          '자작나무 수액 성분이 피부에 수분을 채워줘요.',
          '가벼운 제형으로 끈적임 없이 마무리돼요.',
        ],
        notice: '자작나무 유래 성분에 민감하다면 패치 테스트해 주세요.',
        assessmentNote: 'UNASSESSED · 주요 성분 정보를 확인했어요.',
        tags: ['태그1', '태그2'],
      },
    ],
  },
];
