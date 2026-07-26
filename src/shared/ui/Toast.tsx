import * as React from 'react';
import { Toast as ToastPrimitive } from '@base-ui/react/toast';
import { AlertCircleIcon, CheckCircleIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

const toastConfig = {
  success: {
    title: '완료',
    icon: CheckCircleIcon,
    priority: 'low',
    rootClassName: 'border-mint-500/50 bg-mint-100/30',
    accentClassName: 'text-mint-500',
  },
  error: {
    title: '오류',
    icon: AlertCircleIcon,
    priority: 'high',
    rootClassName: 'border-primary-200 bg-primary-50/50',
    accentClassName: 'text-primary-500',
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
    title: title ?? config.title,
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

function ToastList({ className }: Pick<ToastProviderProps, 'className'>) {
  const { toasts } = ToastPrimitive.useToastManager<ToastData>();

  return (
    <ToastPrimitive.Portal>
      <ToastPrimitive.Viewport
        className={cn(
          'pointer-events-none fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-[calc(var(--app-mobile-width)-2rem)] flex-col-reverse gap-2',
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
              className={cn(
                'text-text-primary pointer-events-auto grid w-full grid-cols-[auto_1fr] items-start gap-4 rounded-3xl border-2 px-6 py-5 shadow-sm transition-[opacity,transform] duration-200 data-[ending-style]:translate-y-2 data-[ending-style]:opacity-0 data-[starting-style]:translate-y-2 data-[starting-style]:opacity-0',
                config.rootClassName,
              )}
              data-slot="toast"
            >
              <Icon
                aria-hidden="true"
                className={cn('mt-0.5 size-7 shrink-0', config.accentClassName)}
              />

              <div className="min-w-0">
                <ToastPrimitive.Title className={cn('typo-button1', config.accentClassName)} />
                <ToastPrimitive.Description className="typo-body1 mt-1" />
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
      <ToastList className={className} />
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
