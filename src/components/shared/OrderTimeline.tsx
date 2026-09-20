import React from 'react';
import {
  Clock,
  CheckCircle2,
  PackageCheck,
  Truck,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from 'lucide-react';
import { OrderStatus } from '@prisma/client';
import { cn } from '@/lib/utils';
import { DateText } from './DateText';

interface OrderTimelineProps {
  status: OrderStatus;
  createdAt: Date | string;
  confirmedAt?: Date | string | null;
  harvestedAt?: Date | string | null;
  pickedUpAt?: Date | string | null;
  deliveredAt?: Date | string | null;
  completedAt?: Date | string | null;
  cancelledAt?: Date | string | null;
  cancelledReason?: string | null;
  className?: string;
}

interface Step {
  key: OrderStatus;
  label: string;
  description: string;
  timestamp?: Date | string | null;
  icon: React.ComponentType<{ className?: string }>;
}

export function OrderTimeline({
  status,
  createdAt,
  confirmedAt,
  harvestedAt,
  pickedUpAt,
  deliveredAt,
  completedAt,
  cancelledAt,
  cancelledReason,
  className,
}: OrderTimelineProps) {
  if (status === OrderStatus.CANCELLED) {
    return (
      <div className={cn('p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-left space-y-2', className)}>
        <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-semibold text-sm">
          <XCircle className="w-5 h-5" />
          <span>Order Cancelled</span>
        </div>
        {cancelledAt && (
          <p className="text-xs text-muted-foreground">
            Cancelled on <DateText date={cancelledAt} style="full" />
          </p>
        )}
        {cancelledReason && (
          <p className="text-xs text-rose-700 dark:text-rose-300 font-medium">
            Reason: {cancelledReason}
          </p>
        )}
      </div>
    );
  }

  const standardSteps: Step[] = [
    {
      key: OrderStatus.PENDING,
      label: 'Order Placed',
      description: 'Waiting for verification & confirmation',
      timestamp: createdAt,
      icon: Clock,
    },
    {
      key: OrderStatus.CONFIRMED,
      label: 'Confirmed',
      description: 'Scheduled with farmer',
      timestamp: confirmedAt,
      icon: CheckCircle2,
    },
    {
      key: OrderStatus.HARVESTED,
      label: 'Harvested',
      description: 'Fresh produce ready for pickup',
      timestamp: harvestedAt,
      icon: PackageCheck,
    },
    {
      key: OrderStatus.PICKED_UP,
      label: 'Picked Up',
      description: 'With UMA Courier',
      timestamp: pickedUpAt,
      icon: Truck,
    },
    {
      key: OrderStatus.DELIVERED,
      label: 'Delivered',
      description: 'Photo verified at your kitchen',
      timestamp: deliveredAt,
      icon: CheckCircle,
    },
    {
      key: OrderStatus.COMPLETED,
      label: 'Completed',
      description: 'Receipt confirmed & farmer paid',
      timestamp: completedAt,
      icon: CheckCircle2,
    },
  ];

  const orderOfStatus = [
    OrderStatus.PENDING,
    OrderStatus.CONFIRMED,
    OrderStatus.HARVESTED,
    OrderStatus.PICKED_UP,
    OrderStatus.DELIVERED,
    OrderStatus.COMPLETED,
  ];

  const currentIndex = orderOfStatus.indexOf(status === OrderStatus.DISPUTED ? OrderStatus.DELIVERED : status);

  return (
    <div className={cn('space-y-6 text-left', className)}>
      {status === OrderStatus.DISPUTED && (
        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-semibold mb-4">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>This order has an active dispute under review by UMA Operations.</span>
        </div>
      )}

      <div className="relative pl-6 space-y-6 before:absolute before:top-3 before:bottom-3 before:left-2.5 before:w-0.5 before:bg-border">
        {standardSteps.map((step, index) => {
          const isDone = index <= currentIndex;
          const isCurrent = index === currentIndex;
          const Icon = step.icon;

          return (
            <div key={step.key} className="relative flex items-start gap-4">
              <div
                className={cn(
                  'absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs transition-colors shrink-0',
                  isCurrent
                    ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                    : isDone
                    ? 'bg-primary/20 text-primary'
                    : 'bg-muted text-muted-foreground border border-border'
                )}
              >
                <Icon className="w-3 h-3" />
              </div>

              <div className="space-y-0.5 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <p
                    className={cn(
                      'text-sm font-semibold',
                      isCurrent
                        ? 'text-primary'
                        : isDone
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    )}
                  >
                    {step.label}
                  </p>
                  {step.timestamp && (
                    <span className="text-[11px] text-muted-foreground">
                      <DateText date={step.timestamp} style="friendly" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
