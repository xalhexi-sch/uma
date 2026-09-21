import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getOptionalUser } from '@/server/auth/guards';
import { PublicHeader } from '@/components/navigation/PublicHeader';
import { PublicFooter } from '@/components/navigation/PublicFooter';
import { FaqAccordion } from '@/components/landing/FaqAccordion';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) — UMA Marketplace',
  description:
    'Answers to commercial kitchen and farmer questions regarding batch scheduling, Pay-on-Delivery, quality custody, and the Butuan City logistics pilot.',
};

export default async function FaqPage() {
  const user = await getOptionalUser();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <PublicHeader user={user} />

      <main className="flex-1">
        {/* Header */}
        <section className="py-12 sm:py-16 border-b border-border/60 bg-linear-to-b from-brand-forest/5 to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <Badge variant="outline" className="text-xs uppercase tracking-wider text-brand-forest dark:text-brand-green border-brand-forest/30 font-display">
              Knowledge Base
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-foreground">
              Frequently Asked Questions
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Find instant answers to how UMA operates, forward batch scheduling, photo-verified custody chain, and pilot economics.
            </p>
          </div>
        </section>

        {/* Main FAQ Accordion Container */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
            <FaqAccordion />

            {/* Need More Assistance Box */}
            <div className="p-6 rounded-xl border border-border/80 bg-muted/20 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-brand-forest dark:text-brand-green" />
                  <span>Have a specific kitchen or farm question?</span>
                </h3>
                <p className="text-xs text-muted-foreground">
                  Our local Butuan operations coordinators are available for direct messaging and phone inquiries.
                </p>
              </div>

              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-lg bg-brand-forest hover:bg-brand-forest/90 text-white font-semibold text-xs transition shadow-xs inline-flex items-center gap-1.5"
              >
                <span>Contact Operations Team</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
