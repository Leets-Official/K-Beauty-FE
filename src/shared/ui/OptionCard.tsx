import * as React from 'react';

import {
  BlobCharacter,
  type BlobDetail,
  type BlobExpression,
  type BlobTone,
} from '@/shared/ui/BlobCharacter';
import { cn } from '@/shared/utils/cn';

function Card({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<'div'> & { size?: 'default' | 'sm' }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        'group/card bg-card text-card-foreground ring-foreground/10 flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl py-(--card-spacing) text-sm ring-1 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl',
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)',
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        'font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm',
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="card-content" className={cn('px-(--card-spacing)', className)} {...props} />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        'bg-muted/50 flex items-center rounded-b-xl border-t p-(--card-spacing)',
        className,
      )}
      {...props}
    />
  );
}

export type OptionCardProps = React.ComponentProps<'button'> & {
  label: string;
  caption?: string;
  expression?: BlobExpression;
  detail?: BlobDetail;
  tone?: BlobTone;
  selected?: boolean;
};

function OptionCard({
  className,
  label,
  caption,
  expression = 'happy',
  detail = 'none',
  tone = 'radiant',
  selected = false,
  type,
  ...props
}: OptionCardProps) {
  return (
    <button
      data-slot="option-card"
      type={type ?? 'button'}
      aria-pressed={selected}
      className={cn(
        'box-border flex h-[62px] w-[246px] items-center gap-[10px] rounded-[24px] border border-[#F3F4F6] bg-[#FAFAFA] p-3 text-left transition-all',
        'hover:border-foreground/15 focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
        'disabled:pointer-events-none disabled:opacity-50',
        selected && 'border-primary',
        className,
      )}
      {...props}
    >
      <BlobCharacter tone={tone} expression={expression} detail={detail} size={36} />
      <span className="flex h-[30px] min-w-0 flex-1 flex-col items-start">
        <span className="h-[14px] w-full truncate font-['Outfit'] text-[11px] leading-[14px] font-semibold text-[#3D2B1F]">
          {label}
        </span>
        {caption ? (
          <span className="h-[16px] w-full truncate pt-0.5 font-['Menlo'] text-[9px] leading-[14px] font-normal text-[#C4B5AE]">
            {caption}
          </span>
        ) : null}
      </span>
    </button>
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  OptionCard,
};
