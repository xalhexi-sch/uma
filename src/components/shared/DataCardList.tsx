import React from 'react';
import { cn } from '@/lib/utils';
import { EmptyState } from './EmptyState';
import { LucideIcon } from 'lucide-react';

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  render?: (item: T) => React.ReactNode;
  className?: string;
  mobileHidden?: boolean;
}

interface DataCardListProps<T> {
  data: T[];
  keyExtractor: (item: T) => string | number;
  columns: Column<T>[];
  renderCard: (item: T) => React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: LucideIcon;
  emptyAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

export function DataCardList<T>({
  data,
  keyExtractor,
  columns,
  renderCard,
  emptyTitle = 'No records found',
  emptyDescription = 'There are no items to display right now.',
  emptyIcon,
  emptyAction,
  className,
}: DataCardListProps<T>) {
  if (data.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        icon={emptyIcon}
        action={emptyAction}
        className={className}
      />
    );
  }

  return (
    <div className={cn('w-full', className)}>
      {/* Mobile Card List View (< md) */}
      <div className="md:hidden space-y-3">
        {data.map((item) => (
          <div key={keyExtractor(item)}>
            {renderCard(item)}
          </div>
        ))}
      </div>

      {/* Desktop Table View (>= md) */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-border bg-card shadow-2xs">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={cn('py-3.5 px-4 font-semibold', col.className)}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {data.map((item) => (
              <tr
                key={keyExtractor(item)}
                className="hover:bg-muted/30 transition-colors group"
              >
                {columns.map((col, idx) => (
                  <td
                    key={idx}
                    className={cn('py-3.5 px-4 text-foreground align-middle', col.className)}
                  >
                    {col.render
                      ? col.render(item)
                      : col.accessorKey
                      ? String(item[col.accessorKey] ?? '')
                      : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
