import React from 'react';
import { formatManilaDate, formatDeliveryWindow } from '@/lib/dates';
import { DeliveryWindowId } from '@/lib/config';
import { cn } from '@/lib/utils';
import { Calendar } from 'lucide-react';

interface DateTextProps {
  date: Date | string;
  windowId?: DeliveryWindowId | string;
  style?: 'friendly' | 'short' | 'full';
  showIcon?: boolean;
  className?: string;
}

export function DateText({
  date,
  windowId,
  style = 'friendly',
  showIcon = false,
  className,
}: DateTextProps) {
  const text = windowId
    ? formatDeliveryWindow(windowId, date)
    : formatManilaDate(date, style);

  return (
    <span className={cn('inline-flex items-center gap-1.5 tabular-nums text-inherit', className)}>
      {showIcon && <Calendar className="w-3.5 h-3.5 text-muted-foreground shrink-0" />}
      <span>{text}</span>
    </span>
  );
}
