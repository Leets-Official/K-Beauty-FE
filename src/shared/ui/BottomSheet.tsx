import { useRef, useState } from 'react';
import type {
  ComponentProps,
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from 'react';

import { Dialog } from '@base-ui/react/dialog';

import { CloseIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

interface BottomSheetProps extends Omit<
  ComponentProps<typeof Dialog.Root>,
  'actionsRef' | 'children'
> {
  children: ReactNode;
  className?: string;
  enableDragToClose?: boolean;
  showHandle?: boolean;
}

interface DragState {
  lastTime: number;
  lastY: number;
  offset: number;
  pointerId: number;
  startY: number;
  velocity: number;
}

interface BottomSheetDragStyle extends CSSProperties {
  '--bottom-sheet-drag-offset': string;
}

function readNumericToken(element: HTMLElement, token: string) {
  const value = Number.parseFloat(getComputedStyle(element).getPropertyValue(token));
  return Number.isFinite(value) ? value : null;
}

function BottomSheet({
  children,
  className,
  enableDragToClose = true,
  onOpenChangeComplete,
  showHandle = true,
  ...rootProps
}: BottomSheetProps) {
  const actionsRef = useRef<Dialog.Root.Actions>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef<DragState>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) {
      return;
    }

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStateRef.current = {
      lastTime: event.timeStamp,
      lastY: event.clientY,
      offset: 0,
      pointerId: event.pointerId,
      startY: event.clientY,
      velocity: 0,
    };
    setDragOffset(0);
    setIsDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;

    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    event.preventDefault();

    const nextOffset = Math.max(0, event.clientY - dragState.startY);
    const elapsed = event.timeStamp - dragState.lastTime;
    const velocity = elapsed > 0 ? (event.clientY - dragState.lastY) / elapsed : dragState.velocity;

    dragStateRef.current = {
      ...dragState,
      lastTime: event.timeStamp,
      lastY: event.clientY,
      offset: nextOffset,
      velocity,
    };
    setDragOffset(nextOffset);
  };

  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>, canceled = false) => {
    const dragState = dragStateRef.current;

    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragStateRef.current = null;
    setIsDragging(false);

    const surface = surfaceRef.current;

    if (canceled || !surface) {
      setDragOffset(0);
      return;
    }

    const dismissDistance = readNumericToken(surface, '--bottom-sheet-dismiss-distance');
    const dismissVelocity = readNumericToken(surface, '--bottom-sheet-dismiss-velocity');
    const flickMinDistance = readNumericToken(surface, '--bottom-sheet-flick-min-distance');

    const passedDistance = dismissDistance !== null && dragState.offset >= dismissDistance;
    const passedVelocity =
      dismissVelocity !== null &&
      flickMinDistance !== null &&
      dragState.offset >= flickMinDistance &&
      dragState.velocity >= dismissVelocity;

    if ((passedDistance || passedVelocity) && actionsRef.current) {
      actionsRef.current.close();
      return;
    }

    setDragOffset(0);
  };

  const handleOpenChangeComplete = (open: boolean) => {
    if (!open) {
      dragStateRef.current = null;
      setDragOffset(0);
      setIsDragging(false);
    }

    onOpenChangeComplete?.(open);
  };

  return (
    <Dialog.Root
      actionsRef={actionsRef}
      onOpenChangeComplete={handleOpenChangeComplete}
      {...rootProps}
    >
      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            'bg-overlay-scrim fixed inset-0 z-40 transition-opacity duration-[var(--bottom-sheet-backdrop-duration)]',
            'data-[ending-style]:opacity-0 data-[starting-style]:opacity-0',
          )}
        />
        <Dialog.Viewport className="fixed inset-0 z-50 flex items-end justify-center">
          <Dialog.Popup
            className={cn(
              'w-full max-w-[var(--app-mobile-width)] transition-transform duration-[var(--bottom-sheet-enter-duration)] ease-out',
              'data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full',
            )}
          >
            <div
              ref={surfaceRef}
              data-dragging={isDragging ? '' : undefined}
              className={cn(
                'bg-surface-default rounded-t-bottom-sheet max-h-[var(--bottom-sheet-max-height)] translate-y-[var(--bottom-sheet-drag-offset)] overflow-y-auto px-5 pt-3 pb-[max(var(--bottom-sheet-bottom-padding),env(safe-area-inset-bottom))] shadow-2xl',
                !isDragging &&
                  'transition-transform duration-[var(--bottom-sheet-snap-duration)] ease-out',
                className,
              )}
              style={
                {
                  '--bottom-sheet-drag-offset': `${dragOffset}px`,
                } as BottomSheetDragStyle
              }
            >
              {showHandle ? (
                <div
                  aria-hidden="true"
                  className="h-bottom-sheet-handle-height w-bottom-sheet-handle-width relative mx-auto"
                >
                  <div className="bg-bottom-sheet-handle size-full rounded-full" />
                  {enableDragToClose ? (
                    <div
                      className="h-bottom-sheet-handle-touch-height w-bottom-sheet-handle-touch-width absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none select-none active:cursor-grabbing"
                      onPointerCancel={(event) => finishDrag(event, true)}
                      onPointerDown={handlePointerDown}
                      onPointerMove={handlePointerMove}
                      onPointerUp={finishDrag}
                    />
                  ) : null}
                </div>
              ) : null}
              {children}
            </div>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function BottomSheetHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cn('mt-5 flex items-start justify-between gap-4', className)} {...props} />
  );
}

function BottomSheetTitle({ className, ...props }: ComponentProps<typeof Dialog.Title>) {
  return <Dialog.Title className={cn('typo-title2 text-text-primary', className)} {...props} />;
}

function BottomSheetDescription({
  className,
  ...props
}: ComponentProps<typeof Dialog.Description>) {
  return (
    <Dialog.Description className={cn('typo-body1 text-text-muted mt-2', className)} {...props} />
  );
}

function BottomSheetClose({ children, className, ...props }: ComponentProps<typeof Dialog.Close>) {
  return (
    <Dialog.Close
      className={cn(
        'text-text-secondary -mt-2 -mr-2 flex size-10 shrink-0 items-center justify-center rounded-full',
        className,
      )}
      {...props}
    >
      {children ?? <CloseIcon aria-hidden="true" className="size-5" />}
    </Dialog.Close>
  );
}

function BottomSheetContent({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('mt-6', className)} {...props} />;
}

function BottomSheetFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('mt-6', className)} {...props} />;
}

export {
  BottomSheet,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
  type BottomSheetProps,
};
