import React from 'react';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  id?: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  id,
  label,
  required = false,
  hint,
  error,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-1.5 text-left', className)}>
      <div className="flex items-center justify-between gap-2">
        <label
          htmlFor={id}
          className="text-xs font-semibold text-foreground tracking-wide flex items-center gap-1"
        >
          <span>{label}</span>
          {required && <span className="text-destructive font-bold">*</span>}
        </label>
        {hint && !error && (
          <span className="text-[11px] text-muted-foreground">{hint}</span>
        )}
      </div>

      {children}

      {error && (
        <p className="text-xs font-medium text-destructive animate-in fade-in-50 duration-150" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
