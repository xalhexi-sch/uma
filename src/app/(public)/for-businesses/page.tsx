import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getOptionalUser } from '@/server/auth/guards';
import { PublicHeader } from '@/components/navigation/PublicHeader';
import { PublicFooter } from '@/components/navigation/PublicFooter';
import { 
  Store, ShieldCheck, ArrowRight, 
  Clock, Truck, Receipt 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'For Commercial Kitchens — UMA Research Proposal & Pilot Platform',
  description:
    'Pre-scheduled direct agricultural procurement for Butuan carinderias, restaurants, and canteens. Consolidated morning batch delivery with photo custody and transparent cooperative pricing.',
};

export default async function ForBusinessesPage() {
  const user = await getOptionalUser();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <PublicHeader user={user} />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-14 sm:py-20 border-b border-border/60 bg-linear-to-b from-brand-forest/5 via-background to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold">
              <Store className="w-3.5 h-3.5" />
              <span>For Carinderias, Canteens, Restaurants & Catering</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-foreground leading-[1.2]">
              Stop Running to the Bagsakan at 4:00 AM
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Pre-schedule your produce requirements with local farm cooperatives. Receive consolidated morning deliveries between 6:00 AM and 9:00 AM directly to your prep kitchen, backed by photo-verified weight custody and transparent cooperative pricing.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/register?role=BUYER"
                className="px-6 py-3 rounded-lg bg-harvest-amber hover:bg-harvest-amber/90 text-neutral-900 font-bold text-sm shadow-sm transition inline-flex items-center gap-2"
              >
                <span>Register Commercial Kitchen</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/browse"
                className="px-6 py-3 rounded-lg border border-border bg-card hover:bg-muted text-foreground font-semibold text-sm transition"
              >
                View Current Harvests
              </Link>
            </div>
          </div>
        </section>

        {/* 4 Core Kitchen Benefits */}
        <section className="py-16 sm:py-20 border-b border-border/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                Built Around Your Morning Prep Workflow
              </h2>
              <p className="text-sm text-muted-foreground">
                Everything commercial food operators need for predictable ingredient costs and reliable morning supply.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Benefit 1 */}
              <div className="p-6 rounded-xl border border-border/80 bg-card space-y-3">
                <div className="w-10 h-10 rounded-lg bg-brand-forest/10 text-brand-forest dark:text-brand-green flex items-center justify-center">
                  <Receipt className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-foreground">One Basket, One Invoice, Many Farms</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Combine native tomatoes from Antongalon, highland cabbage from Taguibo, and red onions from Buenavista in a single basket. You deal with one consolidated order and one delivery fee instead of multiple chaotic vendor drop-offs.
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="p-6 rounded-xl border border-border/80 bg-card space-y-3">
                <div className="w-10 h-10 rounded-lg bg-brand-forest/10 text-brand-forest dark:text-brand-green flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Guaranteed 6:00–9:00 AM Delivery Window</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Produce arrives right before your morning sauté and soup preparations begin. No waiting around wondering if market couriers will show up before the lunch rush.
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="p-6 rounded-xl border border-border/80 bg-card space-y-3">
                <div className="w-10 h-10 rounded-lg bg-brand-forest/10 text-brand-forest dark:text-brand-green flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Inspect at the Door Before Paying (PoD)</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Every order is Pay-on-Delivery. Inspect the crates in person with the courier. If any item fails commercial standards, dispute or adjust it on the courier’s digital manifest immediately before handing over Cash or GCash.
                </p>
              </div>

              {/* Benefit 4 */}
              <div className="p-6 rounded-xl border border-border/80 bg-card space-y-3">
                <div className="w-10 h-10 rounded-lg bg-brand-forest/10 text-brand-forest dark:text-brand-green flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Pooled Delivery Option (₱100)</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Save on logistics costs with our pooled routing engine. If other restaurants in your barangay order for the same morning, delivery fee drops to ₱100 without delaying your prep schedule.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Verification Requirements */}
        <section className="py-16 sm:py-20 border-b border-border/60 bg-muted/15">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
            <h2 className="text-2xl font-black text-foreground text-center">
              Simple Verification Process
            </h2>
            <div className="p-6 rounded-xl bg-card border border-border/80 space-y-4 text-xs sm:text-sm text-muted-foreground">
              <p>
                To maintain commercial integrity and prevent phantom orders, UMA registers verified food businesses only:
              </p>
              <ul className="space-y-2 pl-4 list-disc">
                <li>Business Name and physical kitchen address in Butuan City</li>
                <li>Contact phone number for morning driver dispatch coordination</li>
                <li>Last 4 digits of your Mayor&apos;s Permit, DTI Registration, or BIR Form 2303</li>
              </ul>
              <p className="text-[11px] text-muted-foreground">
                In strict accordance with the Philippine Data Privacy Act (RA 10173), full document numbers are never stored in plain text.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 text-center">
          <div className="max-w-2xl mx-auto px-4 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-display font-black text-foreground">
              Join the Commercial Kitchen Pilot
            </h2>
            <p className="text-sm text-muted-foreground">
              Participate in the Butuan City direct agricultural procurement study with guaranteed wholesale pilot pricing and transparent supply chain reporting.
            </p>
            <div className="pt-2">
              <Link
                href="/register?role=BUYER"
                className="px-8 py-3.5 rounded-lg bg-harvest-amber hover:bg-harvest-amber/90 text-neutral-900 font-bold text-sm shadow-sm transition inline-block font-display"
              >
                Register Your Kitchen Today
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
