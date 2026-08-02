import { formatRatingStars } from '@/features/recommendation/lib/formatRatingStars';
import { NoticeAlertIcon, SparkleIcon, SwapIcon, UnassessedInfoIcon } from '@/shared/assets/icons';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { ProductBottle, type BottleTone } from '@/shared/ui/ProductBottle';
import { cn } from '@/shared/utils/cn';
import { formatPrice } from '@/shared/utils/format';

import type { RecommendationProduct } from '@/features/recommendation/model/recommendation';

const PRODUCT_TONES: BottleTone[] = ['mint', 'lavender', 'apricot'];

interface ProductVisualProps extends React.ComponentProps<'div'> {
  stepId: number;
  name: string;
}

function ProductVisual({ className, stepId, name, ...props }: ProductVisualProps) {
  const tone = PRODUCT_TONES[stepId - 1] ?? 'mint';
  const variant = stepId === 2 ? 'serum' : 'toner';

  return (
    <div
      className={cn(
        'bg-background-subtle relative flex h-36 items-center justify-center overflow-hidden rounded-2xl',
        className,
      )}
      {...props}
    >
      <div className="bg-surface-default/60 absolute -top-8 -left-5 size-28 rounded-full" />
      <div className="bg-accent-petal/50 absolute -right-4 -bottom-10 size-32 rounded-full" />
      <ProductBottle variant={variant} tone={tone} size={116} title={name} className="relative" />
      {stepId === 2 ? (
        <ProductBottle
          variant="serum"
          tone="mint"
          size={72}
          aria-hidden="true"
          className="relative -ml-6 translate-y-4"
        />
      ) : null}
    </div>
  );
}

function Rating({ rating, reviewCount }: Pick<RecommendationProduct, 'rating' | 'reviewCount'>) {
  return (
    <div className="typo-caption2 flex items-center gap-1" aria-label={`평점 ${rating}점`}>
      <span className="text-accent-apricot tracking-wider" aria-hidden="true">
        {formatRatingStars(rating)}
      </span>
      <span className="text-text-secondary">
        {rating.toFixed(1)} ({reviewCount.toLocaleString('ko-KR')}개 리뷰)
      </span>
    </div>
  );
}

interface IngredientTagsProps extends Pick<RecommendationProduct, 'tags'> {
  variant?: 'lavender' | 'brown';
}

function IngredientTags({ tags, variant = 'lavender' }: IngredientTagsProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <Badge key={tag} variant={variant} className="font-sans">
          {tag}
        </Badge>
      ))}
    </div>
  );
}

interface RecommendedProductSummaryProps {
  stepId: number;
  product: RecommendationProduct;
}

function RecommendedProductSummary({ stepId, product }: RecommendedProductSummaryProps) {
  return (
    <div className="flex flex-col gap-3">
      <ProductVisual stepId={stepId} name={product.name} />

      <div>
        <p className="typo-caption2 text-text-secondary">{product.brand}</p>
        <h3 className="typo-body1 text-text-primary font-bold">{product.name}</h3>
        <Rating rating={product.rating} reviewCount={product.reviewCount} />
        <p className="typo-title2 text-action-primary mt-1">{formatPrice(product.price)}</p>
      </div>

      <div className="bg-background-subtle rounded-2xl p-3">
        <p className="typo-caption1 text-action-primary mb-1 flex items-center gap-1">
          <SparkleIcon aria-hidden="true" className="size-3" />
          나에게 추천한 이유
        </p>
        <p className="typo-caption1 text-text-primary">{product.reason}</p>
      </div>
    </div>
  );
}

function RecommendationEasyView({ product }: { product: RecommendationProduct }) {
  return (
    <div className="mt-3 flex flex-col gap-2">
      <ul className="flex flex-col gap-2">
        {product.easyGuide.map((guide) => (
          <li key={guide} className="typo-caption1 text-text-primary flex gap-2">
            <span className="bg-accent-mint mt-1.5 size-1.5 shrink-0 rounded-full" />
            {guide}
          </li>
        ))}
      </ul>
      <div className="bg-primary-50 text-action-primary typo-caption2 flex w-fit max-w-full items-center gap-2 rounded-full px-3 py-2">
        <NoticeAlertIcon aria-hidden="true" className="size-3 shrink-0" />
        <p>{product.notice}</p>
      </div>
      <div className="bg-badge-neutral text-text-secondary typo-caption2 flex w-fit max-w-full items-center gap-2 rounded-full px-3 py-2">
        <UnassessedInfoIcon aria-hidden="true" className="size-3 shrink-0" />
        <p>{product.assessmentNote}</p>
      </div>
    </div>
  );
}

interface CandidateCardProps {
  product: RecommendationProduct;
  onReplace: () => void;
}

function CandidateCard({ product, onReplace }: CandidateCardProps) {
  return (
    <article className="border-border-subtle bg-surface-candidate rounded-2xl border p-3">
      <div className="mb-1 flex items-start justify-between gap-3">
        <div>
          <p className="typo-caption2 text-text-secondary">{product.brand}</p>
          <h4 className="typo-caption1 text-text-primary font-bold">{product.name}</h4>
        </div>
        <span className="typo-caption1 text-action-primary shrink-0">
          {formatPrice(product.price)}
        </span>
      </div>
      <Rating rating={product.rating} reviewCount={product.reviewCount} />
      <p className="typo-caption2 text-text-secondary my-2">{product.description}</p>
      <IngredientTags tags={product.tags} variant="brown" />
      <Button type="button" variant="secondary" className="mt-3 h-10 w-full" onClick={onReplace}>
        <SwapIcon aria-hidden="true" />이 제품으로 교체하기
      </Button>
    </article>
  );
}

interface RecommendationCandidatesProps {
  candidates: RecommendationProduct[];
  onReplaceProduct: (productId: string) => void;
}

function RecommendationCandidates({ candidates, onReplaceProduct }: RecommendationCandidatesProps) {
  return (
    <div className="flex flex-col gap-2 px-4 pb-4">
      {candidates.map((candidate) => (
        <CandidateCard
          key={candidate.id}
          product={candidate}
          onReplace={() => onReplaceProduct(candidate.id)}
        />
      ))}
    </div>
  );
}

export {
  IngredientTags,
  ProductVisual,
  Rating,
  RecommendationCandidates,
  RecommendationEasyView,
  RecommendedProductSummary,
};
