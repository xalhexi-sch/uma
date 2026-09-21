'use client';

import React, { useSyncExternalStore } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  variant?: 'ghost' | 'outline';
}

const emptySubscribe = () => () => {};

export function ThemeToggle({ className, variant = 'ghost' }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <Button
        type="button"
        variant={variant}
        size="icon"
        className={cn('w-9 h-9 rounded-lg transition-colors text-foreground', className)}
        aria-label="Toggle color theme"
      >
        <span className="w-4 h-4 opacity-0 block" aria-hidden="true" />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant={variant}
      size="icon"
      onClick={toggleTheme}
      className={cn('w-9 h-9 rounded-lg transition-colors text-foreground cursor-pointer', className)}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
      ) : (
        <Moon className="w-4 h-4 text-zinc-600 dark:text-zinc-400 hover:-rotate-12 transition-transform" />
      )}
    </Button>
  );
}
