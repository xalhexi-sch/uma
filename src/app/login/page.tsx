'use client';

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShoppingBag, Sprout, ShieldCheck, Truck, ArrowRight, Sun, Moon, Loader2 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { loginUser, loginDemoUser } from '@/lib/auth-client';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get('next') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoLoadingRole, setDemoLoadingRole] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await loginUser({ email, password });
      router.push(nextUrl);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role: 'BUYER' | 'FARMER' | 'COURIER' | 'ADMIN') => {
    setError(null);
    setDemoLoadingRole(role);

    try {
      await loginDemoUser(role);
      router.push(nextUrl);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to login with demo account');
    } finally {
      setDemoLoadingRole(null);
    }
  };

  return (
    <Card className="shadow-xl border-border bg-card">
      <CardHeader className="text-center pb-3">
        <CardTitle className="text-2xl font-bold tracking-tight">Sign In to UMA</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Log in with your email or use a 1-click verified demo account.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && (
          <div className="p-3 text-xs bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-900/50">
            {error}
          </div>
        )}

        {/* 1-Click Demo Personas */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              1-Click Demo Accounts
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
              Pilot Seeded
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDemoLogin('BUYER')}
              disabled={!!demoLoadingRole || loading}
              className="h-auto py-2.5 px-3 justify-start text-left border-border hover:border-emerald-500/50"
            >
              <div className="w-7 h-7 rounded-md bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mr-2">
                {demoLoadingRole === 'BUYER' ? <Loader2 size={14} className="animate-spin" /> : <ShoppingBag size={14} />}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-xs truncate">Buyer / Kitchen</div>
                <div className="text-[9px] text-muted-foreground truncate">Kusina Butuan</div>
              </div>
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleDemoLogin('FARMER')}
              disabled={!!demoLoadingRole || loading}
              className="h-auto py-2.5 px-3 justify-start text-left border-border hover:border-emerald-500/50"
            >
              <div className="w-7 h-7 rounded-md bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mr-2">
                {demoLoadingRole === 'FARMER' ? <Loader2 size={14} className="animate-spin" /> : <Sprout size={14} />}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-xs truncate">Farmer</div>
                <div className="text-[9px] text-muted-foreground truncate">Mang Juan (Antongalon)</div>
              </div>
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleDemoLogin('COURIER')}
              disabled={!!demoLoadingRole || loading}
              className="h-auto py-2.5 px-3 justify-start text-left border-border hover:border-emerald-500/50"
            >
              <div className="w-7 h-7 rounded-md bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mr-2">
                {demoLoadingRole === 'COURIER' ? <Loader2 size={14} className="animate-spin" /> : <Truck size={14} />}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-xs truncate">Courier</div>
                <div className="text-[9px] text-muted-foreground truncate">Kuya Jun (Motorcycle)</div>
              </div>
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleDemoLogin('ADMIN')}
              disabled={!!demoLoadingRole || loading}
              className="h-auto py-2.5 px-3 justify-start text-left border-border hover:border-emerald-500/50"
            >
              <div className="w-7 h-7 rounded-md bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mr-2">
                {demoLoadingRole === 'ADMIN' ? <Loader2 size={14} className="animate-spin" /> : <ShieldCheck size={14} />}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-xs truncate">Admin Ops</div>
                <div className="text-[9px] text-muted-foreground truncate">UMA Control Center</div>
              </div>
            </Button>
          </div>
        </div>

        <div className="relative my-3 text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-[10px] text-muted-foreground uppercase font-mono tracking-widest">
            Or log in with credentials
          </span>
        </div>

        {/* Real credentials form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground">Email address</label>
            <Input
              type="email"
              placeholder="e.g. buyer@uma.ph"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-9 text-xs"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-foreground">Password</label>
              <span className="text-[10px] text-muted-foreground">Demo default: umaDemo2026!</span>
            </div>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-9 text-xs"
            />
          </div>

          <Button
            type="submit"
            disabled={loading || !!demoLoadingRole}
            className="w-full h-9 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight size={14} className="ml-1.5" />
              </>
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="pt-2 border-t border-border flex flex-col items-center justify-center gap-1.5 text-center">
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account yet?{' '}
          <Link href="/register" className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
            Register your kitchen or farm
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default function LoginPage() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      {/* Top Navigation */}
      <header className="border-b border-border bg-background/95 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/uma-logo-green.png"
            alt="UMA Logo"
            width={28}
            height={28}
            className="object-contain transition-transform group-hover:scale-105"
            priority
          />
          <span className="text-lg font-bold tracking-tight">UMA</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="icon-sm"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-zinc-700" />}
          </Button>

          <Link href="/products" className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
            Catalog
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-md w-full mx-auto px-4 py-8">
        <Suspense fallback={<div className="h-96 rounded-xl bg-card border border-border animate-pulse" />}>
          <LoginForm />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-muted-foreground">
        UMA B2B Agricultural Marketplace • Butuan City, Agusan del Norte
      </footer>
    </div>
  );
}
