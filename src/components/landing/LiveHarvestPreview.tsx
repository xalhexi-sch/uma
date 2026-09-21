import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductImage } from '@/components/shared/ProductImage';
import { formatPeso } from '@/lib/money';
import { formatManilaDate } from '@/lib/dates';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

export interface PreviewListing {
  id: number;
  crop: string;
  category: string;
  priceCentavos: number;
  unit: string;
  estimatedQty: number;
  reservedQty: number;
  minOrderQty: number;
  harvestDate: Date | string;
  imageUrl?: string | null;
  farmer: {
    name: string;
    barangay: string;
    reliabilityScore: number;
  };
}

interface LiveHarvestPreviewProps {
  listings: PreviewListing[];
}

export function LiveHarvestPreview({ listings }: LiveHarvestPreviewProps) {
  if (!listings || listings.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {listings.slice(0, 4).map((item) => {
          const availableQty = Math.max(0, item.estimatedQty - item.reservedQty);
          const harvestDateObj = typeof item.harvestDate === 'string' ? new Date(item.harvestDate) : item.harvestDate;

          return (
            <Card
              key={item.id}
              className="border-border/80 shadow-xs hover:shadow-md transition-shadow bg-card overflow-hidden flex flex-col group"
            >
              <div className="relative overflow-hidden">
                <ProductImage
                  src={item.imageUrl}
                  alt={item.crop}
                  category={item.category}
                  aspectRatio="video"
                  className="transition-transform duration-300 group-hover:scale-103"
                />
                <div className="absolute top-2.5 right-2.5">
                  <Badge variant="outline" className="bg-background/90 backdrop-blur-xs text-foreground font-bold border-border/80 text-[10px]">
                    {availableQty} {item.unit.toLowerCase()} available
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-forest dark:text-brand-green">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-foreground line-clamp-1 group-hover:text-brand-forest dark:group-hover:text-brand-green transition-colors">
                    {item.crop}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <span className="truncate">{item.farmer.name} · {item.farmer.barangay}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-border/60 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Price per {item.unit.toLowerCase()}:</span>
                    <span className="text-base font-black tabular-nums text-foreground">
                      {formatPeso(item.priceCentavos)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-500" />
                      Harvest Date:
                    </span>
                    <span className="font-medium text-foreground">
                      {formatManilaDate(harvestDateObj, 'friendly')}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Link
                  href="/browse"
                  className="w-full text-center py-2 px-3 rounded-lg border border-border bg-muted/30 hover:bg-muted font-medium text-xs text-foreground transition"
                >
                  View Details
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <div className="text-center pt-2">
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-forest hover:bg-brand-forest/90 text-white font-semibold text-xs sm:text-sm transition shadow-xs"
        >
          <span>Browse All Available Harvests</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
