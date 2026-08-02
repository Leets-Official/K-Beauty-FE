import { Badge } from '@/shared/ui/badge';
import { cn } from '@/shared/utils/cn';

import type { RecommendationProduct } from '@/features/recommendation/model/recommendation';

interface IngredientTagsProps
  extends React.ComponentProps<'div'>, Pick<RecommendationProduct, 'tags'> {
  variant?: 'lavender' | 'brown';
}

function IngredientTags({ className, tags, variant = 'lavender', ...props }: IngredientTagsProps) {
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)} {...props}>
      {tags.map((tag) => (
        <Badge key={tag} variant={variant} className="font-sans">
          {tag}
        </Badge>
      ))}
    </div>
  );
}

export { IngredientTags, type IngredientTagsProps };
