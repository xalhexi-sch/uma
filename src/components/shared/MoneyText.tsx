import React from 'react';
import { formatPeso } from '@/lib/money';
import { cn } from '@/lib/utils';

interface MoneyTextProps {
  centavos: number;
  unit?: string;
  className?: string;
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  variant?: 'default' | 'accent' | 'muted' | 'success' | 'danger';
}

export function MoneyText({
  centavos,
  unit,
  className,
  size = 'base',
  variant = 'default',
}: MoneyTextProps) {
  const sizeClasses = {
    sm: 'text-xs',
    base: 'text-sm font-semibold',
    lg: 'text-base font-bold',
    xl: 'text-lg font-bold',
    '2xl': 'text-2xl font-extrabold tracking-tight',
  }[size];

  const variantClasses = {
    default: 'text-foreground',
    accent: 'text-amber-600 dark:text-amber-400',
    muted: 'text-muted-foreground font-normal',
    success: 'text-emerald-600 dark:text-emerald-400',
    danger: 'text-rose-600 dark:text-rose-400',
  }[variant];

  return (
    <span className={cn('tabular-nums inline-flex items-baseline gap-1', sizeClasses, variantClasses, className)}>
      <span>{formatPeso(centavos)}</span>
      {unit && (
        <span className="text-[0.8em] font-normal text-muted-foreground">
          /{unit.toLowerCase()}
        </span>
      )}
    </span>
  );
}
