'use client';

import React, { useState } from 'react';
import { formatPeso, calculateCommissionCentavos } from '@/lib/money';
import { APP_CONFIG } from '@/lib/config';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function FeeCalculator() {
  const [basketPesos, setBasketPesos] = useState<number>(2000);
  const [deliveryType, setDeliveryType] = useState<'DIRECT' | 'POOLED'>('DIRECT');

  const basketCentavos = Math.round(basketPesos * 100);
  const commissionCentavos = calculateCommissionCentavos(basketCentavos);
  const farmerNetCentavos = basketCentavos - commissionCentavos;

  const deliveryFeeCentavos =
    deliveryType === 'DIRECT'
      ? APP_CONFIG.economics.deliveryFeeOneToOneCentavos
      : APP_CONFIG.economics.deliveryFeePooledCentavos;

  const totalBuyerCostCentavos = basketCentavos + deliveryFeeCentavos;

  return (
    <Card className="border-border/80 shadow-sm bg-card overflow-hidden">
      <CardHeader className="bg-brand-forest/5 dark:bg-brand-forest/10 border-b border-border/60 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="bg-harvest-amber/15 text-harvest-amber border-harvest-amber/30 text-xs font-semibold">
                Transparent 8% Model
              </Badge>
              <span className="text-xs text-muted-foreground">No hidden bagsakan margins</span>
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Where Every Peso Goes
            </CardTitle>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground block">Illustrative Basket Size</span>
            <span className="text-2xl sm:text-3xl font-black tabular-nums text-brand-forest dark:text-brand-green">
              {formatPeso(basketCentavos)}
            </span>
          </div>
        </div>
        <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
          Adjust the slider below to see how our harvest-to-order forward model compares to traditional multi-tier middleman markups (20–30%).
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Slider Controls */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-medium text-muted-foreground">
            <span>₱500 (Small Carinderia)</span>
            <span>₱5,000 (Restaurant / Canteen)</span>
            <span>₱10,000 (Hotel / Resort)</span>
          </div>
          <input
            type="range"
            min={500}
            max={10000}
            step={100}
            value={basketPesos}
            onChange={(e) => setBasketPesos(Number(e.target.value))}
            className="w-full h-2.5 bg-muted rounded-lg appearance-none cursor-pointer accent-brand-forest dark:accent-brand-green focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Produce Basket Total"
          />
        </div>

        {/* Delivery Type Option */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-muted/40 rounded-lg border border-border/50 text-xs">
          <span className="font-semibold text-foreground">Delivery Method:</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDeliveryType('DIRECT')}
              className={`px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
                deliveryType === 'DIRECT'
                  ? 'bg-brand-forest text-white shadow-xs'
                  : 'bg-background hover:bg-muted text-muted-foreground'
              }`}
            >
              Direct Dedicated (₱150)
            </button>
            <button
              type="button"
              onClick={() => setDeliveryType('POOLED')}
              className={`px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
                deliveryType === 'POOLED'
                  ? 'bg-brand-forest text-white shadow-xs'
                  : 'bg-background hover:bg-muted text-muted-foreground'
              }`}
            >
              Pooled Logistics (₱100)
            </button>
          </div>
        </div>

        {/* Breakdown Bars & Numbers */}
        <div className="space-y-4 pt-2">
          {/* Farmer Net Payout */}
          <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                  <span className="text-sm font-bold text-foreground">Farmer Net Payout</span>
                  <Badge variant="outline" className="text-[10px] text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 bg-emerald-100/50 dark:bg-emerald-900/30">
                    92% of Produce
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground pl-4.5">
                  Paid directly upon confirmed buyer drop-off inspection.
                </p>
              </div>
              <span className="text-xl font-black tabular-nums text-emerald-700 dark:text-emerald-400">
                {formatPeso(farmerNetCentavos)}
              </span>
            </div>
            {/* Visual ratio bar */}
            <div className="w-full bg-emerald-200/60 dark:bg-emerald-900/60 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full transition-all duration-300" style={{ width: '92%' }} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* UMA Platform Fee */}
            <div className="p-3.5 rounded-lg bg-card border border-border/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-harvest-amber inline-block" />
                  <span className="text-xs font-bold text-foreground">UMA Platform Fee</span>
                </div>
                <span className="text-sm font-bold tabular-nums text-foreground">
                  {formatPeso(commissionCentavos)}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Fixed 8% platform charge. Covers scheduling tech, SMS coordination, and dispute custody.
              </p>
            </div>

            {/* Courier Delivery Fee */}
            <div className="p-3.5 rounded-lg bg-card border border-border/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" />
                  <span className="text-xs font-bold text-foreground">Courier Delivery Fee</span>
                </div>
                <span className="text-sm font-bold tabular-nums text-foreground">
                  {formatPeso(deliveryFeeCentavos)}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                100% paid to dispatch rider. Photo proof verified at pickup & delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Total Summary Row */}
        <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs text-muted-foreground block">Total Commercial Kitchen Payable:</span>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tabular-nums text-foreground">
                {formatPeso(totalBuyerCostCentavos)}
              </span>
              <span className="text-xs text-muted-foreground">(Produce + Delivery)</span>
            </div>
          </div>

          <Link
            href="/pricing"
            className="text-xs font-semibold text-brand-forest dark:text-brand-green hover:underline inline-flex items-center gap-1"
          >
            <span>Read full pricing & economics policy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
