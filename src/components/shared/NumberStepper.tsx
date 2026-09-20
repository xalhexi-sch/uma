'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NumberStepperProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function NumberStepper({
  value,
  onChange,
  min = 1,
  max = 9999,
  step = 1,
  unit,
  disabled = false,
  className,
  size = 'md',
}: NumberStepperProps) {
  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled || value <= min) return;
    const next = Math.max(min, Math.round((value - step) * 100) / 100);
    onChange(next);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled || value >= max) return;
    const next = Math.min(max, Math.round((value + step) * 100) / 100);
    onChange(next);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseFloat(e.target.value);
    if (isNaN(raw)) return;
    const clamped = Math.max(min, Math.min(max, raw));
    onChange(clamped);
  };

  const sizeStyles = {
    sm: {
      btn: 'h-8 w-8 min-h-[32px] min-w-[32px]',
      input: 'h-8 text-xs w-14',
      icon: 'w-3 h-3',
    },
    md: {
      btn: 'h-10 w-10 min-h-[44px] min-w-[44px]',
      input: 'h-10 text-sm w-16',
      icon: 'w-4 h-4',
    },
    lg: {
      btn: 'h-12 w-12 min-h-[48px] min-w-[48px]',
      input: 'h-12 text-base w-20',
      icon: 'w-5 h-5',
    },
  }[size];

  return (
    <div className={cn('inline-flex items-center rounded-lg border border-border bg-card p-0.5 shadow-2xs', className)}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        aria-label="Decrease quantity"
        className={cn('rounded-md hover:bg-muted text-foreground transition-colors shrink-0', sizeStyles.btn)}
      >
        <Minus className={sizeStyles.icon} />
      </Button>

      <div className="flex items-center justify-center px-1">
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={cn(
            'bg-transparent text-center font-semibold tabular-nums focus:outline-none border-none p-0 text-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
            sizeStyles.input
          )}
        />
        {unit && (
          <span className="text-xs text-muted-foreground font-medium -ml-1 pr-1">
            {unit}
          </span>
        )}
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        aria-label="Increase quantity"
        className={cn('rounded-md hover:bg-muted text-foreground transition-colors shrink-0', sizeStyles.btn)}
      >
        <Plus className={sizeStyles.icon} />
      </Button>
    </div>
  );
}
