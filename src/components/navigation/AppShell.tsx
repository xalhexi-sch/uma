'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Sprout,
  Truck,
  DollarSign,
  ShieldCheck,
  Compass,
  Bell,
  Settings,
  LogOut,
  MapPin,
  AlertTriangle,
  Users,
  Sliders,
  Menu,
  X,
  User as UserIcon,
} from 'lucide-react';
import { Role } from '@prisma/client';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface AppShellProps {
  user: {
    id: number;
    email: string;
    name: string;
    role: Role;
  };
  children: React.ReactNode;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: Role[];
  badge?: number;
}

export function AppShell({ user, children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // All sidebar navigation items per role
  const allNavItems: NavItem[] = [
    // General / Dashboard Home
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      roles: [Role.BUYER, Role.FARMER, Role.COURIER, Role.ADMIN],
    },

    // BUYER specific
    {
      href: '/browse',
      label: 'Browse Harvests',
      icon: Compass,
      roles: [Role.BUYER],
    },
    {
      href: '/dashboard/basket',
      label: 'My Basket',
      icon: ShoppingBag,
      roles: [Role.BUYER],
    },
    {
      href: '/dashboard/orders',
      label: 'Orders & Tracking',
      icon: Package,
      roles: [Role.BUYER],
    },

    // FARMER specific
    {
      href: '/dashboard/listings',
      label: 'Harvest Listings',
      icon: Sprout,
      roles: [Role.FARMER],
    },
    {
      href: '/dashboard/orders',
      label: 'Orders to Harvest',
      icon: Package,
      roles: [Role.FARMER],
    },
    {
      href: '/dashboard/payouts',
      label: 'Payout Ledger',
      icon: DollarSign,
      roles: [Role.FARMER],
    },

    // COURIER specific
    {
      href: '/dashboard/deliveries',
      label: 'Today\'s Runs',
      icon: Truck,
      roles: [Role.COURIER],
    },

    // ADMIN specific
    {
      href: '/dashboard/admin/verifications',
      label: 'Verifications',
      icon: ShieldCheck,
      roles: [Role.ADMIN],
    },
    {
      href: '/dashboard/admin/routes',
      label: 'Routes & Dispatch',
      icon: MapPin,
      roles: [Role.ADMIN],
    },
    {
      href: '/dashboard/admin/disputes',
      label: 'Disputes & Claims',
      icon: AlertTriangle,
      roles: [Role.ADMIN],
    },
    {
      href: '/dashboard/admin/leads',
      label: 'Pilot Leads',
      icon: Users,
      roles: [Role.ADMIN],
    },
    {
      href: '/dashboard/admin/config',
      label: 'Platform Config',
      icon: Sliders,
      roles: [Role.ADMIN],
    },

    // Common items
    {
      href: '/dashboard/notifications',
      label: 'Notifications',
      icon: Bell,
      roles: [Role.BUYER, Role.FARMER, Role.COURIER, Role.ADMIN],
    },
    {
      href: '/dashboard/settings',
      label: 'Account Settings',
      icon: Settings,
      roles: [Role.BUYER, Role.FARMER, Role.COURIER, Role.ADMIN],
    },
  ];

  // Filter items for current user role
  const allowedNavItems = allNavItems.filter((item) => item.roles.includes(user.role));

  // Mobile Bottom Tab Bar Items (Max 5 items)
  const getMobileBottomTabs = (): NavItem[] => {
    switch (user.role) {
      case Role.BUYER:
        return [
          { href: '/dashboard', label: 'Home', icon: LayoutDashboard, roles: [Role.BUYER] },
          { href: '/browse', label: 'Browse', icon: Compass, roles: [Role.BUYER] },
          { href: '/dashboard/basket', label: 'Basket', icon: ShoppingBag, roles: [Role.BUYER] },
          { href: '/dashboard/orders', label: 'Orders', icon: Package, roles: [Role.BUYER] },
          { href: '/dashboard/settings', label: 'Account', icon: UserIcon, roles: [Role.BUYER] },
        ];
      case Role.FARMER:
        return [
          { href: '/dashboard', label: 'Home', icon: LayoutDashboard, roles: [Role.FARMER] },
          { href: '/dashboard/listings', label: 'Listings', icon: Sprout, roles: [Role.FARMER] },
          { href: '/dashboard/orders', label: 'Harvests', icon: Package, roles: [Role.FARMER] },
          { href: '/dashboard/payouts', label: 'Payouts', icon: DollarSign, roles: [Role.FARMER] },
          { href: '/dashboard/settings', label: 'Account', icon: UserIcon, roles: [Role.FARMER] },
        ];
      case Role.COURIER:
        return [
          { href: '/dashboard', label: 'Run Sheet', icon: Truck, roles: [Role.COURIER] },
          { href: '/dashboard/deliveries', label: 'History', icon: Package, roles: [Role.COURIER] },
          { href: '/dashboard/notifications', label: 'Alerts', icon: Bell, roles: [Role.COURIER] },
          { href: '/dashboard/settings', label: 'Account', icon: UserIcon, roles: [Role.COURIER] },
        ];
      case Role.ADMIN:
        return [
          { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, roles: [Role.ADMIN] },
          { href: '/dashboard/admin/verifications', label: 'Verify', icon: ShieldCheck, roles: [Role.ADMIN] },
          { href: '/dashboard/admin/routes', label: 'Routes', icon: MapPin, roles: [Role.ADMIN] },
          { href: '/dashboard/admin/disputes', label: 'Disputes', icon: AlertTriangle, roles: [Role.ADMIN] },
          { href: '/dashboard/settings', label: 'Account', icon: UserIcon, roles: [Role.ADMIN] },
        ];
    }
  };

  const mobileTabs = getMobileBottomTabs();

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        toast.success('Signed out successfully');
        router.push('/login');
        router.refresh();
      } else {
        toast.error('Failed to log out');
      }
    } catch {
      toast.error('Network error during logout');
    } finally {
      setLoggingOut(false);
    }
  };

  const roleLabel = {
    [Role.BUYER]: 'Kitchen Buyer',
    [Role.FARMER]: 'Smallholder Farmer',
    [Role.COURIER]: 'UMA Courier',
    [Role.ADMIN]: 'UMA Operations',
  }[user.role];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground">
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card/60 shrink-0 sticky top-0 h-screen overflow-y-auto">
        {/* Brand */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-md overflow-hidden bg-brand-forest/10 dark:bg-card p-1">
              <Image
                src="/uma-logo-green.png"
                alt="UMA Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight text-brand-forest dark:text-brand-green leading-none">
                UMA
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mt-0.5">
                {roleLabel}
              </span>
            </div>
          </Link>
        </div>

        {/* User Card */}
        <div className="p-4 border-b border-border/60 bg-muted/20">
          <p className="text-xs font-semibold text-foreground truncate">{user.name}</p>
          <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {allowedNavItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground font-semibold shadow-2xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                )}
              >
                <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-primary-foreground' : 'text-muted-foreground')} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-border space-y-1">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-xs text-muted-foreground">Appearance</span>
            <ThemeToggle />
          </div>

          <Button
            variant="ghost"
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full justify-start gap-3 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4" />
            <span>{loggingOut ? 'Signing out...' : 'Sign out'}</span>
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        {/* Mobile Header (< md) */}
        <header className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 h-14 border-b border-border bg-background/95 backdrop-blur-md">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-6 h-6 rounded overflow-hidden">
              <Image src="/uma-logo-green.png" alt="UMA Logo" fill className="object-contain" />
            </div>
            <span className="font-black text-brand-forest dark:text-brand-green">UMA</span>
          </Link>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              aria-label="Toggle menu"
            >
              {mobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </header>

        {/* Mobile Slide-out menu for all role items */}
        {mobileDrawerOpen && (
          <div className="md:hidden border-b border-border bg-card p-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
            <div className="pb-2 border-b border-border">
              <p className="text-xs font-semibold text-foreground">{user.name}</p>
              <p className="text-[11px] text-muted-foreground">{roleLabel}</p>
            </div>
            <nav className="space-y-1">
              {allowedNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileDrawerOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted text-foreground"
                  >
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full justify-center text-xs text-destructive mt-2"
            >
              Sign out
            </Button>
          </div>
        )}

        {/* Page Content Body */}
        <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Tab Bar (< md) (Max 5 items) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border flex items-center justify-around h-14 px-2">
        {mobileTabs.map((tab) => {
          const isActive = pathname === tab.href || (tab.href !== '/dashboard' && pathname.startsWith(tab.href));
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 py-1 text-center transition-colors min-h-[44px]',
                isActive ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className={cn('w-5 h-5 shrink-0', isActive ? 'text-primary' : 'text-muted-foreground')} />
              <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
