'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw, Home, Compass } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log non-sensitive error metadata in client
    console.error('App runtime error:', error.message);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6 bg-card p-8 rounded-xl border border-border shadow-sm">
        <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Something went wrong
          </h1>
          <p className="text-sm text-muted-foreground">
            We encountered an unexpected error. Please try again or navigate back to the main pages.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:opacity-90 inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try again
          </Button>

          <Link
            href="/"
            className={cn(buttonVariants({ variant: 'outline' }), 'w-full sm:w-auto inline-flex items-center gap-2')}
          >
            <Home className="w-4 h-4" />
            Go to Home
          </Link>
        </div>

        <div className="pt-4 border-t border-border/60">
          <p className="text-xs text-muted-foreground">
            Looking for harvest listings?{' '}
            <Link href="/browse" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
              <Compass className="w-3 h-3 inline" /> Browse harvests
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
