import React from 'react';
import { Metadata } from 'next';
import { getOptionalUser } from '@/server/auth/guards';
import { PublicHeader } from '@/components/navigation/PublicHeader';
import { PublicFooter } from '@/components/navigation/PublicFooter';

export const metadata: Metadata = {
  title: 'Terms of Service — UMA Platform',
  description:
    'Terms governing forward scheduling, batch commitments, Pay-on-Delivery, and dispute custody for kitchens and farmers on the UMA research pilot platform.',
};

export default async function TermsPage() {
  const user = await getOptionalUser();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <PublicHeader user={user} />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="space-y-2 border-b border-border/60 pb-6">
            <h1 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-foreground">
              Terms of Service
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Effective Date: March 2026 · UMA Agricultural Platform
            </p>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none text-xs sm:text-sm space-y-6 text-muted-foreground leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-foreground">
                1. Scope of the B2B Forward-Order Marketplace
              </h2>
              <p>
                UMA is a dedicated technology coordination platform connecting registered commercial food operators (&ldquo;Buyers&rdquo;) with smallholder agricultural producers (&ldquo;Farmers&rdquo;) in Butuan City and Agusan del Norte. UMA coordinates scheduled harvest forward-orders and pooled logistics; UMA is not a speculative produce speculator or speculative inventory holder.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-foreground font-display">
                2. Forward-Scheduled Batch Procurement and Commitments
              </h2>
              <p>
                In order to uphold the &ldquo;Harvest-to-Order&rdquo; model:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-foreground">Forward Order Batching:</strong> All forward orders for next-morning delivery are aggregated during scheduled batch procurement windows. Orders committed after the batch window are routed into the subsequent cycle.</li>
                <li><strong className="text-foreground">Cutting Authorization:</strong> Confirmation of an order constitutes a binding harvest order authorizing the farmer to cut the designated crop quantity at dawn (4:00–5:30 AM).</li>
                <li><strong className="text-foreground">Cancellations:</strong> Buyers may adjust or cancel orders prior to cooperative batch dispatch. Once harvest cutting orders are confirmed, commitments are locked to protect farmer yields.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-foreground">
                3. Delivery, Inspection, and Pay-on-Delivery (PoD)
              </h2>
              <p>
                All orders at this pilot stage are fulfilled via Pay-on-Delivery:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Delivery is scheduled for 6:00 AM – 9:00 AM at the commercial kitchen address provided upon registration.</li>
                <li>The buyer or authorized kitchen staff must conduct an immediate visual inspection of delivered crates in the presence of the UMA courier.</li>
                <li>Upon acceptable inspection, payment for the full order amount (Produce subtotal + delivery fee) must be remitted immediately via Cash or GCash to the courier.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-foreground">
                4. Quality Disputes and Photo-Verified Evidence
              </h2>
              <p>
                If produce does not meet commercial standards (e.g. transit bruising or spoilage), a dispute must be logged with the courier before signing the manifest. The courier captures photographic evidence which is cross-referenced with the farmgate pickup photo. If damage occurred in transit or farm defect is verified, an immediate adjustment or refund credit is recorded in the platform ledger.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-foreground">
                5. Platform Economics and Integer Centavo Accounting
              </h2>
              <p>
                UMA charges an 8% technology platform commission on the produce value, which is deducted from the farmer&apos;s gross payout. Courier delivery fees (₱150 direct / ₱100 pooled) are paid directly to the logistics partner. All amounts are calculated in integer Philippine Centavos with zero floating-point variance.
              </p>
            </section>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
