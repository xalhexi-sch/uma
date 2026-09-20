import React from 'react';
import {
  Clock,
  CheckCircle2,
  PackageCheck,
  Truck,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  ShieldAlert,
  ShieldQuestion,
  RefreshCw,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  OrderStatus,
  ListingStatus,
  VerificationStatus,
  DeliveryStatus,
  DisputeStatus,
} from '@prisma/client';

type AnyStatus =
  | OrderStatus
  | ListingStatus
  | VerificationStatus
  | DeliveryStatus
  | DisputeStatus
  | string;

interface StatusBadgeProps {
  status: AnyStatus;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

interface StatusConfig {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  classes: string;
}

const STATUS_CONFIGS: Record<string, StatusConfig> = {
  // Common / Shared
  PENDING: {
    label: 'Pending',
    icon: Clock,
    classes: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
  },
  CONFIRMED: {
    label: 'Confirmed',
    icon: CheckCircle2,
    classes: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  },
  HARVESTED: {
    label: 'Harvested',
    icon: PackageCheck,
    classes: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
  },
  PICKED_UP: {
    label: 'Picked Up',
    icon: Truck,
    classes: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20',
  },
  DELIVERED: {
    label: 'Delivered',
    icon: CheckCircle,
    classes: 'bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/20',
  },
  COMPLETED: {
    label: 'Completed',
    icon: CheckCircle,
    classes: 'bg-green-600/10 text-green-700 dark:text-green-400 border-green-600/20',
  },
  DISPUTED: {
    label: 'Disputed',
    icon: AlertTriangle,
    classes: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20',
  },
  CANCELLED: {
    label: 'Cancelled',
    icon: XCircle,
    classes: 'bg-zinc-500/10 text-zinc-700 dark:text-zinc-400 border-zinc-500/20',
  },

  // Listing statuses
  ACTIVE: {
    label: 'Active',
    icon: CheckCircle2,
    classes: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
  },
  DRAFT: {
    label: 'Draft',
    icon: Clock,
    classes: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20',
  },
  SOLD_OUT: {
    label: 'Sold Out',
    icon: XCircle,
    classes: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
  },

  // Verification statuses
  VERIFIED: {
    label: 'Verified',
    icon: ShieldCheck,
    classes: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
  },
  REJECTED: {
    label: 'Verification Rejected',
    icon: ShieldAlert,
    classes: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20',
  },

  // Delivery statuses
  IN_TRANSIT: {
    label: 'In Transit',
    icon: Truck,
    classes: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20',
  },
  FAILED: {
    label: 'Delivery Failed',
    icon: AlertTriangle,
    classes: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20',
  },

  // Dispute statuses
  OPEN: {
    label: 'Open Dispute',
    icon: AlertTriangle,
    classes: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20',
  },
  UNDER_REVIEW: {
    label: 'Under Review',
    icon: RefreshCw,
    classes: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
  },
  RESOLVED: {
    label: 'Resolved',
    icon: CheckCircle2,
    classes: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
  },
};

export function StatusBadge({ status, className, size = 'md' }: StatusBadgeProps) {
  const statusStr = String(status);
  const config = STATUS_CONFIGS[statusStr] || {
    label: statusStr.replace(/_/g, ' '),
    icon: Clock,
    classes: 'bg-zinc-500/10 text-zinc-700 dark:text-zinc-300 border-zinc-500/20',
  };

  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1 font-medium',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-semibold',
  }[size];

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  }[size];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border tracking-wide transition-colors shrink-0',
        sizeClasses,
        config.classes,
        className
      )}
    >
      <Icon className={cn('shrink-0', iconSizes)} />
      <span>{config.label}</span>
    </span>
  );
}
