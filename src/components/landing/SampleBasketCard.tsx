import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import { formatPeso } from '@/lib/money';

interface BasketItem {
  crop: string;
  qtyText: string;
  pricePerUnit: string;
  farm: string;
  barangay: string;
}

const SAMPLE_ITEMS: BasketItem[] = [
  {
    crop: 'Native Tomatoes (Kamatis)',
    qtyText: '15 kg',
    pricePerUnit: '₱75/kg',
    farm: 'Mang Juan Farm',
    barangay: 'Antongalon',
  },
  {
    crop: 'Highland Green Cabbage',
    qtyText: '20 kg',
    pricePerUnit: '₱60/kg',
    farm: 'San Vicente Cooperative',
    barangay: 'Taguibo',
  },
  {
    crop: 'Red Shallot Onions (Sibuyas)',
    qtyText: '10 kg',
    pricePerUnit: '₱110/kg',
    farm: 'Aling Juana Greens',
    barangay: 'Buenavista',
  },
];

export function SampleBasketCard() {
  return (
    <Card className="border-border/80 shadow-lg bg-card/95 backdrop-blur-xs overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-forest/5 dark:bg-brand-forest/15 rounded-bl-full pointer-events-none" />

      <CardHeader className="border-b border-border/60 pb-3.5 pt-4 px-5 bg-muted/20">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-display font-bold uppercase tracking-wider text-brand-forest dark:text-brand-green">
              Pilot Cohort Harvest Batch
            </span>
          </div>
          <Badge variant="outline" className="text-[11px] font-semibold bg-harvest-amber/15 text-neutral-900 dark:text-amber-300 border-harvest-amber/30">
            Forward-Scheduled
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        {/* Sample Basket Items */}
        <div className="space-y-2.5">
          {SAMPLE_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg bg-background border border-border/70 flex items-center justify-between text-xs"
            >
              <div className="space-y-0.5">
                <div className="font-bold text-foreground flex items-center gap-1.5">
                  <span>{item.crop}</span>
                  <span className="text-[10px] text-muted-foreground font-normal">({item.qtyText})</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-0.5">
                    <MapPin className="w-3 h-3 text-brand-forest dark:text-brand-green" />
                    {item.farm} · {item.barangay}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-bold tabular-nums text-foreground block">
                  {item.pricePerUnit}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  Confirmed Harvest
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Financial & Schedule Summary */}
        <div className="p-3 rounded-lg bg-brand-forest/5 dark:bg-brand-forest/10 border border-brand-forest/20 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Produce Subtotal (45 kg total):</span>
            <span className="font-bold text-foreground tabular-nums">{formatPeso(342500)}</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Includes 8% Platform Fee:</span>
            <span className="tabular-nums font-medium">{formatPeso(27400)}</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
            <span>Farmer Net Earnings:</span>
            <span className="tabular-nums font-bold">{formatPeso(315100)}</span>
          </div>
          <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              Delivery Window:
            </span>
            <span className="font-bold text-foreground">Morning Batch (6:00 – 9:00 AM)</span>
          </div>
        </div>

        {/* Action Link */}
        <Link
          href="/browse"
          className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg bg-brand-forest hover:bg-brand-forest/90 text-white font-semibold text-xs transition shadow-xs"
        >
          <span>Explore Pilot Harvest Catalog</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </CardContent>
    </Card>
  );
}
