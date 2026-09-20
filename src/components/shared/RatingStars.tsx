'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating: number; // 0 to 5
  max?: number;
  count?: number; // total ratings count
  interactive?: boolean;
  onChange?: (score: number) => void;
  size?: 'sm' | 'md' | 'lg';
  showScore?: boolean;
  className?: string;
}

export function RatingStars({
  rating,
  max = 5,
  count,
  interactive = false,
  onChange,
  size = 'md',
  showScore = true,
  className,
}: RatingStarsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const starSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }[size];

  const currentVal = hovered !== null ? hovered : rating;

  return (
    <div className={cn('inline-flex items-center gap-1.5 select-none', className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => {
          const score = i + 1;
          const isFilled = currentVal >= score;
          const isHalf = !isFilled && currentVal >= score - 0.5;

          return (
            <button
              key={i}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onChange?.(score)}
              onMouseEnter={() => interactive && setHovered(score)}
              onMouseLeave={() => interactive && setHovered(null)}
              className={cn(
                'focus:outline-none transition-transform',
                interactive && 'cursor-pointer hover:scale-110 active:scale-95'
              )}
              aria-label={`${score} of ${max} stars`}
            >
              <Star
                className={cn(
                  starSizes,
                  isFilled
                    ? 'fill-amber-400 text-amber-500'
                    : isHalf
                    ? 'fill-amber-400/50 text-amber-500'
                    : 'text-muted-foreground/40'
                )}
              />
            </button>
          );
        })}
      </div>

      {showScore && rating > 0 && (
        <span className="text-xs font-semibold text-foreground tabular-nums">
          {rating.toFixed(1)}
        </span>
      )}

      {count !== undefined && (
        <span className="text-xs text-muted-foreground tabular-nums">
          ({count})
        </span>
      )}
    </div>
  );
}
