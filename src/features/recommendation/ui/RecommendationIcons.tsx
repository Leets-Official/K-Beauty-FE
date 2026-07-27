import { cn } from '@/shared/utils/cn';

type RecommendationIconProps = React.ComponentProps<'svg'>;

function Icon({
  className,
  children,
  ...props
}: RecommendationIconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('size-4', className)}
      {...props}
    >
      {children}
    </svg>
  );
}

function BackIcon(props: RecommendationIconProps) {
  return (
    <Icon {...props}>
      <path d="m15 18-6-6 6-6" />
    </Icon>
  );
}

function SparkleIcon(props: RecommendationIconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3c0 4.5-2.5 7-7 7 4.5 0 7 2.5 7 7 0-4.5 2.5-7 7-7-4.5 0-7-2.5-7-7Z" />
      <path d="M5 16v4M3 18h4M19 3v3M17.5 4.5h3" />
    </Icon>
  );
}

function ChevronIcon(props: RecommendationIconProps) {
  return (
    <Icon {...props}>
      <path d="m7 10 5 5 5-5" />
    </Icon>
  );
}

function CopyIcon(props: RecommendationIconProps) {
  return (
    <Icon {...props}>
      <rect x="8" y="8" width="10" height="10" rx="2" />
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
    </Icon>
  );
}

function CompareIcon(props: RecommendationIconProps) {
  return (
    <Icon {...props}>
      <path d="M5 18v-6M12 18V4M19 18V9" />
    </Icon>
  );
}

function SwapIcon(props: RecommendationIconProps) {
  return (
    <Icon {...props}>
      <path d="M17 8H7m0 0 3-3M7 8l3 3M7 16h10m0 0-3-3m3 3-3 3" />
    </Icon>
  );
}

function ResetIcon(props: RecommendationIconProps) {
  return (
    <Icon {...props}>
      <path d="M4 10a8 8 0 1 1 2 8" />
      <path d="M4 4v6h6" />
    </Icon>
  );
}

export { BackIcon, ChevronIcon, CompareIcon, CopyIcon, ResetIcon, SparkleIcon, SwapIcon };
