'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Loader2, Send, ShieldCheck } from 'lucide-react';

export function LeadCaptureForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState<'BUSINESS' | 'FARMER' | 'OTHER'>('BUSINESS');
  const [barangay, setBarangay] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim() || !phone.trim() || !barangay.trim()) {
      setErrorMessage('Please fill out your name, contact phone number, and barangay.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          type,
          barangay: barangay.trim(),
          message: message.trim() || undefined,
          honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error?.message || 'Failed to submit form. Please check your inputs.');
      }

      setSubmitted(true);
      toast.success('Application received!', {
        description: 'Our Butuan operations team will message you within 2 working days.',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
      setErrorMessage(msg);
      toast.error('Submission failed', { description: msg });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Card className="border-emerald-300 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/30 shadow-sm p-6 sm:p-8 text-center max-w-xl mx-auto">
        <CardContent className="space-y-4 pt-2">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-foreground">
            Thank you, {name}!
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your registration interest for <strong className="text-foreground">{barangay}, Butuan City</strong> has been submitted. Our local operations team will contact you at <span className="font-semibold text-foreground">{phone}</span> within 2 working days to coordinate your verification.
          </p>
          <div className="pt-2">
            <Button
              variant="outline"
              onClick={() => {
                setSubmitted(false);
                setName('');
                setPhone('');
                setEmail('');
                setBarangay('');
                setMessage('');
              }}
              className="text-xs"
            >
              Submit Another Inquiry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/80 shadow-md bg-card max-w-2xl mx-auto overflow-hidden">
      <div className="bg-brand-forest text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold">Join the Butuan Pilot Cohort</h3>
          <p className="text-xs text-white/80">Direct farmgate supply. Verified commercial partners only.</p>
        </div>
        <ShieldCheck className="w-6 h-6 text-emerald-300 shrink-0" />
      </div>

      <CardContent className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="p-3 text-xs bg-destructive/10 border border-destructive/20 text-destructive rounded-lg">
              {errorMessage}
            </div>
          )}

          {/* Type Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              I am representing a: <span className="text-destructive">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setType('BUSINESS')}
                className={`py-2 px-3 text-xs rounded-lg font-medium border transition cursor-pointer text-center ${
                  type === 'BUSINESS'
                    ? 'border-brand-forest bg-brand-forest/10 text-brand-forest dark:text-brand-green font-bold'
                    : 'border-border bg-card text-muted-foreground hover:bg-muted'
                }`}
              >
                Commercial Kitchen
              </button>
              <button
                type="button"
                onClick={() => setType('FARMER')}
                className={`py-2 px-3 text-xs rounded-lg font-medium border transition cursor-pointer text-center ${
                  type === 'FARMER'
                    ? 'border-brand-forest bg-brand-forest/10 text-brand-forest dark:text-brand-green font-bold'
                    : 'border-border bg-card text-muted-foreground hover:bg-muted'
                }`}
              >
                Farmer / Grower
              </button>
              <button
                type="button"
                onClick={() => setType('OTHER')}
                className={`py-2 px-3 text-xs rounded-lg font-medium border transition cursor-pointer text-center ${
                  type === 'OTHER'
                    ? 'border-brand-forest bg-brand-forest/10 text-brand-forest dark:text-brand-green font-bold'
                    : 'border-border bg-card text-muted-foreground hover:bg-muted'
                }`}
              >
                Other Partner
              </button>
            </div>
          </div>

          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="lead-name" className="text-xs font-semibold text-foreground">
                Contact Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="lead-name"
                type="text"
                placeholder="e.g. Maria Santos"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="lead-phone" className="text-xs font-semibold text-foreground">
                Mobile Number (+63) <span className="text-destructive">*</span>
              </label>
              <Input
                id="lead-phone"
                type="tel"
                placeholder="0917 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="text-sm"
              />
            </div>
          </div>

          {/* Email & Barangay */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="lead-barangay" className="text-xs font-semibold text-foreground">
                Barangay (Butuan Area) <span className="text-destructive">*</span>
              </label>
              <Input
                id="lead-barangay"
                type="text"
                placeholder="e.g. Libertad, Doongan, Antongalon"
                value={barangay}
                onChange={(e) => setBarangay(e.target.value)}
                required
                className="text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="lead-email" className="text-xs font-semibold text-foreground">
                Email Address <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
              </label>
              <Input
                id="lead-email"
                type="email"
                placeholder="kitchen@example.ph"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-sm"
              />
            </div>
          </div>

          {/* Message / Needs */}
          <div className="space-y-1.5">
            <label htmlFor="lead-message" className="text-xs font-semibold text-foreground">
              Weekly Produce Requirements or Crops Grown
            </label>
            <textarea
              id="lead-message"
              rows={3}
              placeholder="e.g. Need 40kg native tomatoes and 30kg cabbage every Tuesday and Friday..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
            />
          </div>

          {/* Honeypot hidden input for anti-spam bots */}
          <input
            type="text"
            name="uma_secondary_verification_field"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden opacity-0 pointer-events-none absolute -z-50"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <p className="text-[11px] text-muted-foreground">
            By submitting, you agree to receive pilot onboarding updates. In compliance with the Philippine Data Privacy Act (RA 10173), we never sell or share your contact info.
          </p>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-harvest-amber hover:bg-harvest-amber/90 text-neutral-900 font-bold h-11 text-sm shadow-sm gap-2 cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting to Operations...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Pilot Application</span>
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
