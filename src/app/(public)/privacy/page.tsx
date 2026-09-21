import React from 'react';
import { Metadata } from 'next';
import { getOptionalUser } from '@/server/auth/guards';
import { PublicHeader } from '@/components/navigation/PublicHeader';
import { PublicFooter } from '@/components/navigation/PublicFooter';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Privacy Policy — UMA Agricultural B2B Marketplace',
  description:
    'Compliance with the Philippine Data Privacy Act of 2012 (RA 10173), PII minimization principles, and data protection practices on the UMA platform.',
};

export default async function PrivacyPage() {
  const user = await getOptionalUser();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <PublicHeader user={user} />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="space-y-3">
            <Badge variant="outline" className="text-xs uppercase tracking-wider text-brand-forest dark:text-brand-green border-brand-forest/30">
              RA 10173 Compliance
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              Privacy Policy & Data Protection
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Last Updated: March 2026 · UMA Agricultural Marketplace (Butuan City, Philippines)
            </p>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none text-xs sm:text-sm space-y-6 text-muted-foreground leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-foreground">
                1. Our Commitment to Data Privacy (RA 10173)
              </h2>
              <p>
                UMA operates as a business-to-business (B2B) agricultural platform in Butuan City and Agusan del Norte. We are fully committed to protecting the personal data of our farmer partners, commercial food buyers, and logistics couriers in compliance with the Philippine Data Privacy Act of 2012 (Republic Act No. 10173).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-foreground">
                2. Principle of Data Minimization (PII Protection)
              </h2>
              <p>
                Unlike consumer platforms that collect excessive personal telemetry, UMA collects only the minimal data strictly necessary to execute agricultural forward orders and verify commercial bona fides:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-foreground">Commercial Kitchens:</strong> Business name, representative contact name, delivery address, phone number, and the <em>last four (4) digits</em> of a Mayor&apos;s Permit, DTI Registration, or BIR Form 2303. We do not store complete government permit document scans or tax identification numbers in plaintext.</li>
                <li><strong className="text-foreground">Farmers & Growers:</strong> Full name, farm location barangay, contact phone number, and the <em>last four (4) digits</em> of an acceptable government ID (National ID, Driver&apos;s License, or PhilHealth ID) for field verification.</li>
                <li><strong className="text-foreground">Photo-Verified Proof:</strong> Timestamped digital photographs captured by dispatched couriers at farmgate pickup and kitchen drop-off to verify crate contents, weight, and handoff custody.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-foreground">
                3. Purpose and Legal Basis for Processing
              </h2>
              <p>
                Data is processed solely for legitimate commercial purposes:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Scheduling dawn farmgate pickups and coordinating morning 6:00–9:00 AM delivery windows.</li>
                <li>Calculating platform fees (8%) and recording integer centavo disbursement ledgers for farmer net payouts.</li>
                <li>Facilitating Pay-on-Delivery confirmation and resolving product disputes against photographic evidence.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-foreground">
                4. Confidentiality and Zero Third-Party Monetization
              </h2>
              <p>
                We do not sell, rent, or lease personal or commercial data to third-party advertisers or data brokers under any circumstances. Driver contact details and kitchen drop addresses are shared strictly between the assigned buyer, seller, and courier on a per-order basis.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-foreground">
                5. Your Rights and Data Deletion Requests
              </h2>
              <p>
                Under RA 10173, you retain the right to access, rectify, or request the deletion of your account and associated personal data. To request account de-identification or review your records, contact our Data Protection Officer at <strong className="text-foreground">privacy@uma.ph</strong> or visit our Butuan City operations hub.
              </p>
            </section>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
