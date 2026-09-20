import React from 'react';
import { LucideIcon, Inbox } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-xl border border-dashed border-border bg-card/50',
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-4">
        <Icon className="w-6 h-6" />
      </div>

      <h3 className="text-base font-semibold text-foreground mb-1">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">
        {description}
      </p>

      {action && (
        action.href ? (
          <Link
            href={action.href}
            className={cn(buttonVariants({ variant: 'default' }), 'bg-primary text-primary-foreground hover:opacity-90')}
          >
            {action.label}
          </Link>
        ) : (
          <Button
            onClick={action.onClick}
            className="bg-primary text-primary-foreground hover:opacity-90"
          >
            {action.label}
          </Button>
        )
      )}
    </div>
  );
}
