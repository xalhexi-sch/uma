import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { getOptionalUser } from '@/server/auth/guards';
import { PublicHeader } from '@/components/navigation/PublicHeader';
import { PublicFooter } from '@/components/navigation/PublicFooter';
import { ProductImage } from '@/components/shared/ProductImage';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatPeso } from '@/lib/money';
import { formatManilaDate } from '@/lib/dates';
import { MapPin, Calendar, Search, Star, ShoppingBag, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Browse Available Harvests — UMA B2B Marketplace',
  description:
    'Explore upcoming harvest batches from verified Butuan smallholder farmers. Reserve wholesale produce for scheduled morning kitchen delivery.',
};

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const user = await getOptionalUser();
  const { category, q } = await searchParams;

  const whereClause: Record<string, unknown> = {
    status: 'ACTIVE',
  };

  if (category && category !== 'ALL') {
    whereClause.category = { equals: category, mode: 'insensitive' };
  }

  if (q) {
    whereClause.OR = [
      { crop: { contains: q, mode: 'insensitive' } },
      { farmer: { name: { contains: q, mode: 'insensitive' } } },
      { farmer: { barangay: { contains: q, mode: 'insensitive' } } },
    ];
  }

  let listings: Array<{
    id: number;
    crop: string;
    category: string;
    priceCentavos: number;
    unit: string;
    estimatedQty: number;
    reservedQty: number;
    minOrderQty: number;
    harvestDate: Date;
    imageUrl?: string | null;
    farmer: {
      id: number;
      name: string;
      barangay: string;
      reliabilityScore: number;
    };
  }> = [];

  try {
    listings = await prisma.listing.findMany({
      where: whereClause,
      orderBy: { harvestDate: 'asc' },
      include: {
        farmer: {
          select: {
            id: true,
            name: true,
            barangay: true,
            reliabilityScore: true,
          },
        },
      },
    });
  } catch {
    // Gracefully handled with empty state if DB is offline during build
  }

  const categories = [
    { id: 'ALL', label: 'All Crops' },
    { id: 'Fruit Vegetables', label: 'Fruit Vegetables' },
    { id: 'Leafy Greens', label: 'Leafy Greens' },
    { id: 'Root Crops', label: 'Root Crops' },
    { id: 'Cruciferous', label: 'Cruciferous' },
    { id: 'Alliums & Herbs', label: 'Alliums & Herbs' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <PublicHeader user={user} />

      <main className="flex-1 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-forest dark:text-brand-green">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-Time Farmgate Availability · Butuan City Pilot</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-display font-black tracking-tight text-foreground">
              Upcoming Produce Harvests
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
              Commercial kitchens pre-schedule forward orders for scheduled morning 6:00–9:00 AM delivery. Farmers cut only confirmed batch quantities.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="p-4 rounded-xl border border-border/80 bg-card shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Category Chips */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => {
                  const isActive = (!category && cat.id === 'ALL') || category === cat.id;
                  return (
                    <Link
                      key={cat.id}
                      href={cat.id === 'ALL' ? '/browse' : `/browse?category=${encodeURIComponent(cat.id)}`}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        isActive
                          ? 'bg-brand-forest text-white shadow-xs'
                          : 'bg-muted/60 hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      {cat.label}
                    </Link>
                  );
                })}
              </div>

              {/* Batch Procurement Badge */}
              <div className="flex items-center gap-1.5 text-xs text-brand-forest dark:text-brand-green font-semibold bg-brand-forest/10 px-3 py-1.5 rounded-lg border border-brand-forest/20">
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span>Forward-Scheduled Batch Fulfillment</span>
              </div>
            </div>
          </div>

          {/* Listings Grid */}
          {listings.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-dashed border-border bg-card/50 space-y-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-foreground">No active harvests found</h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                No active produce batches match this specific filter. New harvest listings are posted daily by growers in Antongalon, Taguibo, and Buenavista.
              </p>
              <Link
                href="/browse"
                className="inline-block px-4 py-2 rounded-lg bg-brand-forest text-white text-xs font-semibold"
              >
                Clear Filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {listings.map((item) => {
                const availableQty = Math.max(0, item.estimatedQty - item.reservedQty);
                const harvestDateObj = new Date(item.harvestDate);

                return (
                  <Card
                    key={item.id}
                    className="border-border/80 shadow-xs hover:shadow-md transition-all duration-200 bg-card overflow-hidden flex flex-col group"
                  >
                    <div className="relative overflow-hidden">
                      <ProductImage
                        src={item.imageUrl}
                        alt={item.crop}
                        category={item.category}
                        aspectRatio="video"
                        className="group-hover:scale-103 transition-transform duration-300"
                      />
                      <div className="absolute top-2.5 right-2.5">
                        <Badge variant="outline" className="bg-background/90 backdrop-blur-xs text-foreground font-bold border-border/80 text-[10px]">
                          {availableQty} {item.unit.toLowerCase()} available
                        </Badge>
                      </div>
                      <div className="absolute top-2.5 left-2.5">
                        <Badge variant="outline" className="bg-brand-forest/90 text-white font-semibold border-none text-[10px]">
                          Min: {item.minOrderQty} {item.unit.toLowerCase()}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-forest dark:text-brand-green">
                          {item.category}
                        </span>
                        <h3 className="font-bold text-base text-foreground line-clamp-1 group-hover:text-brand-forest dark:group-hover:text-brand-green transition-colors">
                          {item.crop}
                        </h3>
                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-0.5">
                          <span className="flex items-center gap-1 truncate">
                            <MapPin className="w-3.5 h-3.5 text-brand-forest dark:text-brand-green shrink-0" />
                            {item.farmer.name} · {item.farmer.barangay}
                          </span>
                          <span className="flex items-center gap-0.5 font-semibold text-amber-600 dark:text-amber-400">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            {item.farmer.reliabilityScore.toFixed(1)}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-border/60 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Price per {item.unit.toLowerCase()}:</span>
                          <span className="text-lg font-black tabular-nums text-foreground">
                            {formatPeso(item.priceCentavos)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-amber-500" />
                            Harvest Date:
                          </span>
                          <span className="font-semibold text-foreground">
                            {formatManilaDate(harvestDateObj, 'friendly')}
                          </span>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="p-4 pt-0">
                      {user?.role === 'BUYER' ? (
                        <Link
                          href="/dashboard/basket"
                          className="w-full text-center py-2.5 px-3 rounded-lg bg-harvest-amber hover:bg-harvest-amber/90 text-neutral-900 font-bold text-xs transition shadow-xs flex items-center justify-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Commercial Basket</span>
                        </Link>
                      ) : (
                        <Link
                          href="/login?next=/browse"
                          className="w-full text-center py-2.5 px-3 rounded-lg bg-brand-forest hover:bg-brand-forest/90 text-white font-semibold text-xs transition shadow-xs flex items-center justify-center gap-1.5"
                        >
                          <span>Log In to Order</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
