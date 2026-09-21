import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';
import { MapPin, ShieldCheck, Clock } from 'lucide-react';
import { APP_CONFIG } from '@/lib/config';

export function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/60 text-card-foreground transition-colors">
      {/* Top trust band */}
      <div className="border-b border-border/80 bg-brand-forest/5 dark:bg-brand-forest/10 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-forest dark:text-brand-green" />
            <span className="font-semibold text-foreground">Butuan City Pilot Study</span>
            <span>· Agusan del Norte</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="font-semibold text-foreground">Forward-Scheduled Batches</span>
            <span>· Harvest-to-order morning prep</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="font-semibold text-foreground">Photo Custody Chain</span>
            <span>· Farmgate to kitchen verification</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-md overflow-hidden bg-brand-forest/10 dark:bg-card p-1">
                <Image
                  src="/uma-logo-green.png"
                  alt="UMA Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-display font-black tracking-tight text-brand-forest dark:text-brand-green">
                UMA
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Agricultural logistics research proposal and pilot platform connecting Butuan-area farmers with commercial kitchens. 8% economic feasibility model and photo-verified custody chain.
            </p>
            <div className="pt-1">
              <ThemeToggle variant="outline" />
            </div>
          </div>

          {/* Marketplace Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Marketplace
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/browse" className="hover:text-foreground transition-colors">
                  Browse Harvests
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-foreground transition-colors">
                  How Forward Orders Work
                </Link>
              </li>
              <li>
                <Link href="/for-businesses" className="hover:text-foreground transition-colors">
                  For Commercial Kitchens
                </Link>
              </li>
              <li>
                <Link href="/for-farmers" className="hover:text-foreground transition-colors">
                  For Farmers & Producers
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground transition-colors">
                  Pricing & 8% Fee Breakdown
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Support & Pilot
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/faq" className="hover:text-foreground transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact UMA Operations
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-foreground transition-colors">
                  Join the Butuan Pilot
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-foreground transition-colors">
                  Sign In to Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Governance & Privacy
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy (RA 10173)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <span className="text-[11px] text-muted-foreground/80 block pt-1">
                  Economic Model: {APP_CONFIG.economics.commissionRate * 100}% platform coordination
                </span>
                <span className="text-[11px] text-muted-foreground/80 block">
                  Batch Fulfillment: Morning 6:00 – 9:00 AM Window
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} UMA (AgriTech Philippines). All rights reserved.</p>
          <p>Designed for agricultural reliability in Butuan City, Agusan del Norte.</p>
        </div>
      </div>
    </footer>
  );
}
