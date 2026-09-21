'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    question: 'Who can join the UMA platform?',
    answer:
      'UMA is exclusively built for the B2B commercial food supply chain in the Butuan City area. Buyers include carinderias, canteens, restaurants, hotel resorts, and catering operations. Sellers are local smallholder farmers and agricultural cooperatives verified by our local team.',
  },
  {
    question: 'How does verification work for businesses and farmers?',
    answer:
      'To prevent non-delivery and ensure commercial credibility, every account is vetted before ordering or listing crops. For commercial kitchens, we verify the establishment with the last 4 characters of a Mayor\'s Permit or DTI registration. For farmers, our field staff physically confirms farm plot location and production capacity.',
  },
  {
    question: 'What if a farmer cannot deliver due to weather or crop issues?',
    answer:
      'Unlike open consumer marketplaces where you only find out at delivery, UMA operates a Five-Layer Reliability Lock. If harvest inspection fails or adverse weather impacts yield, the platform triggers automated rerouting to an approved backup farmer in our nearby cooperative network. If no backup is available, your order is canceled before dispatch with zero charges.',
  },
  {
    question: 'How and when do I pay for produce?',
    answer:
      'At this pilot stage, all forward orders operate under Pay-on-Delivery (PoD). You inspect the crates at drop-off against the courier\'s digital run sheet. Once satisfied, payment is settled via Cash or GCash directly to the UMA courier, recorded instantly in the ledger.',
  },
  {
    question: 'How does forward-scheduled batch fulfillment work?',
    answer:
      'Commercial kitchens submit forward orders for scheduled morning deliveries. Rather than harvesting speculatively and risking unsold field spoilage, farmers in Antongalon and Taguibo cut crops exclusively for confirmed batches at dawn (4:00–5:30 AM). Dispatched couriers pick up crates directly at farmgate by 6:00 AM, delivering straight to kitchen prep counters between 6:00 AM and 9:00 AM.',
  },
  {
    question: 'What are the platform fees?',
    answer:
      'We charge a single, transparent 8% platform fee calculated on produce subtotal (e.g. ₱160 on a ₱2,000 order), deducted from the farmer\'s gross payout. Logistics is charged at a flat ₱150 for dedicated direct delivery, or ₱100 for pooled shared-route delivery.',
  },
  {
    question: 'Which areas do you currently serve?',
    answer:
      'Our initial pilot covers the commercial core of Butuan City and surrounding barangays (including Libertad, Doongan, Villa Kananga, Baan, and Bancasi), connecting with harvest clusters in Antongalon, Taguibo, and Buenavista, Agusan del Norte.',
  },
  {
    question: 'How do you keep produce fresh without cold chain storage?',
    answer:
      'We do not make speculative guarantees like "100% fresh forever." Freshness is a disciplined operational process: produce is harvested only after your order is confirmed the night before, picked up at dawn, and delivered directly to your kitchen within 4 hours of cutting, completely bypassing multi-day warehouse storage and bagsakan re-handling.',
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3">
      {FAQ_DATA.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="border border-border/80 rounded-xl overflow-hidden bg-card transition-colors"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-foreground hover:bg-muted/30 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-brand-forest dark:text-brand-green' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
