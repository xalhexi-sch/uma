import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: React.ReactNode;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <Card className={cn('bg-card border-border shadow-xs hover:border-border/80 transition-colors', className)}>
      <CardContent className="p-5 flex flex-col justify-between h-full">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          {Icon && (
            <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>

        <div className="mt-3 space-y-1">
          <div className="text-2xl font-bold tracking-tight text-foreground tabular-nums">
            {value}
          </div>

          {(subtitle || trend) && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-0.5">
              {trend && (
                <span
                  className={cn(
                    'inline-flex items-center gap-0.5 font-medium',
                    trend.isPositive
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                  )}
                >
                  {trend.isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {trend.value}
                </span>
              )}
              {subtitle && <span>{subtitle}</span>}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
