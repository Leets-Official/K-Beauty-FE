import { Navigate, useNavigate, useParams } from 'react-router';

import { findRecommendationProduct } from '@/features/recommendation/lib/findRecommendationProduct';
import { RECOMMENDATION_STEPS } from '@/features/recommendation/model/recommendation';
import { ProductVisual, Rating } from '@/features/recommendation/ui/RecommendationProductContent';
import { BackIcon, HeartIcon, NoticeAlertIcon } from '@/shared/assets/icons';
import { buttonVariants } from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';
import { formatPrice } from '@/shared/utils/format';

function RecommendationProductDetailPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const result = productId ? findRecommendationProduct(RECOMMENDATION_STEPS, productId) : undefined;

  if (!result) {
    return <Navigate to="/recommendation" replace />;
  }

  const { product, stepId } = result;
  const naverShoppingUrl = `https://search.shopping.naver.com/search/all?query=${encodeURIComponent(`${product.brand} ${product.name}`)}`;

  return (
    <main className="bg-background-canvas min-h-dvh pb-36">
      <header className="bg-surface-default sticky top-0 z-10 flex h-14 items-center gap-2 px-4">
        <button
          type="button"
          aria-label="추천 결과로 돌아가기"
          onClick={() => navigate('/recommendation')}
          className="bg-background-subtle text-text-secondary flex size-9 items-center justify-center rounded-full"
        >
          <BackIcon aria-hidden="true" className="size-4" />
        </button>
        <h1 className="typo-body1 text-text-primary font-bold">제품 상세</h1>
      </header>

      <ProductVisual stepId={stepId} name={product.name} className="h-56 rounded-none" />

      <section className="bg-surface-default px-5 py-4">
        <p className="typo-caption2 text-text-secondary">{product.brand}</p>
        <h2 className="typo-body1 text-text-primary mt-1 font-bold">{product.name}</h2>
        <Rating rating={product.rating} reviewCount={product.reviewCount} />
      </section>

      <div className="flex flex-col gap-6 px-5 py-5">
        <section className="border-border-action-soft bg-primary-50 rounded-2xl border p-4">
          <h2 className="typo-caption1 text-action-primary flex items-center gap-1.5 font-bold">
            <HeartIcon aria-hidden="true" className="size-3.5 shrink-0" />내 피부에 추천한 이유
          </h2>
          <p className="typo-caption1 text-text-primary mt-2">{product.reason}</p>
        </section>

        <section aria-labelledby="ingredients-title">
          <h2 id="ingredients-title" className="typo-caption1 text-text-primary mb-2 font-bold">
            핵심 성분
          </h2>
          <ol className="flex flex-col gap-2">
            {product.tags.map((tag, index) => (
              <li
                key={tag}
                className="border-lavender-100 bg-surface-default typo-caption1 text-text-primary flex items-center gap-3 rounded-2xl border px-3 py-3"
              >
                <span className="bg-lavender-100 text-text-lavender flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold">
                  {index + 1}
                </span>
                {tag}
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="notice-title">
          <h2
            id="notice-title"
            className="typo-caption1 text-text-primary mb-3 flex items-center gap-1.5 font-bold"
          >
            <NoticeAlertIcon aria-hidden="true" className="text-action-primary size-4" />
            주의사항
          </h2>
          <div className="border-border-action-soft bg-primary-50/30 text-text-muted typo-caption1 flex items-center gap-2 rounded-2xl border px-4 py-4">
            <NoticeAlertIcon aria-hidden="true" className="text-action-primary size-4 shrink-0" />
            <p>{product.notice}</p>
          </div>
        </section>
      </div>

      <footer className="bg-surface-default fixed right-0 bottom-0 left-0 z-10 mx-auto w-full max-w-[var(--app-mobile-width)] rounded-t-[28px] px-5 pt-4 pb-[max(20px,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgb(61_43_31_/_8%)]">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="typo-caption2 text-text-muted">최저가</p>
            <p className="typo-title2 text-action-primary">{formatPrice(product.price)}</p>
          </div>
          <p className="typo-caption2 text-text-muted">네이버 쇼핑 기준</p>
        </div>
        <a
          href={naverShoppingUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${product.name} 네이버 쇼핑 검색 결과 새 탭에서 열기`}
          className={cn(buttonVariants(), 'w-full')}
        >
          구매하기
        </a>
      </footer>
    </main>
  );
}

export { RecommendationProductDetailPage };
