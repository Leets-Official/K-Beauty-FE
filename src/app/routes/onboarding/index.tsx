import * as React from 'react';

import { BlobCharacter } from '@/shared/ui/BlobCharacter';
import { OptionCard } from '@/shared/ui/OptionCard';

const skinTypes = [
  {
    id: 'dry',
    label: '건성',
    caption: '세안 후 당김이 느껴져요',
    variant: 'lavender',
    expression: 'calm',
    detail: 'spark',
  },
  {
    id: 'oily',
    label: '지성',
    caption: '피부가 쉽게 번들거려요',
    variant: 'mint',
    expression: 'curious',
    detail: 'drop',
  },
  {
    id: 'combination',
    label: '복합성',
    caption: '부위마다 상태가 달라요',
    variant: 'apricot',
    expression: 'happy',
    detail: 'spark',
  },
  {
    id: 'sensitive',
    label: '민감성',
    caption: '자극에 민감한 편이에요',
    variant: 'petal',
    expression: 'worried',
    detail: 'leaf',
  },
] as const;

export default function OnboardingRoute() {
  const [selectedSkinType, setSelectedSkinType] = React.useState<string>();

  return (
    <main className="bg-background text-foreground min-h-dvh">
      <div className="mx-auto flex min-h-dvh w-full max-w-[var(--app-mobile-width)] flex-col px-5 py-8">
        <p className="typo-caption1 text-primary">ABOUT YOU</p>
        <h1 className="typo-title1 mt-2">피부 타입을 알려주세요</h1>
        <p className="typo-body1 text-text-muted mt-2">가장 가까운 타입 하나를 선택해주세요.</p>

        <div className="mt-8 grid grid-cols-1 justify-items-center gap-3" role="radiogroup">
          {skinTypes.map((skinType) => {
            return (
              <OptionCard
                key={skinType.id}
                label={skinType.label}
                caption={skinType.caption}
                icon={
                  <BlobCharacter
                    variant={skinType.variant}
                    expression={skinType.expression}
                    detail={skinType.detail}
                    size={36}
                  />
                }
                selected={selectedSkinType === skinType.id}
                selectionMode="single"
                onClick={() => setSelectedSkinType(skinType.id)}
                className="w-full max-w-[320px]"
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
