import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getOptionalUser } from '@/server/auth/guards';
import { PublicHeader } from '@/components/navigation/PublicHeader';
import { PublicFooter } from '@/components/navigation/PublicFooter';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'How It Works — UMA Research Proposal & Pilot Platform',
  description:
    'Learn how UMA evaluates direct B2B agricultural logistics for Butuan smallholders and commercial kitchens through forward batch scheduling and photo-verified custody.',
};

export default async function HowItWorksPage() {
  const user = await getOptionalUser();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <PublicHeader user={user} />

      <main className="flex-1">
        {/* Hero Header */}
        <section className="py-12 sm:py-16 border-b border-border/60 bg-linear-to-b from-brand-forest/5 to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <Badge variant="outline" className="text-xs uppercase tracking-wider text-brand-forest dark:text-brand-green border-brand-forest/30">
              Operational Architecture
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
              How Forward Scheduling Works
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              UMA replaces speculative harvest guessing with a disciplined, closed-loop supply schedule designed for Butuan commercial kitchens.
            </p>
          </div>
        </section>

        {/* 24-Hour Timeline */}
        <section className="py-16 border-b border-border/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                The 24-Hour Harvest-to-Table Cycle
              </h2>
              <p className="text-sm text-muted-foreground">
                Every order follows strict Manila timezone benchmarks to guarantee maximum produce vitality.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {/* Milestone 1 */}
              <div className="p-5 rounded-xl border border-border/80 bg-card space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-500 uppercase tracking-wider">Step 1</span>
                  <span className="text-xs font-bold tabular-nums text-muted-foreground">Day 0 · Ongoing</span>
                </div>
                <h3 className="font-bold text-base text-foreground">Harvest Batch Listing</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Verified farmers in Antongalon and Taguibo estimate crop yield and post listings with available kg and price per kg.
                </p>
              </div>

              {/* Milestone 2 */}
              <div className="p-5 rounded-xl border-2 border-brand-forest/40 bg-brand-forest/5 dark:bg-brand-forest/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-brand-forest dark:text-brand-green uppercase tracking-wider">Step 2</span>
                  <Badge variant="outline" className="text-[10px] bg-harvest-amber text-neutral-900 font-bold border-none font-display">
                    BATCH AGGREGATION
                  </Badge>
                </div>
                <h3 className="font-bold text-base text-foreground font-display">Forward Order Batching</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Commercial kitchens submit scheduled produce orders. The platform aggregates quantities, reserves stock, and coordinates harvest batches with grower cooperatives.
                </p>
              </div>

              {/* Milestone 3 */}
              <div className="p-5 rounded-xl border border-border/80 bg-card space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-600 uppercase tracking-wider">Step 3</span>
                  <span className="text-xs font-bold tabular-nums text-muted-foreground">Day 1 · 4:00 AM</span>
                </div>
                <h3 className="font-bold text-base text-foreground">Dawn Field Cutting</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Farmers harvest exclusively what has been confirmed. Produce is crated at farmgate, avoiding overnight heat degradation.
                </p>
              </div>

              {/* Milestone 4 */}
              <div className="p-5 rounded-xl border border-border/80 bg-card space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-sky-600 uppercase tracking-wider">Step 4</span>
                  <span className="text-xs font-bold tabular-nums text-muted-foreground">Day 1 · 6–9 AM</span>
                </div>
                <h3 className="font-bold text-base text-foreground">Photo-Verified Delivery</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  UMA Courier completes pickup, captures crate photo proof, and delivers straight to the kitchen door before morning meal prep.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Five-Layer Reliability Lock */}
        <section className="py-16 sm:py-20 border-b border-border/60 bg-muted/15">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                The Five-Layer Reliability Lock
              </h2>
              <p className="text-sm text-muted-foreground">
                How UMA guarantees commercial reliability without operating expensive refrigerated warehouses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-card border border-border/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-base text-foreground">
                  <span className="w-6 h-6 rounded-full bg-brand-forest/10 text-brand-forest dark:text-brand-green flex items-center justify-center text-xs font-black">1</span>
                  <span>Physical Field Verification</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pl-8">
                  Our local Butuan field agronomists inspect farm plots and verify identity (RA 10173 PII minimized) before any grower can list harvest batches.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-base text-foreground">
                  <span className="w-6 h-6 rounded-full bg-brand-forest/10 text-brand-forest dark:text-brand-green flex items-center justify-center text-xs font-black">2</span>
                  <span>Automated Stock Reservation</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pl-8">
                  Available quantities decrement immediately upon checkout in an atomic transaction, preventing accidental overselling of scarce harvests.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-base text-foreground">
                  <span className="w-6 h-6 rounded-full bg-brand-forest/10 text-brand-forest dark:text-brand-green flex items-center justify-center text-xs font-black">3</span>
                  <span>Photo Custody Chain</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pl-8">
                  Couriers take timestamped photos at farmgate pickup and kitchen drop-off. Disputes are settled against visual proof, not conflicting memories.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-base text-foreground">
                  <span className="w-6 h-6 rounded-full bg-brand-forest/10 text-brand-forest dark:text-brand-green flex items-center justify-center text-xs font-black">4</span>
                  <span>Cooperative Backup Failover</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pl-8">
                  If sudden weather impacts one farmer, our system automatically re-routes the order to an approved backup grower in the same agricultural cluster.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border/80 space-y-2 md:col-span-2">
                <div className="flex items-center gap-2 font-bold text-base text-foreground">
                  <span className="w-6 h-6 rounded-full bg-brand-forest/10 text-brand-forest dark:text-brand-green flex items-center justify-center text-xs font-black">5</span>
                  <span>Integer Centavo Financial Ledger</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pl-8">
                  All transactions, commissions, and payouts are calculated in integer Philippine Centavos (₱1.00 = 100 centavos) with half-up rounding, eliminating floating-point reconciliation errors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 text-center">
          <div className="max-w-3xl mx-auto px-4 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              Ready to streamline your kitchen&apos;s supply?
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/register?role=BUYER"
                className="px-6 py-3 rounded-lg bg-harvest-amber hover:bg-harvest-amber/90 text-neutral-900 font-bold text-sm shadow-sm transition"
              >
                Register Commercial Kitchen
              </Link>
              <Link
                href="/browse"
                className="px-6 py-3 rounded-lg border border-border bg-card hover:bg-muted text-foreground font-semibold text-sm transition"
              >
                Browse Live Harvests
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
