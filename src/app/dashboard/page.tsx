'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShoppingBag, Sprout, ShieldCheck, Truck, Clock, 
  Plus, LogOut, MapPin, Phone, Sun, Moon
} from 'lucide-react';
import { getCurrentUser, setCurrentUser, clearCurrentUser, UserSession, UserRole } from '@/lib/auth';
import { useTheme } from '@/context/ThemeContext';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function DashboardPage() {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  // Supplier state: dynamic listings
  const [supplierListings, setSupplierListings] = useState([
    { id: 1, name: 'Fresh Cow Milk (1L Glass Bottle)', qty: 60, price: 95, unit: 'bottle', status: 'Active' },
    { id: 2, name: 'Native Red Tomatoes (Kamatis)', qty: 150, price: 120, unit: 'kg', status: 'Active' },
    { id: 3, name: 'Purple Eggplant (Talong)', qty: 100, price: 80, unit: 'kg', status: 'Active' },
  ]);
  const [newCropName, setNewCropName] = useState('');
  const [newCropQty, setNewCropQty] = useState('');
  const [newCropPrice, setNewCropPrice] = useState('');

  // Buyer state: recent orders
  const [buyerOrders] = useState([
    { id: 'UMA-802', items: '20kg Tomatoes, 10L Milk', total: '₱3,350', status: 'Out for Delivery' },
    { id: 'UMA-791', items: '25kg Eggplant, 30kg Squash', total: '₱3,800', status: 'Delivered' },
  ]);

  // Admin state: platform overview
  const adminStats = {
    totalGmv: '₱142,850',
    totalKg: '1,840 kg',
    pendingDeliveries: 4,
    activeFarmers: 24,
  };

  useEffect(() => {
    const session = getCurrentUser();
    if (!session) {
      const defaultUser = setCurrentUser('buyer');
      setUser(defaultUser);
    } else {
      setUser(session);
    }
    setLoading(false);
  }, []);

  const switchRole = (role: UserRole) => {
    const updated = setCurrentUser(role);
    setUser(updated);
  };

  const handleLogout = () => {
    clearCurrentUser();
    router.push('/login');
  };

  const handleAddListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCropName || !newCropQty || !newCropPrice) return;
    setSupplierListings([
      ...supplierListings,
      {
        id: Date.now(),
        name: newCropName,
        qty: Number(newCropQty),
        price: Number(newCropPrice),
        unit: 'kg',
        status: 'Active',
      }
    ]);
    setNewCropName('');
    setNewCropQty('');
    setNewCropPrice('');
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center text-sm">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Bar */}
      <header className="border-b border-border bg-background/95 px-6 py-3 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/uma-logo-green.png"
                alt="UMA Logo"
                width={26}
                height={26}
                className="object-contain transition-transform group-hover:scale-105"
              />
              <span className="font-bold text-base tracking-tight">UMA</span>
            </Link>

            <Separator orientation="vertical" className="h-4" />

            {/* Portal Badge */}
            <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 text-xs capitalize">
              {user.role === 'buyer' && 'Customer'}
              {user.role === 'supplier' && 'Supplier'}
              {user.role === 'admin' && 'Admin'}
            </Badge>
          </div>

          {/* Role Switcher & Controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-muted/60 p-0.5 rounded-lg border border-border text-xs">
              <Button
                size="xs"
                variant={user.role === 'buyer' ? "emerald" : "ghost"}
                onClick={() => switchRole('buyer')}
                className="text-xs"
              >
                Buyer
              </Button>
              <Button
                size="xs"
                variant={user.role === 'supplier' ? "emerald" : "ghost"}
                onClick={() => switchRole('supplier')}
                className="text-xs"
              >
                Supplier
              </Button>
              <Button
                size="xs"
                variant={user.role === 'admin' ? "emerald" : "ghost"}
                onClick={() => switchRole('admin')}
                className="text-xs"
              >
                Admin
              </Button>
            </div>

            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="icon-xs"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-zinc-700" />}
            </Button>

            <Link href="/products" className={buttonVariants({ variant: "outline", size: "xs" })}>
              Catalog
            </Link>

            <Button
              variant="ghost"
              size="icon-xs"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-destructive"
              title="Sign Out"
            >
              <LogOut size={14} />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-grow">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 pb-4 border-b border-border">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{user.name}</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {user.businessName && `${user.businessName} • `}{user.barangay}
            </p>
          </div>

          <Link href="/products" className={buttonVariants({ variant: "emerald", size: "sm", className: "gap-1.5" })}>
            <ShoppingBag size={14} />
            <span>New Order</span>
          </Link>
        </div>

        {/* 1. BUYER DASHBOARD */}
        {user.role === 'buyer' && (
          <div className="space-y-6">
            {/* Active Delivery Card */}
            <Card className="p-5 border-emerald-500/30 bg-emerald-500/5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <Truck size={15} />
                  <span>Incoming Delivery • Live Courier</span>
                </div>
                <Badge className="bg-emerald-600 text-white text-[10px]">
                  Arriving Tomorrow 7:30 AM
                </Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-muted-foreground block">Order</span>
                  <span className="font-bold text-foreground">UMA-802 (30kg Basket)</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Items</span>
                  <span className="font-medium text-foreground">20kg Tomatoes, 10L Milk</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Courier</span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">Mang Rodel (+63 917 456 7890)</span>
                </div>
              </div>
            </Card>

            {/* Orders & Unlocked Farms */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <Card className="p-5">
                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Clock size={15} className="text-emerald-600 dark:text-emerald-400" />
                  <span>Recent Orders</span>
                </h3>
                <div className="space-y-2.5">
                  {buyerOrders.map((ord) => (
                    <div key={ord.id} className="p-3 rounded-lg bg-muted/40 border border-border flex justify-between items-center text-xs">
                      <div>
                        <div className="font-bold">{ord.id}</div>
                        <div className="text-muted-foreground">{ord.items}</div>
                        <div className="text-emerald-600 dark:text-emerald-400 mt-0.5">{ord.status}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{ord.total}</div>
                        <Button variant="ghost" size="xs" className="h-6 px-1.5 text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-500">
                          Reorder
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Connected Farms */}
              <Card className="p-5">
                <h3 className="font-semibold text-sm mb-1 flex items-center gap-2">
                  <Sprout size={15} className="text-emerald-600 dark:text-emerald-400" />
                  <span>Connected Farms (Unlocked)</span>
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Verified producer contacts for active buyers:
                </p>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-muted/40 border border-border space-y-0.5">
                    <div className="font-semibold">Santos Dairy Farm</div>
                    <div className="text-muted-foreground flex items-center gap-1">
                      <MapPin size={11} /> La Paz • Grade A Certified
                    </div>
                    <div className="text-muted-foreground flex items-center gap-1">
                      <Phone size={11} /> +63 917 123 4567
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-muted/40 border border-border space-y-0.5">
                    <div className="font-semibold">Buenavista Dairy Hills</div>
                    <div className="text-muted-foreground flex items-center gap-1">
                      <MapPin size={11} /> Buenavista • Milk & Fresh Crops
                    </div>
                    <div className="text-muted-foreground flex items-center gap-1">
                      <Phone size={11} /> +63 917 234 5678
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* 2. SUPPLIER DASHBOARD */}
        {user.role === 'supplier' && (
          <div className="space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="p-4">
                <span className="text-xs text-muted-foreground">Available Payout</span>
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">₱18,400</div>
                <span className="text-[11px] text-muted-foreground">Released upon delivery</span>
              </Card>
              <Card className="p-4">
                <span className="text-xs text-muted-foreground">Orders to Harvest</span>
                <div className="text-2xl font-bold text-blue-500 mt-1">65 kg</div>
                <span className="text-[11px] text-muted-foreground">For tomorrow morning</span>
              </Card>
              <Card className="p-4">
                <span className="text-xs text-muted-foreground">Producer Rating</span>
                <div className="text-2xl font-bold text-amber-500 mt-1">★ 4.8 / 5.0</div>
                <span className="text-[11px] text-muted-foreground">87 completed orders</span>
              </Card>
            </div>

            {/* Listings & Form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <Card className="lg:col-span-7 p-5">
                <h3 className="font-semibold text-sm mb-3">Active Listings</h3>
                <div className="space-y-2">
                  {supplierListings.map((listing) => (
                    <div key={listing.id} className="p-3 rounded-lg bg-muted/40 border border-border flex justify-between items-center text-xs">
                      <div>
                        <div className="font-semibold">{listing.name}</div>
                        <div className="text-muted-foreground">Stock: {listing.qty} {listing.unit}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-emerald-600 dark:text-emerald-400">₱{listing.price} / {listing.unit}</div>
                        <Badge variant="secondary" className="text-[10px] mt-1">{listing.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Add Listing Form */}
              <Card className="lg:col-span-5 p-5">
                <h3 className="font-semibold text-sm mb-1">List New Harvest</h3>
                <p className="text-xs text-muted-foreground mb-3">Add items for buyer pre-orders.</p>

                <form onSubmit={handleAddListing} className="space-y-2.5 text-xs">
                  <div>
                    <label className="block text-muted-foreground mb-1">Crop or Item</label>
                    <Input
                      type="text"
                      placeholder="e.g. Goat Milk / Squash"
                      value={newCropName}
                      onChange={(e) => setNewCropName(e.target.value)}
                      className="text-xs h-8"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-muted-foreground mb-1">Quantity</label>
                      <Input
                        type="number"
                        placeholder="50"
                        value={newCropQty}
                        onChange={(e) => setNewCropQty(e.target.value)}
                        className="text-xs h-8"
                      />
                    </div>
                    <div>
                      <label className="block text-muted-foreground mb-1">Price (₱)</label>
                      <Input
                        type="number"
                        placeholder="80"
                        value={newCropPrice}
                        onChange={(e) => setNewCropPrice(e.target.value)}
                        className="text-xs h-8"
                      />
                    </div>
                  </div>
                  <Button type="submit" size="sm" variant="emerald" className="w-full gap-1 mt-1 text-xs">
                    <Plus size={13} />
                    <span>Publish Item</span>
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        )}

        {/* 3. ADMIN DASHBOARD */}
        {user.role === 'admin' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Card className="p-4">
                <span className="text-xs text-muted-foreground">Platform GMV</span>
                <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{adminStats.totalGmv}</div>
              </Card>
              <Card className="p-4">
                <span className="text-xs text-muted-foreground">Volume</span>
                <div className="text-xl font-bold mt-0.5">{adminStats.totalKg}</div>
              </Card>
              <Card className="p-4">
                <span className="text-xs text-muted-foreground">Active Routes</span>
                <div className="text-xl font-bold text-blue-500 mt-0.5">{adminStats.pendingDeliveries}</div>
              </Card>
              <Card className="p-4">
                <span className="text-xs text-muted-foreground">Growers</span>
                <div className="text-xl font-bold text-purple-500 mt-0.5">{adminStats.activeFarmers}</div>
              </Card>
            </div>

            {/* Courier Dispatch */}
            <Card className="p-5">
              <h3 className="font-semibold text-sm mb-3">Live Dispatch (Butuan Corridor)</h3>
              <div className="space-y-2.5 text-xs">
                <div className="p-3.5 rounded-lg bg-muted/40 border border-border flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div>
                    <div className="font-bold">Route 1 • La Paz to City Center</div>
                    <div className="text-muted-foreground">Santos Farm Pick-up → 2 Canteen Drops</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-blue-500">In Transit</Badge>
                    <Button size="xs" variant="emerald">Done</Button>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-muted/40 border border-border flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div>
                    <div className="font-bold">Route 2 • Buenavista Dairy Corridor</div>
                    <div className="text-muted-foreground">Buenavista Hills Milk (60L) → Hub Drop</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-amber-500">6:00 AM</Badge>
                    <Button variant="outline" size="xs">Assign</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        UMA Platform • Logged in as <span className="font-medium text-emerald-600 dark:text-emerald-400">{user.email}</span>
      </footer>
    </div>
  );
}
