'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Sprout, ArrowRight, Sun, Moon, Loader2 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { registerUser } from '@/lib/auth-client';

export default function RegisterPage() {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();

  const [role, setRole] = useState<'BUYER' | 'FARMER'>('BUYER');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [entityName, setEntityName] = useState('');
  const [barangay, setBarangay] = useState('');
  const [addressText, setAddressText] = useState('');
  const [idOrPermitType, setIdOrPermitType] = useState("Mayor's Permit");
  const [idOrPermitLast4, setIdOrPermitLast4] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRoleChange = (newRole: 'BUYER' | 'FARMER') => {
    setRole(newRole);
    setIdOrPermitType(newRole === 'BUYER' ? "Mayor's Permit" : 'National ID');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await registerUser({
        role,
        email,
        password,
        name,
        phone,
        entityName,
        barangay,
        addressText,
        idOrPermitType,
        idOrPermitLast4,
      });

      router.push('/dashboard');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-border bg-background/95 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/uma-logo-green.png"
            alt="UMA Logo"
            width={28}
            height={28}
            className="object-contain transition-transform group-hover:scale-105"
            priority
          />
          <span className="text-lg font-bold tracking-tight">UMA</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="icon-sm"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-zinc-700" />}
          </Button>

          <Link href="/login" className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
            Log In
          </Link>
        </div>
      </header>

      {/* Register Container */}
      <main className="max-w-lg w-full mx-auto px-4 py-8">
        <Card className="shadow-xl border-border bg-card">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold tracking-tight">Join the UMA Pilot</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Register your commercial kitchen or farm in Butuan City.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-xs bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-900/50">
                {error}
              </div>
            )}

            {/* Role selector tabs */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-muted/60 rounded-xl">
              <button
                type="button"
                onClick={() => handleRoleChange('BUYER')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  role === 'BUYER'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <ShoppingBag size={15} className={role === 'BUYER' ? 'text-emerald-600 dark:text-emerald-400' : ''} />
                Kitchen / Buyer
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('FARMER')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  role === 'FARMER'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Sprout size={15} className={role === 'FARMER' ? 'text-emerald-600 dark:text-emerald-400' : ''} />
                Farmer / Grower
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">
                    {role === 'BUYER' ? 'Business / Kitchen Name' : 'Farm / Grower Name'}
                  </label>
                  <Input
                    type="text"
                    placeholder={role === 'BUYER' ? 'e.g. Kusina Caraga' : 'e.g. Santos Farm'}
                    value={entityName}
                    onChange={(e) => setEntityName(e.target.value)}
                    required
                    className="h-9 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Contact Person</label>
                  <Input
                    type="text"
                    placeholder="e.g. Maria Santos"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Email address</label>
                  <Input
                    type="email"
                    placeholder="e.g. maria@kusina.ph"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-9 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Mobile Phone (+63)</label>
                  <Input
                    type="tel"
                    placeholder="0917 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Barangay (Butuan)</label>
                  <Input
                    type="text"
                    placeholder="e.g. Libertad or Antongalon"
                    value={barangay}
                    onChange={(e) => setBarangay(e.target.value)}
                    required
                    className="h-9 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Street Address / Landmark</label>
                  <Input
                    type="text"
                    placeholder="e.g. 142 Montilla Blvd"
                    value={addressText}
                    onChange={(e) => setAddressText(e.target.value)}
                    required
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">
                    {role === 'BUYER' ? 'Registration Document' : 'Valid ID Type'}
                  </label>
                  <Input
                    type="text"
                    value={idOrPermitType}
                    onChange={(e) => setIdOrPermitType(e.target.value)}
                    required
                    className="h-9 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-foreground">Last 4 Digits</label>
                    <span className="text-[10px] text-muted-foreground">Privacy Protected</span>
                  </div>
                  <Input
                    type="text"
                    maxLength={4}
                    placeholder="e.g. 8821"
                    value={idOrPermitLast4}
                    onChange={(e) => setIdOrPermitLast4(e.target.value)}
                    required
                    className="h-9 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Create Password (min. 8 characters)</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                  className="h-9 text-xs"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-9 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium"
                >
                  {loading ? (
                    <>
                      <Loader2 size={14} className="mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Complete Registration
                      <ArrowRight size={14} className="ml-1.5" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="pt-2 border-t border-border flex flex-col items-center justify-center gap-1 text-center">
            <p className="text-xs text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
                Sign in here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-muted-foreground">
        UMA B2B Agricultural Marketplace • Butuan City, Agusan del Norte
      </footer>
    </div>
  );
}
