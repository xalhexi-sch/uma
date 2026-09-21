'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, LayoutDashboard, LogIn } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';

interface PublicHeaderProps {
  user?: {
    name: string;
    role: string;
  } | null;
}

export function PublicHeader({ user }: PublicHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/browse', label: 'Browse Harvests' },
    { href: '/how-it-works', label: 'How it works' },
    { href: '/for-businesses', label: 'For Kitchens' },
    { href: '/for-farmers', label: 'For Farmers' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/faq', label: 'FAQ' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 focus:outline-none focus:ring-2 focus:ring-ring rounded-md">
          <div className="relative w-8 h-8 rounded-md overflow-hidden bg-brand-forest/10 dark:bg-card p-1">
            <Image
              src="/uma-logo-green.png"
              alt="UMA Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-display font-black tracking-tight text-brand-forest dark:text-brand-green">
            UMA
          </span>
          <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-forest/10 dark:bg-brand-forest/20 text-brand-forest dark:text-brand-green border border-brand-forest/20">
            Research Pilot
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium text-muted-foreground">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-1.5 rounded-lg transition-colors hover:text-foreground hover:bg-muted/50',
                  isActive && 'text-foreground font-semibold bg-muted/40'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          <ThemeToggle />

          {user ? (
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: 'default' }), 'bg-brand-forest hover:bg-brand-forest/90 text-white gap-1.5')}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Go to Dashboard</span>
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className={cn(buttonVariants({ variant: 'ghost' }), 'text-foreground hover:bg-muted inline-flex items-center gap-1.5')}
              >
                <LogIn className="w-4 h-4" />
                <span>Log in</span>
              </Link>
              <Link
                href="/register"
                className={cn(buttonVariants({ variant: 'default' }), 'bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold shadow-xs inline-flex items-center')}
              >
                <span>Join the pilot</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger & Theme Toggle */}
        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="text-foreground"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'px-3 py-2 rounded-lg text-base font-medium transition-colors hover:bg-muted',
                    isActive ? 'text-primary font-bold bg-muted/50' : 'text-muted-foreground'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-border/80 flex flex-col gap-2">
            {user ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(buttonVariants({ variant: 'default' }), 'w-full bg-brand-forest text-white gap-2 justify-center')}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Go to Dashboard</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(buttonVariants({ variant: 'outline' }), 'w-full justify-center')}
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(buttonVariants({ variant: 'default' }), 'w-full justify-center bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold')}
                >
                  Join the pilot
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
