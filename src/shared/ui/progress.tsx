import { Progress as ProgressPrimitive } from '@base-ui/react/progress';

import { cn } from '@/shared/utils/cn';

const progressIndicatorBackground =
  'linear-gradient(90deg, #F77B6A 0%, #F7816A 7.14%, #F88669 14.29%, #F88B69 21.43%, #F89169 28.57%, #F89668 35.71%, #F89B67 42.86%, #F8A067 50%, #F8A566 57.14%, #F8AA66 64.29%, #F8AF65 71.43%, #F8B464 78.57%, #F8B963 85.71%, #F7BE62 92.86%, #F7C361 100%)';

const progressTextStyle = {
  color: '#C4B5AE',
  fontFamily: 'Menlo, monospace',
  fontSize: '11px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '16px',
};

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
      className={cn('relative h-3 w-full overflow-hidden rounded-full', className)}
      data-slot="progress-track"
      style={{
        background: '#F0E6E1',
        ...style,
      }}
      {...props}
    />
  );
}

function ProgressIndicator({ className, style, ...props }: ProgressPrimitive.Indicator.Props) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn('h-full transition-all', className)}
      style={{
        background: progressIndicatorBackground,
        ...style,
      }}
      {...props}
    />
  );
}

function ProgressLabel({ className, style, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      className={cn(className)}
      data-slot="progress-label"
      style={{
        ...progressTextStyle,
        ...style,
      }}
      {...props}
    />
  );
}

function ProgressValue({ className, style, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      className={cn('ml-auto tabular-nums', className)}
      data-slot="progress-value"
      style={{
        ...progressTextStyle,
        ...style,
      }}
      {...props}
    />
  );
}

export { Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue };
