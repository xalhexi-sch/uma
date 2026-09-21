import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getOptionalUser } from '@/server/auth/guards';
import { PublicHeader } from '@/components/navigation/PublicHeader';
import { PublicFooter } from '@/components/navigation/PublicFooter';
import { FeeCalculator } from '@/components/landing/FeeCalculator';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Pricing & Unit Economics — UMA Research Proposal & Pilot Platform',
  description:
    'Complete transparency: 8% platform fee, ₱150 direct / ₱100 pooled delivery fee, and integer centavo accounting. Zero hidden bagsakan markups.',
};

export default async function PricingPage() {
  const user = await getOptionalUser();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <PublicHeader user={user} />

      <main className="flex-1">
        {/* Header */}
        <section className="py-12 sm:py-16 border-b border-border/60 bg-linear-to-b from-brand-forest/5 to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <Badge variant="outline" className="text-xs uppercase tracking-wider text-harvest-amber border-harvest-amber/40 font-display">
              Honesty as a Differentiator
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-foreground">
              Simple, Transparent Platform Economics
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We charge a single flat 8% platform fee on produce. No variable trader commissions, no hidden pallet charges, no unexpected fees at delivery.
            </p>
          </div>
        </section>

        {/* Pricing Model Overview */}
        <section className="py-16 border-b border-border/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1: 8% Commission */}
              <div className="p-8 rounded-2xl border border-border/80 bg-card shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs font-bold text-brand-forest dark:text-brand-green border-brand-forest/30">
                    Sellers
                  </Badge>
                  <span className="text-3xl font-display font-black text-brand-forest dark:text-brand-green tabular-nums">
                    8%
                  </span>
                </div>
                <h3 className="text-xl font-display font-bold text-foreground">Platform Commission</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Deducted directly from the produce subtotal upon confirmed buyer delivery. Evaluated in the pilot study to cover coordination infrastructure, forward batch scheduling, SMS logistics, and dispute custody. Farmers retain 92% of wholesale listing revenue.
                </p>
                <div className="pt-2 border-t border-border/60 text-xs text-muted-foreground space-y-1">
                  <div className="flex justify-between">
                    <span>Example: ₱1,000 harvest</span>
                    <span className="font-bold text-foreground">₱80 fee (Farmer keeps ₱920)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Example: ₱2,500 harvest</span>
                    <span className="font-bold text-foreground">₱200 fee (Farmer keeps ₱2,300)</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Delivery Fees */}
              <div className="p-8 rounded-2xl border border-border/80 bg-card shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs font-bold text-sky-600 border-sky-300">
                    Buyers
                  </Badge>
                  <span className="text-3xl font-black text-foreground tabular-nums">
                    ₱100 / ₱150
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground">Dispatch Delivery Fee</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Paid 100% to our dispatched motorcycle and multicab drivers. Direct dedicated single-kitchen drop-off is ₱150. Pooled delivery (orders combined along the same barangay route) is ₱100.
                </p>
                <div className="pt-2 border-t border-border/60 text-xs text-muted-foreground space-y-1">
                  <div className="flex justify-between">
                    <span>Direct Single Kitchen:</span>
                    <span className="font-bold text-foreground">₱150 per run</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pooled Shared Route:</span>
                    <span className="font-bold text-foreground">₱100 per run</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Calculator Section */}
            <div className="pt-6 space-y-6">
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-black text-foreground">Interactive Fee Calculator</h2>
                <p className="text-xs text-muted-foreground">Adjust the slider to inspect exact centavo distributions.</p>
              </div>
              <FeeCalculator />
            </div>

            {/* Comparison Table */}
            <div className="space-y-4 pt-6">
              <h2 className="text-2xl font-black text-foreground text-center">
                UMA vs Traditional Produce Middlemen
              </h2>

              <div className="overflow-x-auto rounded-xl border border-border/80">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-muted/50 border-b border-border text-foreground font-bold">
                    <tr>
                      <th className="p-4">Supply Chain Factor</th>
                      <th className="p-4 text-brand-forest dark:text-brand-green">UMA Platform</th>
                      <th className="p-4 text-muted-foreground">Traditional Bagsakan Middlemen</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 text-muted-foreground">
                    <tr>
                      <td className="p-4 font-semibold text-foreground">Platform / Broker Fee</td>
                      <td className="p-4 text-brand-forest dark:text-brand-green font-bold">Fixed 8% transparent charge</td>
                      <td className="p-4 text-destructive font-semibold">20% to 30% variable markup spread</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">Harvest Timing</td>
                      <td className="p-4 text-foreground font-medium">Harvest-to-order (confirmed the night before)</td>
                      <td className="p-4">Speculative (harvest and pray for buyers)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">Quality Accountability</td>
                      <td className="p-4 text-foreground font-medium">Photo-proof at pickup & drop-off</td>
                      <td className="p-4">No photos; disputed at market stalls</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">Financial Accuracy</td>
                      <td className="p-4 text-foreground font-medium">Integer Centavo digital ledger</td>
                      <td className="p-4">Informal chalk ledgers & cash discrepancies</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 text-center">
          <div className="max-w-2xl mx-auto px-4 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              Fair for Kitchens. Fair for Farmers.
            </h2>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/register?role=BUYER"
                className="px-6 py-3 rounded-lg bg-harvest-amber hover:bg-harvest-amber/90 text-neutral-900 font-bold text-sm shadow-sm transition"
              >
                Join as a Commercial Kitchen
              </Link>
              <Link
                href="/register?role=FARMER"
                className="px-6 py-3 rounded-lg border border-border bg-card hover:bg-muted text-foreground font-semibold text-sm transition"
              >
                Join as a Farmer
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
