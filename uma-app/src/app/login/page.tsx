'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Sprout, ShieldCheck, ArrowRight, Sun, Moon } from 'lucide-react';
import { setCurrentUser, UserRole } from '@/lib/auth';
import { useTheme } from '@/context/ThemeContext';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();
  const [emailInput, setEmailInput] = useState('');

  const handleQuickLogin = (role: UserRole) => {
    setCurrentUser(role);
    router.push('/dashboard');
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setCurrentUser('buyer');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-border bg-background/95 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/uma-logo-green.png"
            alt="UMA Logo"
            width={30}
            height={30}
            className="object-contain transition-transform group-hover:scale-105"
            priority
          />
          <span className="text-xl font-bold tracking-tight">UMA</span>
        </Link>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="icon-sm"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-zinc-700" />}
          </Button>

          <Link href="/products" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            Catalog
          </Link>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="max-w-md w-full mx-auto px-4 py-8">
        <Card className="shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription className="text-xs">
              Select demo account or enter email.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* 1-Click Demo Accounts */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block text-center mb-1">
                1-Click Demo Accounts
              </span>

              <Button
                variant="outline"
                onClick={() => handleQuickLogin('buyer')}
                className="w-full h-auto py-3 px-3.5 justify-between hover:border-emerald-500/50"
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 rounded-md bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <ShoppingBag size={16} />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-foreground">Customer / Buyer</div>
                    <div className="text-[10px] text-muted-foreground">buyer@uma.ph (Sampaguita Kitchen)</div>
                  </div>
                </div>
                <ArrowRight size={14} className="text-muted-foreground" />
              </Button>

              <Button
                variant="outline"
                onClick={() => handleQuickLogin('supplier')}
                className="w-full h-auto py-3 px-3.5 justify-between hover:border-emerald-500/50"
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 rounded-md bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Sprout size={16} />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-foreground">Farmer / Supplier</div>
                    <div className="text-[10px] text-muted-foreground">farmer@uma.ph (Santos Dairy Farm)</div>
                  </div>
                </div>
                <ArrowRight size={14} className="text-muted-foreground" />
              </Button>

              <Button
                variant="outline"
                onClick={() => handleQuickLogin('admin')}
                className="w-full h-auto py-3 px-3.5 justify-between hover:border-emerald-500/50"
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 rounded-md bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-foreground">Platform Admin</div>
                    <div className="text-[10px] text-muted-foreground">admin@uma.ph (Control Center)</div>
                  </div>
                </div>
                <ArrowRight size={14} className="text-muted-foreground" />
              </Button>
            </div>

            <div className="relative my-2 text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-card px-2 text-[10px] text-muted-foreground uppercase font-mono">
                Or
              </span>
            </div>

            {/* Email form */}
            <form onSubmit={handleCustomLogin} className="space-y-2.5">
              <Input
                type="email"
                placeholder="name@business.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="text-xs h-9"
              />
              <Button
                type="submit"
                variant="emerald"
                className="w-full text-xs h-9"
              >
                Continue
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-muted-foreground">
        UMA Agri Marketplace • Butuan City
      </footer>
    </div>
  );
}
