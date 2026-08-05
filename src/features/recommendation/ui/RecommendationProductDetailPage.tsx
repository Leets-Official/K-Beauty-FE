import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router';

import {
  findRecommendationProduct,
  formatRecommendationReason,
} from '@/features/recommendation/lib';
import {
  useCurrentRecommendationQuery,
  useSharedRecommendationQuery,
} from '@/features/recommendation/model';
import { useSurveyStore } from '@/features/survey/model/useSurveyStore';
import { BackIcon, FlaskConicalIcon, HeartIcon, NoticeAlertIcon } from '@/shared/assets/icons';
import { Button, buttonVariants } from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';
import { formatPrice } from '@/shared/utils/format';

import { ProductVisual } from './ProductVisual';

function RecommendationProductDetailPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const shareToken = searchParams.get('share');
  const currentRecommendationQuery = useCurrentRecommendationQuery(!shareToken);
  const sharedRecommendationQuery = useSharedRecommendationQuery(shareToken);
  const isSharedRecommendation = Boolean(shareToken);
  const recommendationQuery = isSharedRecommendation
    ? sharedRecommendationQuery
    : currentRecommendationQuery;
  const concern = useSurveyStore((state) => state.concern);
  const parsedProductId = Number(productId);
  const recommendationPath = shareToken
    ? `/recommendation?share=${encodeURIComponent(shareToken)}`
    : '/recommendation';

  if (recommendationQuery.isPending) {
    return (
      <main className="bg-background-canvas flex min-h-dvh items-center justify-center px-6">
        <p role="status" className="typo-body1 text-text-secondary">
          제품 정보를 불러오는 중이에요.
        </p>
      </main>
    );
  }

  if (recommendationQuery.isError) {
    return (
      <main className="bg-background-canvas flex min-h-dvh flex-col items-center justify-center gap-4 px-6">
        <p className="typo-body1 text-text-secondary">제품 정보를 불러오지 못했어요.</p>
        <div className="flex gap-3">
          <Button type="button" onClick={() => recommendationQuery.refetch()}>
            다시 시도하기
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/', { replace: true })}
          >
            설문 다시 시작하기
          </Button>
        </div>
      </main>
    );
  }

  const result = Number.isSafeInteger(parsedProductId)
    ? findRecommendationProduct(recommendationQuery.data.steps, parsedProductId)
    : undefined;

  if (!result) {
    return <Navigate to={recommendationPath} replace />;
  }

  const { product, stepId } = result;

  return (
    <main className="bg-background-canvas min-h-dvh pb-36">
      <header className="bg-surface-default sticky top-0 z-10 flex h-14 items-center gap-2 px-4">
        <button
          type="button"
          aria-label="추천 결과로 돌아가기"
          onClick={() => navigate(recommendationPath)}
          className="bg-background-subtle text-text-secondary flex size-9 items-center justify-center rounded-full"
        >
          <BackIcon aria-hidden="true" className="size-4" />
        </button>
        <h1 className="typo-body1 text-text-primary font-bold">제품 상세</h1>
      </header>

      <ProductVisual
        stepId={stepId}
        name={product.name}
        imageUrl={product.imageUrl}
        className="h-[25.2rem] rounded-none"
      />

      <section className="bg-surface-default px-5 py-4">
        <p className="typo-caption2 text-text-secondary">{product.brand}</p>
        <h2 className="typo-body1 text-text-primary mt-1 font-bold">{product.name}</h2>
      </section>

      <div className="flex flex-col gap-6 px-5 py-5">
        <section className="border-border-action-soft bg-primary-50 rounded-2xl border p-4">
          <h2 className="typo-caption1 text-action-primary mb-2 flex items-center gap-1.5">
            <HeartIcon aria-hidden="true" className="size-3" />내 피부에 추천한 이유
          </h2>
          <p className="typo-caption1 text-text-primary">
            {formatRecommendationReason(isSharedRecommendation ? null : concern, product.tags)}
          </p>
        </section>

        <section aria-labelledby="ingredients-title">
          <h2
            id="ingredients-title"
            className="typo-caption1 text-text-primary mb-2 flex items-center gap-1.5 font-bold"
          >
            <FlaskConicalIcon aria-hidden="true" className="text-text-lavender size-4" />
            핵심 성분
          </h2>
          <ol className="flex flex-col gap-2">
            {product.ingredients.map((ingredient, index) => (
              <li
                key={ingredient.ingredientId}
                className="border-lavender-100 bg-surface-default typo-caption1 text-text-primary flex items-center gap-3 rounded-2xl border px-3 py-3"
              >
                <span className="bg-lavender-100 text-text-lavender flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold">
                  {index + 1}
                </span>
                {ingredient.name}
              </li>
            ))}
          </ol>
        </section>

        {product.notices.length > 0 ? (
          <section aria-labelledby="notice-title">
            <h2
              id="notice-title"
              className="typo-caption1 text-text-primary mb-3 flex items-center gap-1.5 font-bold"
            >
              <NoticeAlertIcon aria-hidden="true" className="text-action-primary size-4" />
              주의사항
            </h2>
            <ul className="flex flex-col gap-2">
              {product.notices.map((notice) => (
                <li
                  key={notice}
                  className="border-border-action-soft bg-primary-50/30 text-text-secondary typo-caption1 flex items-center gap-2 rounded-2xl border px-4 py-4"
                >
                  <NoticeAlertIcon
                    aria-hidden="true"
                    className="text-action-primary size-4 shrink-0"
                  />
                  {notice}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>

      <footer className="bg-surface-default fixed right-0 bottom-0 left-0 z-10 mx-auto w-full max-w-[var(--app-mobile-width)] rounded-t-[28px] px-5 pt-4 pb-[max(20px,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgb(61_43_31_/_8%)]">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="typo-caption2 text-text-muted">최저가</p>
            <p className="typo-title2 text-action-primary">{formatPrice(product.price)}</p>
          </div>
        </div>
        {product.purchaseUrl ? (
          <a
            href={product.purchaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${product.name} 구매 페이지 새 탭에서 열기`}
            className={cn(buttonVariants(), 'w-full')}
          >
            구매하기
          </a>
        ) : (
          <Button type="button" className="w-full" disabled>
            구매 링크가 없어요
          </Button>
        )}
      </footer>
    </main>
  );
}

export { RecommendationProductDetailPage };
