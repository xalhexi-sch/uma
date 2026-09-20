import Link from 'next/link';
import { Compass, Home, LogIn, HelpCircle } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6 bg-card p-8 rounded-xl border border-border shadow-sm">
        <div className="w-16 h-16 rounded-full bg-brand-forest/10 text-brand-forest dark:text-brand-green flex items-center justify-center mx-auto text-2xl font-black">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Page not found
          </h1>
          <p className="text-sm text-muted-foreground">
            The page you requested doesn&apos;t exist, was moved, or requires an active account session.
          </p>
        </div>

        <div className="grid gap-2 text-left pt-2">
          <Link
            href="/browse"
            className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
          >
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Browse Harvests</p>
              <p className="text-xs text-muted-foreground">View scheduled produce available for ordering</p>
            </div>
          </Link>

          <Link
            href="/how-it-works"
            className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
          >
            <div className="p-2 rounded-md bg-brand-amber/10 text-amber-600 dark:text-amber-400">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">How UMA Works</p>
              <p className="text-xs text-muted-foreground">Learn about forward ordering and pooled logistics</p>
            </div>
          </Link>

          <Link
            href="/login"
            className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
          >
            <div className="p-2 rounded-md bg-secondary text-secondary-foreground">
              <LogIn className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Sign In to Dashboard</p>
              <p className="text-xs text-muted-foreground">Access your orders, listings, or runs</p>
            </div>
          </Link>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className={cn(buttonVariants({ variant: 'outline' }), 'w-full inline-flex items-center justify-center gap-2')}
          >
            <Home className="w-4 h-4" />
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
