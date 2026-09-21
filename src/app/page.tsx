import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { getOptionalUser } from '@/server/auth/guards';
import { PublicHeader } from '@/components/navigation/PublicHeader';
import { PublicFooter } from '@/components/navigation/PublicFooter';
import { SampleBasketCard } from '@/components/landing/SampleBasketCard';
import { FeeCalculator } from '@/components/landing/FeeCalculator';
import { LiveHarvestPreview } from '@/components/landing/LiveHarvestPreview';
import { FaqAccordion } from '@/components/landing/FaqAccordion';
import { LeadCaptureForm } from '@/components/landing/LeadCaptureForm';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, ShieldCheck, MapPin, CheckCircle2, 
  Store, Tractor, AlertCircle 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'UMA — B2B Agricultural Marketplace | Scheduled Produce for Kitchens',
  description:
    'Connecting Butuan-area smallholder farmers directly with commercial kitchens, carinderias, canteens, and restaurants. Transparent 8% fee, harvest-to-order scheduling, and photo-verified delivery.',
  openGraph: {
    title: 'UMA — B2B Agricultural Marketplace',
    description:
      'Scheduled farm-fresh produce for commercial kitchens in Butuan City & Agusan del Norte. 8% platform fee · Zero bagsakan markups.',
    url: 'https://uma.xalhexi.wtf',
    siteName: 'UMA Marketplace',
    locale: 'en_PH',
    type: 'website',
  },
};

export default async function HomePage() {
  const user = await getOptionalUser();

  let activeListings: Array<{
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
      name: string;
      barangay: string;
      reliabilityScore: number;
    };
  }> = [];

  try {
    activeListings = await prisma.listing.findMany({
      where: { status: 'ACTIVE' },
      take: 4,
      orderBy: { harvestDate: 'asc' },
      include: {
        farmer: {
          select: {
            name: true,
            barangay: true,
            reliabilityScore: true,
          },
        },
      },
    });
  } catch {
    // If DB is offline or in mock build, activeListings remains empty and UI gracefully handles it
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'UMA Agricultural B2B Marketplace',
    url: 'https://uma.xalhexi.wtf',
    logo: 'https://uma.xalhexi.wtf/uma-logo-green.png',
    description:
      'B2B forward-order agricultural platform connecting Butuan-area farmers directly with commercial kitchens, carinderias, and restaurants.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Butuan City',
      addressRegion: 'Agusan del Norte',
      addressCountry: 'PH',
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-brand-forest selection:text-white">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigation Bar */}
      <PublicHeader user={user} />

      <main className="flex-1">
        {/* ================= 1. HERO SECTION ================= */}
        <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-border/60 bg-linear-to-b from-brand-forest/5 via-background to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Headlines & Actions */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-forest/30 bg-brand-forest/10 text-brand-forest dark:text-brand-green text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>Agricultural Logistics Research Proposal & Pilot Platform</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-foreground leading-[1.12]">
                  Direct B2B Farm Procurement,{' '}
                  <span className="text-brand-forest dark:text-brand-green underline decoration-harvest-amber decoration-4 underline-offset-4">
                    scheduled to your kitchen.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  A proposed harvest-to-order direct supply chain connecting Butuan smallholder farmers with carinderias, restaurants, and commercial canteens. Pre-scheduled morning batches, zero speculative waste, and a transparent 8% coordination fee.
                </p>

                {/* Primary & Secondary Action CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/register?role=BUYER"
                    className="px-6 py-3 rounded-lg bg-harvest-amber hover:bg-harvest-amber/90 text-neutral-900 font-bold text-sm sm:text-base shadow-sm transition-all hover:translate-y-[-1px] cursor-pointer inline-flex items-center gap-2 font-display"
                  >
                    <span>Explore Kitchen Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/register?role=FARMER"
                    className="px-5 py-3 rounded-lg border border-border bg-card hover:bg-muted text-foreground font-semibold text-sm sm:text-base transition cursor-pointer inline-flex items-center gap-2 font-display"
                  >
                    <Tractor className="w-4 h-4 text-brand-forest dark:text-brand-green" />
                    <span>View Producer Framework</span>
                  </Link>
                </div>

                {/* Trust Line */}
                <div className="pt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-brand-forest dark:text-brand-green shrink-0" />
                    <span>Pilot in Butuan City</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Verified farms & businesses</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Photo proof on every delivery</span>
                  </div>
                </div>

                <div className="pt-1">
                  <a
                    href="#how-it-works"
                    className="text-xs font-semibold text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition"
                  >
                    <span>See how forward scheduling works</span>
                    <span>↓</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Live Sample Basket Card */}
              <div className="lg:col-span-5">
                <SampleBasketCard />
              </div>

            </div>
          </div>
        </section>

        {/* ================= 2. THE PROBLEM SECTION ================= */}
        <section className="py-16 sm:py-20 border-b border-border/60 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <Badge variant="outline" className="text-xs uppercase tracking-wider text-muted-foreground">
                Supply Chain Reality
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                Why Traditional Produce Supply Breaks in Butuan
              </h2>
              <p className="text-sm text-muted-foreground">
                Speculative harvests and multi-tiered middlemen hurt both commercial buyers and growers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Commercial Kitchens */}
              <div className="p-6 rounded-xl bg-card border border-border/80 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Store className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-foreground">Commercial Kitchens</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Erratic supply, changing daily prices, and morning market chaos. Calling ten different stall vendors who may run out before lunch prep begins.
                </p>
              </div>

              {/* Card 2: Smallholder Farmers */}
              <div className="p-6 rounded-xl bg-card border border-border/80 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Tractor className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-foreground">Smallholder Farmers</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Middlemen pocket 20% to 30% of market value. Small harvest baskets cannot justify private transport into the city, leaving farmers price-takers at farmgate.
                </p>
              </div>

              {/* Card 3: Both Sides */}
              <div className="p-6 rounded-xl bg-card border border-border/80 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-lg bg-brand-forest/10 text-brand-forest dark:text-brand-green flex items-center justify-center">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-foreground">Zero Custody Visibility</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Neither side has digital proof of who harvested what, when it was picked up, or who is liable for transit spoilage until crates arrive bruised at the door.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3. HOW IT WORKS (4 STEPS) ================= */}
        <section id="how-it-works" className="py-16 sm:py-24 border-b border-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <Badge variant="outline" className="text-xs uppercase tracking-wider text-brand-forest dark:text-brand-green border-brand-forest/30">
                  Disciplined Operations
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                  The Harvest-to-Order Loop
                </h2>
                <p className="text-sm text-muted-foreground">
                  Zero speculative harvest waste. Direct scheduled movement from farmgate to kitchen prep table.
                </p>
              </div>

              <Link
                href="/how-it-works"
                className="text-xs sm:text-sm font-bold text-brand-forest dark:text-brand-green hover:underline inline-flex items-center gap-1"
              >
                <span>Read the full operational blueprint</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {/* Step 1 */}
              <div className="p-5 rounded-xl border border-border/80 bg-card space-y-3 relative">
                <div className="w-8 h-8 rounded-full bg-brand-forest text-white font-bold text-xs flex items-center justify-center">
                  1
                </div>
                <h4 className="font-bold text-base text-foreground">Farmers List Upcoming Harvest</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Growers post crop type, estimated kg, and harvest date days before cutting.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-5 rounded-xl border border-border/80 bg-card space-y-3 relative">
                <div className="w-8 h-8 rounded-full bg-harvest-amber text-neutral-900 font-bold text-xs flex items-center justify-center font-display">
                  2
                </div>
                <h4 className="font-bold text-base text-foreground font-display">Forward-Scheduled Order Batching</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Commercial kitchens pre-schedule harvest requirements for consolidated dawn field cutting and morning dispatch.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-5 rounded-xl border border-border/80 bg-card space-y-3 relative">
                <div className="w-8 h-8 rounded-full bg-brand-forest text-white font-bold text-xs flex items-center justify-center">
                  3
                </div>
                <h4 className="font-bold text-base text-foreground">Dawn Harvest at Farmgate</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Farmers cut only the confirmed order quantities at dawn (4:00–5:30 AM). Zero unsold spoilage.
                </p>
              </div>

              {/* Step 4 */}
              <div className="p-5 rounded-xl border border-border/80 bg-card space-y-3 relative">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                  4
                </div>
                <h4 className="font-bold text-base text-foreground">One Combined Courier Run</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Dispatched rider gathers multi-farm baskets and delivers by 9:00 AM with photo proof.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 4. WHY UMA (6-ITEM GRID) ================= */}
        <section className="py-16 sm:py-20 border-b border-border/60 bg-muted/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                Engineered for Commercial Food Service
              </h2>
              <p className="text-sm text-muted-foreground">
                Built specifically around the operational realities of restaurant and carinderia procurement.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-brand-forest dark:text-brand-green" />
                  <span>One Basket, Multiple Farms</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Combine native tomatoes from Antongalon and highland cabbage from Taguibo in a single invoice with consolidated morning delivery.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-brand-forest dark:text-brand-green" />
                  <span>Harvest-to-Order Discipline</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Produce is cut only after your kitchen confirms the order. Arrives within 4 hours of field cutting rather than sitting for days in damp warehouses.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-brand-forest dark:text-brand-green" />
                  <span>Transparent 8% Platform Fee</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  No hidden distributor markups or fluctuating brokerage cuts. A fixed 8% technology and coordination fee shown upfront on every batch.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-brand-forest dark:text-brand-green" />
                  <span>Photo-Verified Custody Chain</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Couriers photograph crates at farmgate pickup and commercial kitchen delivery, preventing quality disputes and missing quantities.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-brand-forest dark:text-brand-green" />
                  <span>Backup Farmer Failover</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  If adverse weather impacts a specific farm, our cooperative failover engine automatically re-routes your order to an approved backup producer.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                  <span>Trade Credit for Vetted Buyers</span>
                  <Badge variant="outline" className="text-[10px] ml-auto">Coming Soon</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Weekly invoice consolidated billing for verified commercial kitchens with 10+ completed on-time payment cycles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 5. WHERE EVERY PESO GOES (CALCULATOR) ================= */}
        <section className="py-16 sm:py-24 border-b border-border/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="text-center space-y-2">
              <Badge variant="outline" className="text-xs uppercase tracking-wider text-harvest-amber border-harvest-amber/40">
                Institutional Honesty
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                Where Every Peso Goes
              </h2>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                No opaque trader spread. Here is the exact unit economics breakdown applied to every produce order on the UMA platform.
              </p>
            </div>

            <FeeCalculator />
          </div>
        </section>

        {/* ================= 6. LIVE HARVEST PREVIEW ================= */}
        {activeListings.length > 0 && (
          <section className="py-16 sm:py-20 border-b border-border/60 bg-muted/15">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="space-y-1">
                  <Badge variant="outline" className="text-xs uppercase tracking-wider text-brand-forest dark:text-brand-green">
                    Confirmed Availability
                  </Badge>
                  <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-foreground">
                    Active Harvest Batches in Pilot Clusters
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Active batches from verified grower cooperatives in Antongalon and Taguibo ready for scheduled cutting.
                  </p>
                </div>

                <Link
                  href="/browse"
                  className="text-xs sm:text-sm font-bold text-brand-forest dark:text-brand-green hover:underline inline-flex items-center gap-1"
                >
                  <span>See full catalog ({activeListings.length} active listings)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <LiveHarvestPreview listings={activeListings} />
            </div>
          </section>
        )}

        {/* ================= 7. FOR KITCHENS / FOR FARMERS SPLIT ================= */}
        <section className="py-16 sm:py-24 border-b border-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                Tailored for Both Sides of the Agri-Economy
              </h2>
              <p className="text-sm text-muted-foreground">
                Select your path to join our Butuan commercial pilot.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* For Kitchens */}
              <div className="p-8 rounded-2xl border border-border/80 bg-card shadow-xs flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Store className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">For Commercial Kitchens</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Carinderias, school canteens, restaurants, and resort catering teams in Butuan City looking for consistent wholesale produce at stable farmgate pricing.
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground pt-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>One invoice, multi-farm consolidated morning delivery by 9:00 AM.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Pay-on-Delivery after visual crate inspection. Cash or GCash.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Forward-scheduled batch procurement for morning prep delivery.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2">
                  <Link
                    href="/for-businesses"
                    className="w-full text-center py-3 px-4 rounded-lg bg-brand-forest hover:bg-brand-forest/90 text-white font-semibold text-xs sm:text-sm transition shadow-xs inline-block"
                  >
                    Explore Commercial Kitchen Benefits
                  </Link>
                </div>
              </div>

              {/* For Farmers */}
              <div className="p-8 rounded-2xl border border-border/80 bg-card shadow-xs flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Tractor className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">For Farmers & Producers</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Smallholder growers and agricultural cooperatives in Antongalon, Taguibo, and Buenavista seeking fair farmgate compensation without middleman discounts.
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground pt-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Harvest only what has been pre-ordered and committed the night before.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Direct courier pickup at your farmgate. No city transport hassle.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Keep 92% of your produce value, settled promptly to your digital ledger.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2">
                  <Link
                    href="/for-farmers"
                    className="w-full text-center py-3 px-4 rounded-lg bg-card border border-border hover:bg-muted text-foreground font-semibold text-xs sm:text-sm transition shadow-xs inline-block"
                  >
                    Learn How Farmers Sell on UMA
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 8. FAQ ACCORDION ================= */}
        <section id="faq" className="py-16 sm:py-24 border-b border-border/60 bg-muted/15">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="text-center space-y-2">
              <Badge variant="outline" className="text-xs uppercase tracking-wider text-muted-foreground">
                Got Questions?
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-muted-foreground">
                Clear, transparent answers about our operational model, verification, and payment terms.
              </p>
            </div>

            <FaqAccordion />

            <div className="text-center pt-2">
              <Link
                href="/faq"
                className="text-xs font-semibold text-brand-forest dark:text-brand-green hover:underline inline-flex items-center gap-1"
              >
                <span>Have more technical questions? View complete FAQ directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ================= 9. JOIN THE PILOT FORM ================= */}
        <section id="join-pilot" className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <Badge variant="outline" className="text-xs uppercase tracking-wider text-harvest-amber border-harvest-amber/40 font-display">
                Research Pilot Cohort
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-foreground">
                Participate in the Butuan Research Pilot Cohort
              </h2>
              <p className="text-sm text-muted-foreground">
                Whether you operate a commercial kitchen or cultivate agricultural plots in Agusan del Norte, register below to participate in our direct procurement pilot study.
              </p>
            </div>

            <LeadCaptureForm />
          </div>
        </section>
      </main>

      {/* Footer */}
      <PublicFooter />
    </div>
  );
}
