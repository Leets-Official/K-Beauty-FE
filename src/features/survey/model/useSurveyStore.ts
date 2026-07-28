import { create } from 'zustand';

import type { Concern } from '@/features/survey/model/concern';
import type { ProductDiscomfortType } from '@/features/survey/model/productDiscomfort';
import type { ResearchPreference } from '@/features/survey/model/researchPreference';
import type { Sensitivity } from '@/features/survey/model/sensitivity';
import type { SkinType } from '@/features/survey/model/skinType';

interface SurveyState {
  concern: Concern | null;
  skinType: SkinType | null;
  sensitive: Sensitivity | null;
  discomfortTypes: ProductDiscomfortType[];
  research: ResearchPreference | null;
  setConcern: (concern: Concern) => void;
  setSkinType: (skinType: SkinType) => void;
  setSensitive: (sensitive: Sensitivity) => void;
  setDiscomfortTypes: (discomfortTypes: ProductDiscomfortType[]) => void;
  setResearch: (research: ResearchPreference) => void;
  reset: () => void;
}

const initialState = {
  concern: null,
  skinType: null,
  sensitive: null,
  discomfortTypes: [],
  research: null,
} satisfies Pick<
  SurveyState,
  'concern' | 'skinType' | 'sensitive' | 'discomfortTypes' | 'research'
>;

export const useSurveyStore = create<SurveyState>((set) => ({
  ...initialState,
  setConcern: (concern) => set({ concern }),
  setSkinType: (skinType) => set({ skinType }),
  setSensitive: (sensitive) => set({ sensitive }),
  setDiscomfortTypes: (discomfortTypes) => set({ discomfortTypes }),
  setResearch: (research) => set({ research }),
  reset: () => set(initialState),
}));
