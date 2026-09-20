'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Moon, Sun, ChevronRight, Truck, ShoppingBag, Star, 
  MapPin, Store, CheckCircle2, ArrowRight, Sparkles, Gift
} from 'lucide-react';
import { CATALOG_PRODUCTS, Product } from '@/lib/catalog';
import { useTheme } from '@/context/ThemeContext';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export default function HomePage() {
  const { isDark, toggleTheme } = useTheme();
  const [orderProduct, setOrderProduct] = useState<Product | null>(null);
  const [orderQty, setOrderQty] = useState<number>(5);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [signupEmail, setSignupEmail] = useState('');
  const [promoClaimed, setPromoClaimed] = useState(false);

  // Top 6 popular essentials for the landing page
  const popularProducts = CATALOG_PRODUCTS.filter((p) => p.isPopular).slice(0, 6);

  const handleClaimPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupEmail) return;
    setPromoClaimed(true);
    setTimeout(() => {
      setPromoClaimed(false);
      setSignupEmail('');
    }, 3500);
  };

  const handleOrder = (e: React.FormEvent) => {
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
      
      {/* 1. Top Promo Banner */}
      <div className="bg-emerald-600 text-white text-xs font-medium py-2 px-4 text-center flex items-center justify-center gap-2">
        <Gift size={14} className="shrink-0" />
        <span><strong>Free delivery on your 1st order</strong> • Farm fresh to your door in Butuan</span>
        <button
          onClick={() => document.getElementById('claim-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="underline font-bold ml-1 hover:text-emerald-100 transition cursor-pointer"
        >
          Claim Now
        </button>
      </div>

      {/* 2. Navigation Bar */}
      <header className="border-b border-border bg-background/95 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/uma-logo-green.png"
              alt="UMA Logo"
              width={32}
              height={32}
              className="object-contain transition-transform group-hover:scale-105"
              priority
            />
            <span className="text-xl font-bold tracking-tight">UMA</span>
          </Link>

          {/* Links & Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/products" className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground font-medium transition">
              Products
            </Link>
            <button
              onClick={() => document.getElementById('how-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground font-medium transition cursor-pointer"
            >
              How It Works
            </button>
            <Link href="/dashboard" className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground font-medium transition">
              Dashboard
            </Link>

            <Separator orientation="vertical" className="hidden sm:block h-4 mx-1" />

            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="icon-sm"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-zinc-700" />}
            </Button>

            {/* Sign In CTA */}
            <Link href="/login" className={buttonVariants({ variant: "emerald", size: "sm" })}>
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="border-b border-border bg-card/40 py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Punchy Headline & CTAs */}
            <div className="lg:col-span-7 space-y-5">
              <Badge variant="secondary" className="gap-1.5 px-2.5 py-1 text-xs text-emerald-600 dark:text-emerald-400">
                <Sparkles size={12} />
                <span>Butuan Farm Direct</span>
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                Fresh farm food.<br />
                <span className="text-emerald-600 dark:text-emerald-400">Delivered fast.</span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed">
                Bottled cow milk, fresh eggs, and veggies straight from Butuan farms. Fair prices, zero middlemen.
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <Link href="/products" className={buttonVariants({ variant: "emerald", size: "lg", className: "gap-2" })}>
                  <span>Browse Catalog</span>
                  <ChevronRight size={16} />
                </Link>
                <Link href="/login" className={buttonVariants({ variant: "outline", size: "lg" })}>
                  Business Login
                </Link>
              </div>

              {/* Value Badges */}
              <div className="pt-4 border-t border-border flex flex-wrap gap-5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span>Free 1st delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span>Pickup nearby</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span>Pay on delivery</span>
                </div>
              </div>
            </div>

            {/* Right: Featured Card */}
            <div className="lg:col-span-5">
              <Card className="shadow-lg overflow-hidden border-border">
                <div className="p-4 pb-2 flex items-center justify-between">
                  <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Today&apos;s Pick
                  </Badge>
                  <span className="text-xs font-mono text-muted-foreground">45 min delivery</span>
                </div>

                <div className="relative h-48 w-full bg-muted overflow-hidden px-4">
                  <div className="relative h-full w-full rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80"
                      alt="Fresh Cow Milk"
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover"
                      priority
                    />
                    <Badge className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px]">
                      Morning Milking
                    </Badge>
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-xs text-amber-400 flex items-center gap-1">
                      <Star size={11} fill="currentColor" />
                      <span>4.9</span>
                    </div>
                  </div>
                </div>

                <CardContent className="pt-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-base">Fresh Cow Milk</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin size={11} className="text-emerald-500" /> Buenavista Dairy Hills
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">₱95</div>
                      <div className="text-[10px] text-muted-foreground">1L Glass Bottle</div>
                    </div>
                  </div>

                  <div className="text-xs flex justify-between pt-2 border-t border-border">
                    <span className="text-muted-foreground">Delivery Fee:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">₱0 (1st order promo)</span>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <Link href="/products" className={buttonVariants({ variant: "emerald", className: "w-full gap-2" })}>
                    <ShoppingBag size={14} />
                    <span>Order Now</span>
                  </Link>
                </CardFooter>
              </Card>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Popular Essentials Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-grow">
        <div className="flex justify-between items-end mb-8 gap-3">
          <div>
            <Badge variant="secondary" className="mb-1 text-[11px]">Top Picks</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Popular Today</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Harvested fresh this morning by local growers.
            </p>
          </div>
          
          <Link href="/products" className={buttonVariants({ variant: "ghost", size: "sm", className: "text-emerald-600 dark:text-emerald-400 gap-1" })}>
            <span>View all 10+</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {popularProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:border-emerald-500/50 transition-all flex flex-col justify-between group">
              {/* Product Image */}
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

              {/* Card Body */}
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
                  <span>Quick Order</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Catalog Teaser Banner */}
        <Card className="mt-10 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-muted/40">
          <div>
            <h3 className="font-bold text-base">Looking for more items?</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Explore bell peppers, cabbage, native garlic, potatoes, and bulk staples.
            </p>
          </div>
          <Link href="/products" className={buttonVariants({ size: "sm", className: "bg-foreground text-background hover:bg-foreground/90 gap-1.5 shrink-0" })}>
            <span>Open Catalog</span>
            <ArrowRight size={14} />
          </Link>
        </Card>
      </section>

      {/* 5. How It Works Section */}
      <section id="how-section" className="border-y border-border bg-card/40 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-md mx-auto mb-10">
            <Badge variant="secondary" className="mb-1 text-[11px]">3 Steps</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">How UMA Works</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Fresh farm food at your door without friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card className="p-5 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-bold text-base">Choose Items</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Pick fresh milk, veggies, or eggs. Mix from different local farms into one basket.
              </p>
            </Card>

            <Card className="p-5 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-bold text-base">Farms Harvest</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Growers harvest fresh for your order. Fast couriers bring it to your door or pickup nearby.
              </p>
            </Card>

            <Card className="p-5 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-bold text-base">Inspect & Pay</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Check produce freshness at your door before confirming. Fair prices, no hassle.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 6. Free Delivery CTA Section */}
      <section id="claim-section" className="max-w-md mx-auto px-4 py-12 sm:py-16 text-center">
        <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
          <Gift size={20} />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-1">Get Free Delivery</h2>
        <p className="text-xs text-muted-foreground mb-6">
          Claim ₱0 delivery fee on your first order.
        </p>

        {promoClaimed ? (
          <Badge variant="outline" className="p-3 text-xs text-emerald-600 dark:text-emerald-400 border-emerald-500/40">
            🎉 Promo applied! Free delivery active at checkout.
          </Badge>
        ) : (
          <form onSubmit={handleClaimPromo} className="flex gap-2">
            <Input
              type="email"
              required
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              placeholder="Enter your email"
              className="text-xs"
            />
            <Button type="submit" size="default" variant="emerald" className="shrink-0 text-xs">
              Claim
            </Button>
          </form>
        )}
      </section>

      {/* Quick Order Dialog */}
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
              <form onSubmit={handleOrder} className="space-y-3 text-xs">
                <Card className="p-3 space-y-1 bg-muted/40">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">₱{orderProduct.price} / {orderProduct.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Est. Delivery:</span>
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

      {/* 7. Footer */}
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
            <Link href="/products" className="hover:text-foreground transition">Catalog</Link>
            <Link href="/dashboard" className="hover:text-foreground transition">Dashboard</Link>
            <Link href="/login" className="hover:text-foreground transition">Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
