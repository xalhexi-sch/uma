# UMA Architecture & Product Decisions

This document records the locked architecture, product, and engineering decisions for UMA.
Decisions D1–D15 are locked per `UMA_MASTER_SPEC.md` Section 2.

---

### D1: B2B Marketplace Positioning
- **Date:** 2026-09-20
- **Decision:** UMA is strictly a B2B marketplace. Buyers are commercial food businesses (carinderias, canteens, restaurants, resorts, caterers). Sellers are smallholder farmers. Fulfillment is scheduled and pooled via UMA Courier.
- **Reason:** Consumer "Foodpanda for groceries" economics do not work for farm-gate produce. Kitchens provide high-volume, recurring demand; forward orders eliminate speculative harvesting.

### D2: The Single Core Loop
- **Date:** 2026-09-20
- **Decision:** Farmer lists expected harvest → Kitchen orders basket before 8:00 PM cutoff → Farmer harvests only confirmed orders → Courier picks up and delivers with photo proof → Kitchen confirms → Farmer receives net payout (gross minus 8% commission).
- **Reason:** Keeps the platform focused on solving the core pain point with zero wasted scope.

### D3: Four User Roles
- **Date:** 2026-09-20
- **Decision:** Four distinct roles: `BUYER` (business), `FARMER`, `COURIER`, `ADMIN`.
- **Reason:** Each actor has fundamentally different needs (kitchen: basket & invoice; farmer: harvest to-do & payout; courier: turn-by-turn run sheet & camera; admin: verification & routing).

### D4: PostgreSQL Everywhere
- **Date:** 2026-09-20
- **Decision:** Use PostgreSQL (Neon / Supabase) across development, testing, and production. Drop SQLite.
- **Reason:** SQLite fails on serverless environments (Vercel read-only filesystem); dev/prod drift causes subtle bugs.

### D5: Integer Centavos for Money
- **Date:** 2026-09-20
- **Decision:** All monetary amounts are stored as integer centavos (`Int`), never `Float`. Formatted using `formatPeso()`.
- **Reason:** Floating-point arithmetic introduces rounding defects in commercial billing.

### D6: Prisma Enums for Status Fields
- **Date:** 2026-09-20
- **Decision:** All state and category fields use typed Prisma enums rather than free strings.
- **Reason:** Eliminates typos, protects integrity of state machines, and enforces valid lifecycle transitions.

### D7: Real Cryptographic Authentication & Role Guards
- **Date:** 2026-09-20
- **Decision:** Email + password auth with `bcryptjs` (cost ≥ 10), signed `httpOnly` session cookies (JWT via `jose`), middleware route protection, and server-side role verification. Delete `localStorage` auth.
- **Reason:** Security cannot be client-side. `localStorage` auth allowed anyone to escalate privileges from devtools.

### D8: Unified Service and API Layer
- **Date:** 2026-09-20
- **Decision:** Server Components handle reads via direct Prisma/service calls. Client mutations go through `/api/*` Route Handlers wrapped in `apiHandler` (enforces auth, zod validation, uniform JSON error format).
- **Reason:** Predictable error handling, no leaked stack traces, single source of validation.

### D9: Pay-on-Delivery at Pilot Stage
- **Date:** 2026-09-20
- **Decision:** Payments for the pilot are Pay on Delivery (Cash or GCash-to-courier / bank transfer confirmed by admin), recorded in an immutable `Transaction` ledger.
- **Reason:** Fits local agricultural trading norms without credit default risk. The ledger cleanly supports adding online payment gateways later.

### D10: Photo Proof Storage
- **Date:** 2026-09-20
- **Decision:** Pickup and delivery photos are resized client-side to ≤1024px JPEG (quality ≈ 0.7, ≤250 KB) and stored as base64 data URLs in DB text columns for the pilot.
- **Upgrade Path:** For production scale, upload to S3 / Cloudflare R2 / Vercel Blob with presigned URLs.

### D11: Manila Timezone & 8:00 PM Order Cutoff
- **Date:** 2026-09-20
- **Decision:** System timezone is `Asia/Manila` (UTC+8). Cutoff is strictly 8:00 PM Manila for next-day delivery. Orders after 8:00 PM are scheduled for day after tomorrow.
- **Reason:** Farmers need to plan next morning's harvest at dawn (5:00 AM).

### D12: Centralized Platform Economics
- **Date:** 2026-09-20
- **Decision:** Commission is 8% of produce value. Delivery fee is ₱150 (one-to-one) and ₱100 (pooled). Config lives in `src/lib/config.ts`.
- **Reason:** Prevents fragmented magic numbers across the codebase.

### D13: 60-30-10 Design System & Light Mode Default
- **Date:** 2026-09-20
- **Decision:** 60% warm neutral surface (`#FAFAF7`), 30% brand forest green matching `public/uma-logo-green.png`, 10% harvest amber for primary CTA only. Light mode is default for trust; dark mode available via toggle.
- **Reason:** Agricultural produce and food business procurement looks most natural and legible on clean light backgrounds.

### D14: Plain English & Philippine Context
- **Date:** 2026-09-20
- **Decision:** All user-facing copy uses clear plain English with Philippine contextual terms (₱, kg, barangay, +63). Jargon like "forward listing" is replaced by "harvest listing".
- **Reason:** High usability for busy kitchen operators and farmers in field conditions.

### D15: Honesty-First Claims Policy
- **Date:** 2026-09-20
- **Decision:** Never state "100% fresh", "zero middlemen", or "harvested this morning". UMA is the intermediary. We say: "No bagsakan markup. One clear 8% fee, shown before you commit." Freshness is a verifiable process, not an empty promise.
- **Reason:** Professional credibility in front of judges, partners, and enterprise buyers.

### D16: Boneyard Auto-Generated Skeletons
- **Date:** 2026-09-20
- **Decision:** Integrate `boneyard-js` for skeleton loading states. Wrap UI cards and dashboard summaries in `<Skeleton name="..." loading={...}>`, initialize registry on root layout, and configure multi-breakpoint capture.
- **Reason:** Eliminates hand-maintained placeholder drift and layout shift (CLS), providing a pixel-perfect loading experience.
