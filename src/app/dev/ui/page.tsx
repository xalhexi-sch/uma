'use client';

import React, { useState } from 'react';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { MoneyText } from '@/components/shared/MoneyText';
import { DateText } from '@/components/shared/DateText';
import { StatCard } from '@/components/shared/StatCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorState } from '@/components/shared/ErrorState';
import { PageHeader } from '@/components/shared/PageHeader';
import { FormField } from '@/components/shared/FormField';
import { NumberStepper } from '@/components/shared/NumberStepper';
import { OrderTimeline } from '@/components/shared/OrderTimeline';
import { PhotoCapture } from '@/components/shared/PhotoCapture';
import { RatingStars } from '@/components/shared/RatingStars';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { DataCardList } from '@/components/shared/DataCardList';
import { StatCardSkeleton } from '@/components/shared/Skeleton';
import { ThemeToggle } from '@/components/navigation/ThemeToggle';
import { PublicHeader } from '@/components/navigation/PublicHeader';
import { PublicFooter } from '@/components/navigation/PublicFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  OrderStatus,
  ListingStatus,
  VerificationStatus,
  DeliveryStatus,
  DisputeStatus,
} from '@prisma/client';
import {
  ShoppingBag,
  Sprout,
  DollarSign,
  Truck,
} from 'lucide-react';
import { toast } from 'sonner';

const STATIC_TODAY = '2026-09-20T10:00:00.000Z';
const STATIC_TOMORROW = '2026-09-21T10:00:00.000Z';
const STATIC_CREATED = '2026-09-20T02:00:00.000Z';
const STATIC_CONFIRMED = '2026-09-20T03:00:00.000Z';
const STATIC_HARVESTED = '2026-09-20T05:00:00.000Z';
const STATIC_PICKED_UP = '2026-09-20T07:00:00.000Z';

export default function DevUIGallery() {
  const [stepperQty, setStepperQty] = useState(25);
  const [photoProof, setPhotoProof] = useState<string | null>(null);
  const [userRating, setUserRating] = useState(4);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [timelineStatus, setTimelineStatus] = useState<OrderStatus>(OrderStatus.PICKED_UP);

  const sampleTableData = [
    { id: 'UMA-2609-0001', kitchen: 'Kusina Butuan', crop: 'Highland Cabbage', qty: '50 kg', total: 320000, status: OrderStatus.HARVESTED },
    { id: 'UMA-2609-0002', kitchen: 'Balangay Grill', crop: 'Native Eggs (Tray)', qty: '10 trays', total: 240000, status: OrderStatus.PICKED_UP },
    { id: 'UMA-2609-0003', kitchen: 'Caraga Canteen', crop: 'Fresh Carabao Milk', qty: '20 L', total: 190000, status: OrderStatus.CONFIRMED },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sample Header */}
      <PublicHeader user={null} />

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        <PageHeader
          title="UMA Design System & Shared Components"
          description="Interactive component gallery verifying 60-30-10 tokens, states, accessibility, and responsive layouts."
          action={
            <div className="flex items-center gap-2">
              <ThemeToggle variant="outline" />
              <Button
                onClick={() => toast.success('Sonner toast notification working perfectly!')}
                className="bg-brand-amber text-brand-amber-fg font-bold"
              >
                Trigger Toast
              </Button>
            </div>
          }
        />

        {/* Section 1: 60-30-10 Color Tokens */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold tracking-tight">1. Color Palette Tokens (60-30-10 Rule)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            <div className="p-4 rounded-xl border border-border bg-background space-y-1">
              <div className="h-10 rounded-md bg-background border border-border" />
              <p className="text-xs font-semibold">Surface 60%</p>
              <p className="text-[10px] text-muted-foreground">--background</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card space-y-1">
              <div className="h-10 rounded-md bg-card border border-border" />
              <p className="text-xs font-semibold">Card Surface</p>
              <p className="text-[10px] text-muted-foreground">--card</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card space-y-1">
              <div className="h-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
                30% Forest
              </div>
              <p className="text-xs font-semibold">Brand 30%</p>
              <p className="text-[10px] text-muted-foreground">--primary (#14532D)</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card space-y-1">
              <div className="h-10 rounded-md bg-brand-amber text-brand-amber-fg flex items-center justify-center font-bold text-xs">
                10% Amber
              </div>
              <p className="text-xs font-semibold">Accent CTA 10%</p>
              <p className="text-[10px] text-muted-foreground">--brand-amber (#F59E0B)</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card space-y-1">
              <div className="h-10 rounded-md bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-semibold text-xs">
                Success
              </div>
              <p className="text-xs font-semibold">Semantic Success</p>
              <p className="text-[10px] text-muted-foreground">Verified / Completed</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card space-y-1">
              <div className="h-10 rounded-md bg-destructive text-destructive-foreground flex items-center justify-center font-semibold text-xs">
                Danger
              </div>
              <p className="text-xs font-semibold">Semantic Danger</p>
              <p className="text-[10px] text-muted-foreground">--destructive</p>
            </div>
          </div>
        </section>

        {/* Section 2: Status Badges */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold tracking-tight">2. Status Badges (Icon + Color + Text)</h2>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase">Order & Verification States</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <StatusBadge status={OrderStatus.PENDING} />
                <StatusBadge status={OrderStatus.CONFIRMED} />
                <StatusBadge status={OrderStatus.HARVESTED} />
                <StatusBadge status={OrderStatus.PICKED_UP} />
                <StatusBadge status={OrderStatus.DELIVERED} />
                <StatusBadge status={OrderStatus.COMPLETED} />
                <StatusBadge status={OrderStatus.DISPUTED} />
                <StatusBadge status={OrderStatus.CANCELLED} />
              </div>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                <StatusBadge status={VerificationStatus.VERIFIED} />
                <StatusBadge status={VerificationStatus.PENDING} />
                <StatusBadge status={VerificationStatus.REJECTED} />
                <StatusBadge status={ListingStatus.ACTIVE} />
                <StatusBadge status={ListingStatus.SOLD_OUT} />
                <StatusBadge status={DeliveryStatus.IN_TRANSIT} />
                <StatusBadge status={DisputeStatus.OPEN} />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 3: Money & Dates */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold tracking-tight">3. MoneyText & Manila DateText</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-5 space-y-3">
                <h3 className="text-xs font-bold text-muted-foreground uppercase">Money Formatting (Integer Centavos)</h3>
                <div className="flex flex-wrap items-baseline gap-4">
                  <MoneyText centavos={14000} unit="kg" size="sm" />
                  <MoneyText centavos={184000} size="base" />
                  <MoneyText centavos={200000} size="lg" variant="accent" />
                  <MoneyText centavos={2500000} size="2xl" variant="success" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 space-y-3">
                <h3 className="text-xs font-bold text-muted-foreground uppercase">Manila Date Helpers</h3>
                <div className="flex flex-col gap-1.5 text-sm">
                  <DateText date={STATIC_TODAY} showIcon />
                  <DateText date={STATIC_TOMORROW} windowId="MORNING_6_9" showIcon />
                  <DateText date="2026-09-24T00:00:00Z" style="full" showIcon />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 4: Stat Cards */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold tracking-tight">4. Metric Stat Cards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Today's Orders"
              value="24"
              subtitle="Scheduled for harvest"
              icon={ShoppingBag}
              trend={{ value: "+18%", isPositive: true }}
            />
            <StatCard
              title="Active Produce"
              value="1,420 kg"
              subtitle="Across 8 verified farms"
              icon={Sprout}
            />
            <StatCard
              title="Gross Volume"
              value={<MoneyText centavos={4850000} size="xl" />}
              subtitle="Last 30 days"
              icon={DollarSign}
              trend={{ value: "+12.4%", isPositive: true }}
            />
            <StatCard
              title="Active Couriers"
              value="3 on route"
              subtitle="Pooled deliveries"
              icon={Truck}
            />
          </div>
        </section>

        {/* Section 5: Interactive Stepper & Photo Proof */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold tracking-tight">5. Interactive Form Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Quantity Stepper & Star Rating</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <FormField label="Order Quantity (kg)" hint="Min 5 kg, step 5 kg" required>
                  <div className="flex items-center gap-3">
                    <NumberStepper
                      value={stepperQty}
                      onChange={setStepperQty}
                      min={5}
                      max={500}
                      step={5}
                      unit="kg"
                    />
                    <span className="text-xs text-muted-foreground">
                      Subtotal: <MoneyText centavos={stepperQty * 4500} />
                    </span>
                  </div>
                </FormField>

                <FormField label="Rate Courier / Farmer" hint="Tap stars to rate">
                  <div className="flex items-center gap-3 pt-1">
                    <RatingStars
                      rating={userRating}
                      interactive
                      onChange={setUserRating}
                      size="lg"
                    />
                    <span className="text-xs font-semibold">{userRating} / 5 Stars</span>
                  </div>
                </FormField>

                <FormField label="Commercial Address" required error={stepperQty > 400 ? 'Bulk order requires pooled freight scheduling' : undefined}>
                  <Input defaultValue="Montilla Blvd, Brgy. Dagohoy, Butuan City" />
                </FormField>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Photo Proof & Dialogs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <PhotoCapture
                  label="Delivery Proof Photo (Auto-Resized ≤1024px)"
                  value={photoProof}
                  onChange={setPhotoProof}
                />

                <div className="pt-2 flex items-center gap-3">
                  <Button
                    variant="destructive"
                    onClick={() => setConfirmOpen(true)}
                  >
                    Test Confirm Dialog
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 6: Order Timeline */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold tracking-tight">6. Order Progress Timeline</h2>
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold">Live Lifecycle Stepper</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setTimelineStatus(OrderStatus.CONFIRMED)}
                >
                  Confirmed
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setTimelineStatus(OrderStatus.PICKED_UP)}
                >
                  Picked Up
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setTimelineStatus(OrderStatus.COMPLETED)}
                >
                  Completed
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <OrderTimeline
                status={timelineStatus}
                createdAt={STATIC_CREATED}
                confirmedAt={STATIC_CONFIRMED}
                harvestedAt={STATIC_HARVESTED}
                pickedUpAt={STATIC_PICKED_UP}
              />
            </CardContent>
          </Card>
        </section>

        {/* Section 7: Responsive DataCardList */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold tracking-tight">7. DataCardList (Table on Desktop · Cards on Mobile)</h2>
          <DataCardList
            data={sampleTableData}
            keyExtractor={(item) => item.id}
            columns={[
              { header: 'Order Code', accessorKey: 'id', className: 'font-mono text-xs font-semibold' },
              { header: 'Buyer Kitchen', accessorKey: 'kitchen' },
              { header: 'Produce & Qty', render: (item) => <span>{item.crop} ({item.qty})</span> },
              { header: 'Amount', render: (item) => <MoneyText centavos={item.total} /> },
              { header: 'Status', render: (item) => <StatusBadge status={item.status} size="sm" /> },
            ]}
            renderCard={(item) => (
              <div className="p-4 rounded-xl border border-border bg-card shadow-2xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs font-bold text-primary">{item.id}</span>
                  <StatusBadge status={item.status} size="sm" />
                </div>
                <p className="text-sm font-semibold text-foreground">{item.kitchen}</p>
                <p className="text-xs text-muted-foreground">{item.crop} · {item.qty}</p>
                <div className="pt-2 flex justify-between items-center border-t border-border/60">
                  <span className="text-xs text-muted-foreground">Total Value:</span>
                  <MoneyText centavos={item.total} size="base" />
                </div>
              </div>
            )}
          />
        </section>

        {/* Section 8: Skeletons, Empty & Error States */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold tracking-tight">8. Loading, Empty & Error States</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCardSkeleton />
            <EmptyState
              title="No active listings"
              description="You have not created any harvest listings for next week yet."
              action={{
                label: 'Create Listing',
                onClick: () => toast.info('Navigating to listing form...'),
              }}
            />
            <ErrorState
              title="Connection failed"
              message="Could not reach the PostgreSQL database. Please check your network."
              onRetry={() => toast.success('Retrying connection...')}
            />
          </div>
        </section>

        {/* Confirm Dialog instance */}
        <ConfirmDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          title="Cancel Harvest Listing?"
          description="Cancelling this listing will release all unreserved stock and notify kitchens currently viewing it."
          confirmLabel="Yes, cancel listing"
          variant="danger"
          onConfirm={async () => {
            await new Promise((resolve) => setTimeout(resolve, 600));
            toast.success('Listing cancelled');
          }}
        />
      </div>

      <PublicFooter />
    </div>
  );
}
