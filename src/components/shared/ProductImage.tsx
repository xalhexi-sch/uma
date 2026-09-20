'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sprout, Egg, Milk, Wheat, Carrot, Apple } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductImageProps {
  src?: string | null;
  alt: string;
  category?: string | null;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'wide';
  priority?: boolean;
}

function CategoryIcon({ category }: { category?: string | null }) {
  const cat = (category || '').toLowerCase();
  if (cat.includes('egg') || cat.includes('poultry')) return <Egg className="w-8 h-8 opacity-60 mb-1" />;
  if (cat.includes('milk') || cat.includes('dairy')) return <Milk className="w-8 h-8 opacity-60 mb-1" />;
  if (cat.includes('grain') || cat.includes('rice') || cat.includes('staple')) return <Wheat className="w-8 h-8 opacity-60 mb-1" />;
  if (cat.includes('fruit')) return <Apple className="w-8 h-8 opacity-60 mb-1" />;
  if (cat.includes('root') || cat.includes('vegetable')) return <Carrot className="w-8 h-8 opacity-60 mb-1" />;
  return <Sprout className="w-8 h-8 opacity-60 mb-1" />;
}

export function ProductImage({
  src,
  alt,
  category,
  className,
  aspectRatio = 'square',
  priority = false,
}: ProductImageProps) {
  const [error, setError] = useState(false);

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-4/3',
  }[aspectRatio];

  if (!src || error) {
    return (
      <div
        className={cn(
          'w-full flex flex-col items-center justify-center bg-brand-forest/5 dark:bg-brand-forest/15 text-brand-forest dark:text-brand-green rounded-lg border border-border/50 select-none',
          aspectClasses,
          className
        )}
      >
        <CategoryIcon category={category} />
        <span className="text-[11px] font-medium text-muted-foreground line-clamp-1 px-2 text-center">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className={cn('relative w-full overflow-hidden rounded-lg bg-muted/40', aspectClasses, className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        priority={priority}
        onError={() => setError(true)}
        className="object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}
