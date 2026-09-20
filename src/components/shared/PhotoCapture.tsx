'use client';

import React, { useRef, useState } from 'react';
import { Camera, Image as ImageIcon, X, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface PhotoCaptureProps {
  label?: string;
  value?: string | null;
  onChange: (dataUrl: string | null) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export function PhotoCapture({
  label = 'Capture photo proof',
  value,
  onChange,
  disabled = false,
  required = false,
  className,
}: PhotoCaptureProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const processImage = (file: File) => {
    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      const img = document.createElement('img');
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 1024;
        let { width, height } = img;

        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Compress to JPEG with 0.70 quality per Decision D10
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          onChange(dataUrl);
        }
        setIsProcessing(false);
      };

      img.onerror = () => {
        setIsProcessing(false);
      };

      if (typeof readerEvent.target?.result === 'string') {
        img.src = readerEvent.target.result;
      }
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={cn('space-y-2 text-left', className)}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-foreground flex items-center gap-1">
          <span>{label}</span>
          {required && <span className="text-destructive font-bold">*</span>}
        </label>
        {value && (
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium inline-flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Photo captured
          </span>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        capture="environment"
        onChange={handleFileChange}
        disabled={disabled || isProcessing}
        className="hidden"
      />

      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-border bg-card group w-full max-w-xs aspect-video">
          <Image
            src={value}
            alt="Proof preview"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              disabled={disabled}
              className="inline-flex items-center gap-1 text-xs"
            >
              <X className="w-3.5 h-3.5" />
              Retake photo
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled || isProcessing}
          className={cn(
            'w-full flex flex-col items-center justify-center p-6 rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/40 transition-colors cursor-pointer min-h-[120px]',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {isProcessing ? (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="text-xs font-medium">Optimizing photo...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <div className="flex items-center gap-2 text-primary">
                <Camera className="w-6 h-6" />
                <span className="text-muted-foreground">or</span>
                <ImageIcon className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-xs font-semibold text-foreground">
                Take photo or upload file
              </p>
              <p className="text-[11px] text-muted-foreground">
                Optimized automatically for fast upload (max 1024px)
              </p>
            </div>
          )}
        </button>
      )}
    </div>
  );
}
