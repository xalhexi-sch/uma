import React from 'react';
import { Metadata } from 'next';
import { getOptionalUser } from '@/server/auth/guards';
import { PublicHeader } from '@/components/navigation/PublicHeader';
import { PublicFooter } from '@/components/navigation/PublicFooter';
import { LeadCaptureForm } from '@/components/landing/LeadCaptureForm';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Operations — UMA B2B Marketplace',
  description:
    'Contact the UMA agricultural operations team in Butuan City. Onboarding inquiries, farm visits, and commercial kitchen partnerships.',
};

export default async function ContactPage() {
  const user = await getOptionalUser();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <PublicHeader user={user} />

      <main className="flex-1">
        {/* Header */}
        <section className="py-12 sm:py-16 border-b border-border/60 bg-linear-to-b from-brand-forest/5 to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <Badge variant="outline" className="text-xs uppercase tracking-wider text-brand-forest dark:text-brand-green border-brand-forest/30">
              Butuan Operations Hub
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
              Get in Touch with Our Team
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We are on the ground in Butuan City coordinating dawn harvests, courier routing, and verified kitchen onboarding.
            </p>
          </div>
        </section>

        {/* Contact Info + Lead Form Grid */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Col: Operations Hub Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-5">
                <h3 className="font-bold text-lg text-foreground border-b border-border/60 pb-3">
                  Butuan City Pilot Operations
                </h3>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-brand-forest dark:text-brand-green shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground block">Operations & Dispatch Hub</strong>
                      <span className="text-muted-foreground">
                        J.C. Aquino Avenue, Butuan City, Agusan del Norte, Caraga (Region XIII), Philippines
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground block">Operating Hours</strong>
                      <span className="text-muted-foreground">
                        Monday to Sunday: 4:00 AM – 8:30 PM PHT<br />
                        (Covering dawn harvests, morning delivery & evening batch aggregation)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground block">Dispatch Hotline / WhatsApp</strong>
                      <span className="text-muted-foreground">
                        +63 917 890 2026
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground block">Inquiries Email</strong>
                      <span className="text-muted-foreground">
                        operations@uma.ph
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-border/60 text-xs text-muted-foreground flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Licensed B2B Agricultural Coordination Service</span>
                </div>
              </div>
            </div>

            {/* Right Col: Lead & Inquiry Form */}
            <div className="lg:col-span-7">
              <LeadCaptureForm />
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
