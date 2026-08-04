import * as React from 'react';
import { Toast as ToastPrimitive } from '@base-ui/react/toast';
import { AlertCircleIcon, CheckCircleIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

const toastConfig = {
  success: {
    icon: CheckCircleIcon,
    priority: 'low',
    rootClassName: 'border-alpha-mint-25 bg-mint-100 text-text-primary',
    accentClassName: 'text-text-mint',
  },
  error: {
    icon: AlertCircleIcon,
    priority: 'high',
    rootClassName: 'border-primary-200 bg-accent-petal text-text-primary',
    accentClassName: 'text-primary-600',
  },
} as const;

type ToastVariant = keyof typeof toastConfig;

interface ToastData {
  variant: ToastVariant;
}

interface ToastOptions {
  id?: string;
  title?: React.ReactNode;
  timeout?: number;
  onClose?: () => void;
}

interface ToastProviderProps {
  children: React.ReactNode;
  className?: string;
}

const toastManager = ToastPrimitive.createToastManager<ToastData>();

function addToast(
  variant: ToastVariant,
  description: React.ReactNode,
  { id, title, timeout, onClose }: ToastOptions = {},
) {
  const config = toastConfig[variant];

  return toastManager.add({
    id,
    type: variant,
    title,
    description,
    timeout,
    priority: config.priority,
    onClose,
    data: { variant },
  });
}

const toast = {
  success(description: React.ReactNode, options?: ToastOptions) {
    return addToast('success', description, options);
  },
  error(description: React.ReactNode, options?: ToastOptions) {
    return addToast('error', description, options);
  },
  close(id?: string) {
    toastManager.close(id);
  },
};

function ToastViewport({ className }: Pick<ToastProviderProps, 'className'>) {
  const { toasts } = ToastPrimitive.useToastManager<ToastData>();

  return (
    <ToastPrimitive.Portal>
      <ToastPrimitive.Viewport
        data-slot="toast-viewport"
        className={cn(
          'pointer-events-none fixed inset-x-4 bottom-5 z-50 mx-auto flex w-[min(328px,calc(100vw-32px))] max-w-[calc(var(--app-mobile-width)-32px)] flex-col-reverse gap-2',
          className,
        )}
      >
        {toasts.map((toastItem) => {
          const variant = toastItem.data?.variant ?? 'success';
          const config = toastConfig[variant];
          const Icon = config.icon;

          return (
            <ToastPrimitive.Root
              key={toastItem.id}
              toast={toastItem}
              swipeDirection={['down', 'right']}
              data-slot="toast"
              className={cn(
                'pointer-events-auto grid w-full grid-cols-[22px_1fr] items-center gap-2.5 rounded-2xl border px-3.5 py-2.5 shadow-[0_8px_24px_0_rgba(61,43,31,0.10)] transition-[opacity,transform] duration-200 data-[ending-style]:translate-y-2 data-[ending-style]:opacity-0 data-[limited]:hidden data-[starting-style]:translate-y-2 data-[starting-style]:opacity-0',
                config.rootClassName,
              )}
            >
              <Icon
                aria-hidden="true"
                className={cn('size-[22px] shrink-0', config.accentClassName)}
              />

              <div className="min-w-0">
                {toastItem.title ? <ToastPrimitive.Title className="sr-only" /> : null}
                <ToastPrimitive.Description className="typo-caption1 break-keep" />
              </div>
            </ToastPrimitive.Root>
          );
        })}
      </ToastPrimitive.Viewport>
    </ToastPrimitive.Portal>
  );
}

function ToastProvider({ children, className }: ToastProviderProps) {
  return (
    <ToastPrimitive.Provider toastManager={toastManager} timeout={2000} limit={3}>
      {children}
      <ToastViewport className={className} />
    </ToastPrimitive.Provider>
  );
}

export {
  ToastProvider,
  toast,
  toastConfig,
  type ToastOptions,
  type ToastProviderProps,
  type ToastVariant,
};
