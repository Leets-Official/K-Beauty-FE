import { Progress as ProgressPrimitive } from '@base-ui/react/progress';

import { cn } from '@/shared/utils/cn';

function Progress({ className, children, style, value, ...props }: ProgressPrimitive.Root.Props) {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      className={cn('flex flex-wrap gap-3', className)}
      style={{
        position: 'relative',
        width: '576px',
        height: '143px',
        maxWidth: '100%',
        ...style,
      }}
      {...props}
    >
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  );
}

function ProgressTrack({ className, style, ...props }: ProgressPrimitive.Track.Props) {
  return (
    <ProgressPrimitive.Track
      className={cn(
        'bg-secondary-blush relative h-3 w-full overflow-hidden rounded-full',
        className,
      )}
      data-slot="progress-track"
      style={style}
      {...props}
    />
  );
}

function ProgressIndicator({ className, style, ...props }: ProgressPrimitive.Indicator.Props) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn('bg-primary-gradient h-full transition-all duration-500 ease-out', className)}
      style={style}
      {...props}
    />
  );
}

function ProgressLabel({ className, style, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      className={cn('typo-caption1 text-secondary-mist', className)}
      data-slot="progress-label"
      style={style}
      {...props}
    />
  );
}

function ProgressValue({ className, style, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      className={cn('typo-caption1 text-secondary-mist ml-auto tabular-nums', className)}
      data-slot="progress-value"
      style={style}
      {...props}
    />
  );
}

export { Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue };
