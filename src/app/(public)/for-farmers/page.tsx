import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getOptionalUser } from '@/server/auth/guards';
import { PublicHeader } from '@/components/navigation/PublicHeader';
import { PublicFooter } from '@/components/navigation/PublicFooter';
import { 
  Tractor, ArrowRight, 
  MapPin, DollarSign, Sprout 
} from 'lucide-react';
import { formatPeso } from '@/lib/money';

export const metadata: Metadata = {
  title: 'For Farmers & Producers — UMA Research Proposal & Pilot Platform',
  description:
    'Pre-harvest order consolidation, 92% farmgate value retention, and direct farmgate pickup for smallholders in Butuan and Agusan del Norte.',
};

export default async function ForFarmersPage() {
  const user = await getOptionalUser();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <PublicHeader user={user} />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-14 sm:py-20 border-b border-border/60 bg-linear-to-b from-brand-forest/5 via-background to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
              <Tractor className="w-3.5 h-3.5" />
              <span>For Farmers & Agricultural Cooperatives</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-foreground leading-[1.2]">
              Sell Your Harvest Before You Cut a Single Leaf
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              No more loading jeeps at dawn only to face 30% middleman discounts at the bagsakan. On UMA, commercial kitchens buy your crops in advance. You harvest only what is confirmed, and our courier picks it up directly at your farmgate.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/register?role=FARMER"
                className="px-6 py-3 rounded-lg bg-harvest-amber hover:bg-harvest-amber/90 text-neutral-900 font-bold text-sm shadow-sm transition inline-flex items-center gap-2"
              >
                <span>Register as a Producer</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="px-6 py-3 rounded-lg border border-border bg-card hover:bg-muted text-foreground font-semibold text-sm transition"
              >
                Review Payout Mathematics
              </Link>
            </div>
          </div>
        </section>

        {/* 3 Core Farmer Promises */}
        <section className="py-16 sm:py-20 border-b border-border/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                How UMA Protects the Farmer
              </h2>
              <p className="text-sm text-muted-foreground">
                Designed to eliminate the three greatest risks smallholder growers face in Agusan del Norte.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-6 rounded-xl border border-border/80 bg-card space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Sprout className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-foreground font-display">Zero Harvest Speculation</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Never cut crops without a guaranteed buyer. Pre-harvest order consolidation sends verified cutting quantities to your cooperative before daybreak. Anything not committed remains unharvested in the ground, protecting smallholder yields.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 rounded-xl border border-border/80 bg-card space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Keep 92% of Market Value</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Traditional middlemen take 20% to 30% through volatile daily spreads. UMA charges a fixed, transparent 8% technology platform fee. On a ₱2,000 basket, you receive exactly ₱1,840 net payout.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-xl border border-border/80 bg-card space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Direct Farmgate Pickup</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  UMA Courier handles the transport from Antongalon, Taguibo, or Buenavista into Butuan City. You don&apos;t need to rent a vehicle or pay high tricycle freight fees for small harvest batches.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Payout Worked Example */}
        <section className="py-16 border-b border-border/60 bg-muted/15">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
            <h2 className="text-2xl font-black text-foreground text-center">
              Clear & Defensible Payout Mathematics
            </h2>
            <div className="p-6 rounded-xl bg-card border border-border/80 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-muted/40 space-y-1">
                  <span className="text-xs text-muted-foreground">Gross Produce Sale</span>
                  <span className="text-xl font-black tabular-nums text-foreground block">{formatPeso(200000)}</span>
                  <span className="text-[10px] text-muted-foreground">Confirmed orders</span>
                </div>
                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 space-y-1">
                  <span className="text-xs text-amber-700 dark:text-amber-400 font-bold">UMA 8% Fee</span>
                  <span className="text-xl font-black tabular-nums text-amber-700 dark:text-amber-400 block">{formatPeso(16000)}</span>
                  <span className="text-[10px] text-muted-foreground">Tech & coordination</span>
                </div>
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">Your Net Payout</span>
                  <span className="text-xl font-black tabular-nums text-emerald-700 dark:text-emerald-400 block">{formatPeso(184000)}</span>
                  <span className="text-[10px] text-emerald-600 font-medium">92% to farmer</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center pt-2">
                Settled to your verified digital ledger upon confirmed drop-off inspection. Zero cash delays.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 text-center">
          <div className="max-w-2xl mx-auto px-4 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              Cultivate with Certainty
            </h2>
            <p className="text-sm text-muted-foreground">
              Register your farm today. Our Butuan field staff will schedule a visit to verify your plots.
            </p>
            <div className="pt-2">
              <Link
                href="/register?role=FARMER"
                className="px-8 py-3.5 rounded-lg bg-harvest-amber hover:bg-harvest-amber/90 text-neutral-900 font-bold text-sm shadow-sm transition inline-block"
              >
                Start Selling on UMA
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
