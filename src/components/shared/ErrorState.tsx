import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Unable to load content',
  message,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 sm:p-10 text-center rounded-xl border border-destructive/20 bg-destructive/5',
        className
      )}
    >
      <div className="w-10 h-10 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-3">
        <AlertCircle className="w-5 h-5" />
      </div>

      <h3 className="text-base font-semibold text-foreground mb-1">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-5">
        {message}
      </p>

      {onRetry && (
        <Button
          variant="outline"
          onClick={onRetry}
          className="inline-flex items-center gap-2 border-border hover:bg-background"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </Button>
      )}
    </div>
  );
}
