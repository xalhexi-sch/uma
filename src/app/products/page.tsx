'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Search, Star, ShoppingBag, MapPin, Truck, 
  Store, CheckCircle2, ArrowLeft, Sun, Moon
} from 'lucide-react';
import { CATALOG_PRODUCTS, Product } from '@/lib/catalog';
import { useTheme } from '@/context/ThemeContext';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export default function ProductsPage() {
  const { isDark, toggleTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [fulfillmentFilter, setFulfillmentFilter] = useState<'all' | 'pickup'>('all');
  const [orderProduct, setOrderProduct] = useState<Product | null>(null);
  const [orderQty, setOrderQty] = useState<number>(5);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'vegetables', label: 'Fresh Veggies' },
    { id: 'dairy', label: 'Milk & Dairy' },
    { id: 'poultry', label: 'Eggs & Poultry' },
    { id: 'staples', label: 'Staples' },
  ];

  const filteredProducts = useMemo(() => {
    return CATALOG_PRODUCTS.filter((prod) => {
      const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;
      const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFulfillment = fulfillmentFilter === 'all' || (fulfillmentFilter === 'pickup' && prod.hasPickup);
      return matchesCategory && matchesSearch && matchesFulfillment;
    });
  }, [selectedCategory, searchQuery, fulfillmentFilter]);

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderProduct) return;
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      setOrderProduct(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Banner */}
      <div className="bg-emerald-600 text-white text-xs font-medium py-2 px-4 text-center">
        Free delivery on first order • Pick-up & Delivery available across Butuan City
      </div>

      {/* Navigation */}
      <header className="border-b border-border bg-background/95 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <Image
                src="/uma-logo-green.png"
                alt="UMA Logo"
                width={32}
                height={32}
                className="object-contain transition-transform group-hover:scale-105"
                priority
              />
              <span className="font-bold text-xl tracking-tight">UMA</span>
            </Link>
          </div>

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

            <Link href="/dashboard" className={buttonVariants({ variant: "outline", size: "sm" })}>
              Dashboard
            </Link>

            <Link href="/login" className={buttonVariants({ variant: "emerald", size: "sm" })}>
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Catalog Header & Filters */}
      <div className="border-b border-border bg-card/40 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Link href="/" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 mb-1.5 transition">
                <ArrowLeft size={13} /> Back to Home
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Farm Catalog</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Direct from Butuan growers. Zero middleman markup.</p>
            </div>

            {/* Search Input */}
            <div className="relative max-w-sm w-full">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search produce or dairy..."
                className="pl-9 text-xs h-9"
              />
            </div>
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            {/* Category Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  size="xs"
                  variant={selectedCategory === cat.id ? "emerald" : "outline"}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="rounded-full text-xs"
                >
                  {cat.label}
                </Button>
              ))}
            </div>

            {/* Delivery Toggle */}
            <div className="flex items-center gap-1 bg-muted/60 p-0.5 rounded-lg border border-border text-xs">
              <Button
                size="xs"
                variant={fulfillmentFilter === 'all' ? "emerald" : "ghost"}
                onClick={() => setFulfillmentFilter('all')}
                className="text-xs"
              >
                All Delivery
              </Button>
              <Button
                size="xs"
                variant={fulfillmentFilter === 'pickup' ? "emerald" : "ghost"}
                onClick={() => setFulfillmentFilter('pickup')}
                className="text-xs gap-1"
              >
                <Store size={11} /> Pickup Nearby
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-grow">
        <div className="text-xs text-muted-foreground mb-6">
          Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> items available today
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground text-sm">
            No products found. Try another search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:border-emerald-500/50 transition-all flex flex-col justify-between group">
                {/* Photo */}
                <div className="relative aspect-[16/10] w-full bg-muted overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 flex gap-1">
                    {product.badge && (
                      <Badge className="bg-emerald-600 text-white text-[10px]">
                        {product.badge}
                      </Badge>
                    )}
                    {product.hasPickup && (
                      <Badge variant="secondary" className="text-[10px] gap-1 bg-black/70 text-white">
                        <Store size={10} /> Pickup
                      </Badge>
                    )}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 bg-black/80 px-2 py-0.5 rounded text-[11px] font-semibold text-amber-400 flex items-center gap-1">
                    <Star size={11} fill="currentColor" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="pt-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition leading-snug">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">₱{product.price}</span>
                      <span className="text-xs text-muted-foreground">/ {product.unit}</span>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-border space-y-1 text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span className="flex items-center gap-1">
                          <Truck size={12} className="text-emerald-500" /> Delivery:
                        </span>
                        <span className="font-medium text-foreground">{product.deliveryEstimate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} /> Origin:
                        </span>
                        <span>{product.origin}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      setOrderProduct(product);
                      setOrderQty(product.minOrder);
                    }}
                    variant="emerald"
                    className="mt-4 w-full gap-1.5"
                    size="sm"
                  >
                    <ShoppingBag size={14} />
                    <span>Add / Order</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Order Modal */}
      {orderProduct && (
        <Dialog open={!!orderProduct} onOpenChange={(open) => !open && setOrderProduct(null)}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-base font-bold">Quick Order</DialogTitle>
              <DialogDescription className="text-xs">{orderProduct.name}</DialogDescription>
            </DialogHeader>

            {orderSuccess ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 size={36} className="mx-auto text-emerald-500" />
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Order Confirmed!</p>
                <p className="text-xs text-muted-foreground">Track live in your Dashboard.</p>
              </div>
            ) : (
              <form onSubmit={handleConfirmOrder} className="space-y-3 text-xs">
                <Card className="p-3 space-y-1 bg-muted/40">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Unit Price:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">₱{orderProduct.price} / {orderProduct.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Est. Arrival:</span>
                    <span className="font-medium text-foreground">{orderProduct.deliveryEstimate}</span>
                  </div>
                </Card>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Quantity</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{orderQty} {orderProduct.unit}</span>
                  </div>
                  <input
                    type="range"
                    min={orderProduct.minOrder}
                    max={Math.min(50, orderProduct.availableQty)}
                    step={orderProduct.unit.includes('Tray') ? 1 : 2}
                    value={orderQty}
                    onChange={(e) => setOrderQty(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div className="pt-2 border-t border-border flex justify-between font-bold text-sm">
                  <span>Total:</span>
                  <span className="text-emerald-600 dark:text-emerald-400">₱{(orderQty * orderProduct.price).toLocaleString()}</span>
                </div>

                <Button type="submit" variant="emerald" className="w-full">
                  Confirm Order
                </Button>
              </form>
            )}
          </DialogContent>
        </Dialog>
      )}

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground bg-card/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Image
              src="/uma-logo-green.png"
              alt="UMA Logo"
              width={18}
              height={18}
              className="object-contain"
            />
            <span className="font-semibold text-foreground">UMA</span>
            <span>• Fresh Butuan farm delivery © 2026</span>
          </div>

          <div className="flex gap-4">
            <Link href="/" className="hover:text-foreground transition">Home</Link>
            <Link href="/dashboard" className="hover:text-foreground transition">Dashboard</Link>
            <Link href="/login" className="hover:text-foreground transition">Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
