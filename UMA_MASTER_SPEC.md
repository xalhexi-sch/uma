# UMA — Master Completion Spec

> **For the coding agent.** This file is your single source of truth for finishing UMA as a complete, production-quality product — not an MVP, not a school demo. Read all of it before writing any code. Work phase by phase (Section 11). Do not skip ahead.

---

## 0. Who you are and how you work

You are a **five-person team in one head**. Before building any screen, feature, or sentence of copy, ask all five:

| Hat | Question it asks |
|---|---|
| **Business lead (corporate, decisive)** | Does this move the business forward? Is the money math right? Is every claim defensible in front of a panel? |
| **Sales / conversion copywriter** | Does the visitor know in 5 seconds what this is, why it's better, and what to click? Is the objection answered? |
| **Senior UI/UX designer** | Is it clear, calm, consistent, and premium? One primary action per screen? Works on a phone in sunlight? |
| **Senior full-stack engineer** | Is it typed, validated, authorized, tested, and boring-in-a-good-way? |
| **QA lead (a confused first-time user)** | What happens if I tap twice, go back, leave a field empty, lose signal, or type nonsense? |

### Operating rules (non-negotiable)

1. **Read before you write.** Read this whole file, then `README.md`, `docs/*.md`, `prisma/schema.prisma`, and every file under `src/`.
2. **One phase at a time, in order.** Do not begin Phase N+1 until every acceptance check in Phase N passes.
3. **After every phase run:** `npm run lint && npm run typecheck && npm run test && npm run build`. Fix everything. If a command cannot run in your environment, say so explicitly — **never claim something passed that you did not run.**
4. **Section 2 decisions are locked.** Do not re-debate them. If you hit a real blocker, pick the most conservative option, record it in `docs/DECISIONS.md` (date, decision, reason), and continue.
5. **Never invent facts.** No fake statistics, testimonials, partner logos, "as seen in", or made-up user counts. Show real numbers from the database or clearly labeled examples.
6. **Never ship:** `TODO`, lorem ipsum, `console.log`, `any`, dead links, buttons that do nothing, or screens without loading / empty / error states.
7. **Every interactive element does something real or is removed.**
8. **Small commits**, one per logical unit: `phase-3: app shell + mobile bottom nav`.
9. **No new dependencies** beyond the list in Phase 0. If you truly need one, justify it in `docs/DECISIONS.md`.
10. **Files stay under ~300 lines.** Split components and helpers.
11. **Only ask the human for:** `DATABASE_URL`, `SESSION_SECRET`, and the production domain. Decide everything else yourself.

---

## 1. Where the project stands (audited)

The project was reviewed by reading the code (it was **not** built or run during the audit — you must do that first).

**Stack:** Next.js 16 (App Router), React 19, Tailwind v4, shadcn/ui (Base UI), Prisma 6, TypeScript. Repo: `xalhexi-sch/uma`. Domain target: `uma.xalhexi.wtf`.

**What is genuinely good and must be kept**
- Strong business thinking in `docs/` (forward-order model, pooled logistics, Five-Layer Lock, unit economics, defense Q&A).
- A sensible 11-model relational schema (Farmer, Listing, Business, Order, OrderItem, Courier, Delivery, Route, Rating, Dispute, Transaction).
- shadcn component base, OKLCH theme tokens, dark/light toggle, brand logos in `/public`.

**What is fake or broken (this is the real work)** — see Section 3 for the fix list.

Rough completeness: front-end shell ≈ 60%, real working backend ≈ 15%. Almost everything a panelist would click is simulated.

---

## 2. Locked decisions

| # | Decision | Why |
|---|---|---|
| **D1** | **UMA is a B2B marketplace.** Buyers = carinderias, canteens, restaurants, resorts, caterers. Sellers = smallholder farmers. Pooled delivery via "UMA Courier". | Every doc, the schema, and the defense sheet are B2B. The current landing/README ("fresh food to your door", "Foodpanda for produce" feel) contradicts the blueprint's own "What UMA is NOT" list and a panel will catch it. |
| **D2** | **One core loop, done perfectly:** Farmer lists a harvest → Business orders a basket before the cutoff → Admin confirms/assigns courier → Farmer harvests → Courier picks up & delivers with photo proof → Business confirms → Farmer is paid net of commission. | This is the entire product. Everything else supports it. |
| **D3** | **Four roles:** `BUYER` (business), `FARMER`, `COURIER`, `ADMIN`. | Schema already has Courier; the courier needs a phone-first screen. |
| **D4** | **PostgreSQL everywhere** (Neon). Drop SQLite. | SQLite does not persist on Vercel; dev/prod drift causes bugs. |
| **D5** | **Money is stored as integer centavos**, never `Float`. Display via one `formatPeso()` helper. | Float money is a defect. |
| **D6** | **Status fields are Prisma enums**, not free strings. | Prevents typos and illegal states. |
| **D7** | **Real auth:** email + password (bcrypt), signed httpOnly session cookie (JWT via `jose`), route protection in `middleware.ts`, role guards on every API route. Demo accounts are **real seeded users** with a one-click "Try demo" button (only when `DEMO_MODE=true`). **Delete the localStorage auth.** | Anyone could currently become admin from the browser console, and the API has no auth. |
| **D8** | **Reads** happen in Server Components via a service layer (`src/server/*`). **Writes** go through Route Handlers (`/api/*`) wrapped by one `apiHandler` (auth → zod validate → run → uniform JSON error). | One pattern = fewer bugs. |
| **D9** | **Payments at MVP-complete stage = Pay on Delivery (cash / GCash-to-courier / bank transfer confirmed by admin)**, recorded in a `Transaction` ledger. No live payment gateway. | Matches the blueprint's "no credit default risk" rule. Build the ledger so a gateway can plug in later. |
| **D10** | **Proof photos** (pickup/delivery/dispute): client resizes to ≤1024px JPEG (q≈0.7, ≤250 KB) and stores as data URL in the DB text column. | Zero extra infra for the pilot. Document the upgrade path (object storage) in `docs/DECISIONS.md`. |
| **D11** | **Timezone = `Asia/Manila`.** Store UTC, render Manila. **Order cutoff = 8:00 PM Manila** for next-day delivery. Config lives in `src/lib/config.ts`. | Cutoff bugs are the #1 source of confusing order behavior. |
| **D12** | **Platform economics live in one file** (`src/lib/config.ts`): commission 8% of produce value; delivery fee ₱150 one-to-one, ₱100 pooled; first-order delivery credit flag. | Matches `docs/EXECUTIVE_SUMMARY.md`. **Owner to confirm the pooled fee** — at ₱100 with a ₱100 courier payout the logistics margin is ₱0 unless pooled courier cost per stop is lower. |
| **D13** | **Brand palette follows the 60-30-10 rule** (Section 6). Light theme is the default for public pages; user can toggle; respect `prefers-color-scheme` after first choice. | Food/agri reads as trustworthy on light; current hard-coded `dark` class is removed. |
| **D14** | **Copy rule:** plain English, short sentences, Philippine context (₱, kg, barangay, Manila time, +63 phone). No jargon: say "harvest listing" not "forward listing". | "Dumb-proof" is a product requirement. |
| **D15** | **Claims policy:** never write "100% fresh", "zero middlemen", "28% savings", "harvested this morning". UMA *is* the intermediary. Say: "No bagsakan markup. One clear 8% fee, shown before you commit." Freshness is a **process** (harvest-to-drop-off time, photo proof, inspection at door), not a guarantee. | Contradicts `docs/BLUEPRINT.md` Part 17 and the defense sheet Q5 otherwise. |

---

## 3. Audit findings — fix list

### P0 — Blocks "working"
| # | Problem | Where | Fix (phase) |
|---|---|---|---|
| 1 | "Confirm Order" only sets a success flag; **nothing is saved**. | `src/app/products/page.tsx` → `handleConfirmOrder` | Real basket + checkout → `POST /api/orders` (P5) |
| 2 | Dashboard data is hard-coded `useState([...])`; not tied to the DB. | `src/app/dashboard/page.tsx` | Server-rendered, role-specific dashboards (P5–P7) |
| 3 | Catalog is a static array; the DB listings are unused by the UI. Two sources of truth. | `src/lib/catalog.ts` vs `prisma` | Delete `catalog.ts`; catalog reads `Listing` (P5) |
| 4 | Auth is `localStorage`; roles are client-side; API routes are public. `GET /api/orders` returns everyone's orders. | `src/lib/auth.ts`, `src/app/api/*` | Real auth + guards (P2) |
| 5 | Order API trusts client-sent `price` and `businessId`; no stock check; can oversell; cutoff set to "today 8 PM" even if already past; `totalValue` ignores delivery fee. | `src/app/api/orders/route.ts` | Server-side pricing, transaction, stock reservation, Manila cutoff (P5) |
| 6 | SQLite + Vercel deploy = data loss. `package.json` has no `postinstall: prisma generate` → Vercel build risk. | `schema.prisma`, `package.json` | Postgres + postinstall (P0/P1) |
| 7 | Stats API returns **fabricated fallback numbers** (24 farmers, 47 orders) and a hard-coded `'28%'` when the DB errors. Showing fake metrics is a panel-killer. | `src/app/api/stats/route.ts` | Real counts only; hide the section if empty (P4) |

### P1 — Credibility & quality
| # | Problem | Fix |
|---|---|---|
| 8 | Positioning mismatch (consumer "to your door" vs B2B docs); "zero middlemen" claim. | Rewrite per D1/D15 (P4) |
| 9 | Login "enter email" form ignores the email and logs in as buyer. | Real login form (P2) |
| 10 | `Farmer.idNumber` / `Business.permitNo` stored as plain text (PII, RA 10173 Data Privacy Act). | Store last-4 only + verification status; show masked (P1) |
| 11 | Money as `Float`; statuses as `String`. | D5, D6 (P1) |
| 12 | No validation library, no rate limiting, no error boundaries, no `not-found`, no loading states. | zod, `error.tsx`, `loading.tsx`, `not-found.tsx` (P0/P9) |
| 13 | Unsplash hotlinks with no fallback; dead image = broken card. | `ProductImage` component with fallback (P5) |
| 14 | Public nav shows "Dashboard" to logged-out users. | Auth-aware nav (P3) |
| 15 | `"cn": "^0.3.0"` in dependencies is an unrelated npm package and conflicts with the local `cn()` util. | Remove it (P0) |
| 16 | README says 60-second local setup with SQLite; will be wrong after D4. | Rewrite README (P10) |

### P2 — Polish
No SEO metadata per page, no `robots`/`sitemap`, no OG image, no a11y pass, no tests, no legal pages, no favicon set beyond one PNG.

---

## 4. Users, journeys, and the promise to each

### Buyer (kitchen manager, carinderia owner, resort purchasing)
*Promise: "Order tonight, get one delivery tomorrow, one clear price."*
Register → wait for verification (or demo) → browse harvest listings → add to basket from several farms → pick delivery window & type → see full price breakdown → place order → track → confirm delivery → rate → reorder in 1 tap.

### Farmer
*Promise: "List your harvest once. Get paid fairly for every kilo, on time."*
Register → get verified → create harvest listing (crop, kg, price, harvest date) → see confirmed orders → mark "Harvested" → hand to courier → see payout (gross, 8% fee, net).

### Courier
*Promise: "Your day on one screen. Tap, photo, done."*
Sees today's route as an ordered list of pickups & drop-offs → taps "Picked up" (+photo) → taps "Delivered" (+photo) → sees earnings.

### Admin (UMA Operations)
*Promise: "Nothing falls through the cracks."*
Verifies farmers/businesses → sees today's orders needing action → assigns couriers → groups orders into pooled routes → resolves disputes → sees real KPIs → manages leads.

---

## 5. Site map & screens

### Public
| Route | Purpose |
|---|---|
| `/` | Landing (Section 7) |
| `/browse` (redirect old `/products` → `/browse`) | Public harvest catalog; can view without login; ordering needs login |
| `/browse/[id]` | Listing detail: farm, harvest date, price/kg, min order, reliability, "how freshness works" |
| `/how-it-works` | Full 4-step explainer + timeline + cutoff rules |
| `/for-businesses` | Sales page for kitchens (benefits, price transparency, FAQ, CTA) |
| `/for-farmers` | Sales page for farmers (payout example, how verification works, FAQ, CTA) |
| `/pricing` | Fee transparency: 8%, ₱150/₱100, worked example |
| `/faq`, `/contact` | Real answers; contact form → `Lead` |
| `/privacy`, `/terms` | Plain-language legal (Data Privacy Act aware) |
| `/login`, `/register` | Register has role choice → role-specific short form |
| `not-found`, `error` | Friendly, with 3 useful links |

### App (auth required; layout = app shell)
| Route | Roles | Screen |
|---|---|---|
| `/dashboard` | all | Role router → role home |
| `/dashboard/basket`, `/dashboard/checkout` | BUYER | Basket & checkout |
| `/dashboard/orders`, `/dashboard/orders/[id]` | BUYER, FARMER, ADMIN | List + detail w/ timeline |
| `/dashboard/listings`, `/dashboard/listings/new`, `/dashboard/listings/[id]` | FARMER (+ADMIN view) | Harvest listings CRUD |
| `/dashboard/payouts` | FARMER, ADMIN | Payout ledger |
| `/dashboard/deliveries`, `/dashboard/deliveries/[id]` | COURIER, ADMIN | Today's run, proof capture |
| `/dashboard/admin/verifications` | ADMIN | Approve / reject farmers, businesses, couriers |
| `/dashboard/admin/routes` | ADMIN | Create pooled routes, assign couriers |
| `/dashboard/admin/disputes` | ADMIN | Resolve with refund amount + notes |
| `/dashboard/admin/leads` | ADMIN | Waitlist/contact leads |
| `/dashboard/admin/config` | ADMIN | Read-only view of fees/cutoff (edit via env/config) |
| `/dashboard/notifications` | all | In-app notifications |
| `/dashboard/settings` | all | Profile, password, theme |

**Navigation:** desktop = left sidebar + top bar; mobile = top bar + **bottom tab bar (max 5 items)**. Role decides which items appear.

---

## 6. Design system

### Principles
Modern, premium, minimal, **restrained** — never busy. Whitespace over decoration. One primary action per screen. Consistency beats cleverness.

### 60-30-10 color rule (applies to every screen)
| Share | Role | Light | Dark |
|---|---|---|---|
| **60%** | Neutral surfaces (background, cards) | warm off-white `#FAFAF7`, card `#FFFFFF` | `#0E1512`, card `#151E19` |
| **30%** | Brand green (nav, headings accents, footer band, secondary buttons, icons) | forest `#14532D` / mid `#166534` | `#22C55E`-tinted greens at lower saturation |
| **10%** | Accent — **primary CTA and key highlights only** | harvest amber `#F59E0B` (text on it `#1A1A14`) | same |

Also define semantic tokens: `success`, `warning`, `danger`, `info`, each with fg/bg pair. **Before finalizing, view `/public/uma-logo-green.png` and adjust the brand greens to match the logo.** Every text/background pair must meet **WCAG AA (≥4.5:1; ≥3:1 for large text/UI)** — verify, don't assume. Put all tokens in `globals.css` as CSS variables; never hard-code hex in components. Amber must not be used for more than one primary CTA per viewport.

### Layout composition rules
- 12-column grid on desktop, 4 on mobile; content max width `72rem` (marketing), `80rem` (app).
- **8-pt spacing scale** (4, 8, 12, 16, 24, 32, 48, 64, 96). Section vertical padding: 64–96 desktop, 40–56 mobile.
- Clear visual hierarchy: one H1 per page; one dominant element above the fold; consistent left alignment; group related items (proximity); align to grid; generous line-height (1.5–1.7 body).
- Cards: `radius-lg`, 1px border, very soft shadow, no heavy gradients.

### Typography
Geist Sans (already installed). Scale: 12 / 14 / 16 (body) / 18 / 20 / 24 / 32 / 40 / 56. Body never below 14px (16px on mobile inputs to prevent iOS zoom). Numbers use `tabular-nums` (prices, kg, totals).

### Responsive
Breakpoints: mobile ≤ 640, tablet 641–1024, desktop > 1024. **Design mobile-first.** Tap targets ≥ 44×44 px. No horizontal scroll at 320 px. Tables collapse into cards on mobile.

### Required shared components (build in Phase 3, use everywhere)
`AppShell`, `PublicHeader`, `PublicFooter`, `PageHeader`, `StatCard`, `StatusBadge` (color + icon + text, never color alone), `MoneyText`, `DateText` (Manila, friendly: "Tomorrow, Tue 22 Sep · 6–9 AM"), `EmptyState` (icon, one sentence, one action), `ErrorState` (with Retry), `Skeleton` loaders, `ConfirmDialog`, `Toaster` (sonner), `FormField` (label, hint, error), `NumberStepper` (− / + for qty), `OrderTimeline` (vertical stepper), `ProductImage` (fallback), `PhotoCapture` (camera input + resize), `Rating` (stars), `DataCardList` (table→cards).

### States every screen must have
Loading (skeleton) · Empty (explain + next action) · Error (plain words + retry) · Success (toast) · Disabled (with reason on hover/tap) · Offline/slow (toast: "Weak signal — still trying").

### Accessibility
Semantic HTML, labels on all inputs, visible focus ring, keyboard reachable everything, `aria-live` for toasts, `alt` text, skip-to-content link, `prefers-reduced-motion` respected, dialogs trap focus. Motion: subtle 150–200 ms fades/slides only.

---

## 7. Landing page spec (`/`)

Goal: a first-time visitor understands **what UMA is, who it's for, why it's better, and what to click** in under 5 seconds. Every section ends in a clear next step. **No fake stats.**

**Section order & copy (use this copy; you may polish wording, not meaning):**

1. **Announcement bar (only if a real promo is enabled in config):** "First order: delivery fee waived for verified kitchens." Otherwise, do not render.
2. **Header:** Logo · How it works · For kitchens · For farmers · Pricing · FAQ · [Log in] · **[Join the pilot]** (amber). Auth-aware: logged-in users see "Go to dashboard".
3. **Hero**
   - H1: **Farm-fresh produce, scheduled to your kitchen.**
   - Sub: "UMA connects Butuan-area farmers directly with carinderias, canteens, and restaurants. Order by 8 PM. Get one combined delivery. Farmers keep more of every peso."
   - Primary CTA: **Order for my kitchen** → `/register?role=business`
   - Secondary CTA: **Sell my harvest** → `/register?role=farmer`
   - Tertiary text link: "See how it works ↓"
   - Right side: a **real "sample basket" card** (crop, kg, farm, harvest date, price) reading from live active listings; graceful fallback if none.
   - Trust line under CTAs: "Pilot in Butuan City · Verified farms & businesses · Photo proof on every delivery"
4. **The problem (3 short cards):** Kitchens: "Erratic supply, changing prices, calling ten vendors." Farmers: "Middlemen keep 20–30%. Small baskets can't justify transport." Both: "No visibility on who delivers what, when."
5. **How it works (4 steps, icon + 1 sentence each):**
   1) Farmers list what they'll harvest. 2) Kitchens order before 8 PM. 3) Farmers harvest only what's ordered. 4) One courier delivers, with photo proof. — CTA: "Read the full process".
6. **Why UMA (benefit grid, 6 items):** One basket, many farms · Harvest-to-order (less waste) · Transparent 8% fee · Photo-verified pickup & delivery · Backup farmer if a crop fails · Trade credit for vetted buyers *(mark "coming soon")*.
7. **Where every peso goes** — interactive worked example from `docs/EXECUTIVE_SUMMARY.md`: ₱2,000 basket → farmer receives ₱1,840 · UMA fee ₱160 · delivery ₱150 · with a slider to change basket size. Label it clearly as an **example**. This is the honesty-as-differentiator section.
8. **Live harvest preview:** 4 real active listings (`ProductImage`, crop, farm, price/kg, harvest date). Button: "Browse all harvests".
9. **For farmers / For kitchens split:** two side-by-side cards, each with 3 bullets + its own CTA.
10. **FAQ (accordion, 8 questions):** Who can join? · How does verification work? · What if a farmer can't deliver? · How do I pay? · What's the cutoff? · What are the fees? · Which areas do you serve? · How do you keep produce fresh? *(answer with the process, never a guarantee).*
11. **Join the pilot (working lead form):** name, phone (+63 validated), "I am a… (Kitchen / Farmer)", barangay, optional message → `POST /api/leads` → success state "Thanks — we'll message you within 2 working days." Honeypot + rate limit.
12. **Footer:** logo, one-line description, links (Pages · Legal · Contact), "Butuan City, Agusan del Norte, Philippines", © year. Dark-mode toggle.

**SEO:** unique `<title>` + meta description per page; Open Graph + Twitter card; `app/sitemap.ts`, `app/robots.ts`; JSON-LD `Organization` on the landing page; semantic headings; `next/image` with dimensions; LCP < 2.5 s target.

---

## 8. Data model changes (`prisma/schema.prisma`)

Switch provider to `postgresql`. Use `prisma migrate dev` (commit migrations). Keep integer autoincrement IDs internally but **never trust an ID from the client without an ownership check**; orders also get a public human code.

**Enums:** `Role {BUYER FARMER COURIER ADMIN}` · `VerificationStatus {PENDING VERIFIED REJECTED}` · `ListingStatus {DRAFT ACTIVE SOLD_OUT CANCELLED HARVESTED}` · `OrderStatus {PENDING CONFIRMED HARVESTED PICKED_UP DELIVERED COMPLETED DISPUTED CANCELLED}` · `PaymentStatus {UNPAID PAID REFUNDED}` · `DeliveryStatus {PENDING PICKED_UP IN_TRANSIT DELIVERED FAILED}` · `DeliveryType {ONE_TO_ONE POOLED}` · `DisputeStatus {OPEN UNDER_REVIEW RESOLVED}` · `TxType {DELIVERY_FEE COMMISSION PROMO_CREDIT REFUND PAYOUT}` · `TxStatus {PENDING COMPLETED FAILED}` · `LeadType {BUSINESS FARMER OTHER}` · `Unit {KG PIECE TRAY LITER BOTTLE BUNCH}`

**New models**
- `User` — `id, email @unique, passwordHash, name, phone, role, farmerId? @unique, businessId? @unique, courierId? @unique, lastLoginAt, createdAt`.
- `Payout` — `id, orderId, farmerId, grossCentavos, commissionCentavos, netCentavos, status, paidAt?, reference?`.
- `Notification` — `id, userId, type, title, body, href?, readAt?, createdAt`.
- `Lead` — `id, name, phone, email?, type LeadType, barangay?, message?, handled Boolean @default(false), createdAt`.
- `AuditLog` — `id, actorUserId?, action, entity, entityId, meta Json?, createdAt` (write on verification decisions, status changes, refunds, config-impacting actions).

**Changes to existing models**
- **Money → centavos (Int):** `Listing.priceCentavos`, `OrderItem.priceAtOrderCentavos` + `lineTotalCentavos`, `Order.subtotalCentavos / deliveryFeeCentavos / discountCentavos / totalCentavos`, `Dispute.refundCentavos`, `Transaction.amountCentavos`.
- **Listing:** add `category`, `description?`, `unit Unit`, `minOrderQty`, `reservedQty Float @default(0)`, `imageUrl?`, `grade?`; `status` enum. Available = `estimatedQty − reservedQty`.
- **Order:** add `code String @unique` (format `UMA-YYMM-####`), `deliveryAddress`, `deliveryWindow` (e.g. `MORNING_6_9`), `notes?`, `cancelledReason?`, `requestedFor DateTime` (delivery date). Status/paymentStatus/deliveryType → enums.
- **Farmer / Business:** replace `idNumber` / `permitNo` with `idLast4` / `permitLast4`; `verifiedAt` → also `verificationStatus`, `verifiedByUserId?`, `rejectionReason?`. Add `addressText`, optional `lat/lng` (unused for now, reserved).
- **Delivery:** `pickupProof` / `deliveryProof` remain (data-URL text, D10); add `failureReason?`.
- **Indexes:** `Listing(status, harvestDate)`, `Order(businessId, createdAt)`, `Order(status, requestedFor)`, `Notification(userId, readAt)`.

**Seed (`prisma/seed.ts`) — rich, realistic, idempotent:** 1 admin, 8 farmers (mixed reliability, 1 unverified), 8 businesses (1 unverified), 3 couriers, 14+ listings over the next 7 days across vegetables/dairy/poultry/staples, orders in **every status** (incl. one disputed, one cancelled), 2 pooled routes, ratings, payouts, notifications, leads. Demo users' password from `DEMO_PASSWORD` env. Provide `npm run db:reset` (migrate reset + seed).

---

## 9. Business rules (implement as pure, unit-tested functions in `src/server/rules/`)

**Money**
- `subtotal = Σ (qty × priceAtOrder)`; `commission = round(subtotal × 8%)` (deducted from farmer payout); `total = subtotal + deliveryFee − discount`; `farmerNet = farmerSubtotal − farmerCommission`. Rounding: half-up to the centavo; the sum of parts must equal the total exactly (test it).
- Prices are **snapshotted** into `OrderItem` at order time. Later listing edits never change past orders.

**Cutoff & scheduling (Manila time)**
- Orders placed **before 8:00 PM** can be delivered **next day**; placed after 8 PM → earliest is **day after next**. The UI shows the earliest available date and a live countdown ("Order in the next 2h 14m for tomorrow").
- A listing can only be ordered if `harvestDate ≤ requestedFor` and status `ACTIVE` and `available ≥ qty ≥ minOrderQty`.

**Stock**
- Placing an order **reserves** quantity inside one DB transaction (`SELECT … FOR UPDATE` semantics via Prisma interactive transaction + conditional update). Two simultaneous orders must never oversell (test with `Promise.all`).
- Cancel / reroute releases reserved qty.

**Order lifecycle (state machine) — enforce server-side**
```
PENDING → CONFIRMED → HARVESTED → PICKED_UP → DELIVERED → COMPLETED
   └─────────┴────────────┴───────────┴──────────┴──→ CANCELLED (rules below)
DELIVERED → DISPUTED → COMPLETED (after admin resolution)
```
| Transition | Who | Rule |
|---|---|---|
| PENDING → CONFIRMED | ADMIN (or auto if buyer verified & all items available) | Default: **auto-confirm** for verified buyers |
| CONFIRMED → HARVESTED | FARMER (own items) | Order becomes HARVESTED when all farmers mark items |
| HARVESTED → PICKED_UP | COURIER | Requires pickup photo |
| PICKED_UP → DELIVERED | COURIER | Requires delivery photo |
| DELIVERED → COMPLETED | BUYER (or auto after 24 h with no dispute) | Creates `Payout` rows (farmer net) |
| DELIVERED → DISPUTED | BUYER (within 24 h) | Requires reason + optional photo |
| any pre-PICKED_UP → CANCELLED | BUYER (before farmer marks harvested), ADMIN (anytime) | Reason required; releases stock |
- Illegal transitions return `409` with a plain-English message. Every transition writes an `AuditLog` and a `Notification` to affected users.

**Failure defaults (from blueprint):** farmer can't deliver → admin can **reroute** the `OrderItem` to another farmer's listing of the same crop (status `rerouted`) and notify the buyer; farmer reliability score drops. Courier fails → `FAILED` + reason → admin reassigns.

**Verification:** a farmer/business/courier can browse but **cannot transact** until `VERIFIED`. Unverified users see a friendly banner: "We're checking your details. This usually takes 1–2 working days."

**First-order credit (config flag `FIRST_ORDER_DELIVERY_CREDIT`):** if on, a verified business's first order gets `discount = deliveryFee`, recorded as a `PROMO_CREDIT` transaction so the admin dashboard shows real acquisition cost.

**Ratings:** after COMPLETED, buyer rates farmer(s) & courier; farmer rates buyer. One rating per (order, from, to). Reliability score = rolling average of last 20 ratings (min 3 to display).

---

## 10. API contract

All routes live under `src/app/api/**/route.ts` and use the shared `apiHandler({ roles, schema, handler })`.

**Uniform response**
```json
// success
{ "ok": true, "data": { } }
// failure (never leak stack traces)
{ "ok": false, "error": { "code": "VALIDATION_ERROR", "message": "Plain English", "fields": { "qty": "Minimum is 5 kg" } } }
```
Codes: `UNAUTHENTICATED 401`, `FORBIDDEN 403`, `NOT_FOUND 404`, `VALIDATION_ERROR 422`, `CONFLICT 409`, `RATE_LIMITED 429`, `INTERNAL 500`.

| Method & path | Roles | Notes |
|---|---|---|
| `POST /api/auth/register` | public | role = BUYER or FARMER only; creates User + Business/Farmer (PENDING) |
| `POST /api/auth/login` · `POST /api/auth/logout` · `GET /api/auth/me` | public / auth | rate-limit login (5/min/IP+email) |
| `POST /api/auth/demo` | public, only if `DEMO_MODE=true` | body `{ role }` → session for seeded demo user |
| `GET /api/listings` | public | filters: `q, category, harvestFrom, harvestTo, farmerId`; cursor pagination |
| `POST /api/listings` · `PATCH /api/listings/[id]` · `DELETE …` | FARMER (own) / ADMIN | can't edit price/qty below reserved qty; delete = cancel if orders exist |
| `POST /api/orders` | BUYER (verified) | body `{ items:[{listingId, qty}], requestedFor, deliveryWindow, deliveryType, address, notes }`; **server computes all prices**; one transaction |
| `GET /api/orders` · `GET /api/orders/[id]` | scoped by role | BUYER sees own; FARMER sees orders containing own items (only own lines); ADMIN all |
| `POST /api/orders/[id]/transition` | per state machine | body `{ to, reason?, proof? }` |
| `POST /api/orders/[id]/rate` · `POST /api/orders/[id]/dispute` | BUYER/FARMER | |
| `GET/POST /api/deliveries…`, `POST /api/deliveries/[id]/status` | COURIER (own) / ADMIN | proof required |
| `POST /api/admin/verify` | ADMIN | `{ entity, id, decision, reason? }` |
| `POST /api/admin/routes` · `POST /api/admin/assign-courier` | ADMIN | |
| `POST /api/admin/disputes/[id]/resolve` | ADMIN | `{ resolution, refundCentavos }` ≤ order total |
| `POST /api/leads` | public | honeypot field + rate limit 3/hour/IP |
| `GET /api/notifications` · `POST /api/notifications/read` | auth | |
| `GET /api/stats/public` | public | **real counts only**; cache 5 min; returns `null` fields when zero so UI hides them |
| `POST /api/admin/demo-reset` | ADMIN, only if `DEMO_MODE=true` | re-seeds demo data |

**Cross-cutting:** every input validated with zod (schemas in `src/lib/validation/*`, shared with forms). Ownership checks on every `[id]`. Idempotency: order creation accepts an `Idempotency-Key` header (store on `Order`) so double-taps don't create duplicates. Simple in-memory/DB rate limiter is acceptable for the pilot.

---

## 11. Build phases (do in order; gate each on its acceptance checks)

### Phase 0 — Foundation & hygiene
- Install: `zod jose bcryptjs sonner react-hook-form @hookform/resolvers server-only` and dev: `vitest @types/bcryptjs @vitest/coverage-v8`. **Remove** the `cn` package.
- `package.json` scripts: `typecheck` (`tsc --noEmit`), `test` (`vitest run`), `postinstall` (`prisma generate`), `db:migrate`, `db:seed`, `db:reset`.
- Create: `src/lib/env.ts` (zod-validated env; fail fast with a clear message), `src/lib/config.ts` (D11, D12), `src/lib/money.ts` (`formatPeso`, centavo math), `src/lib/dates.ts` (Manila helpers, cutoff), `src/server/api/handler.ts` (`apiHandler`, error classes), `.env.example` (all vars documented: `DATABASE_URL, SESSION_SECRET, DEMO_MODE, DEMO_PASSWORD, NEXT_PUBLIC_SITE_URL, FIRST_ORDER_DELIVERY_CREDIT`).
- Add `docs/DECISIONS.md` (seed it with D1–D15).
- **Accept:** lint, typecheck, test, build all green on a clean clone; env missing → readable error, not a crash.

### Phase 1 — Database & seed
- Apply Section 8. Generate first migration. Rich seed. `db:reset` works from scratch.
- **Accept:** `npm run db:reset` succeeds; Prisma Studio shows orders in every status; no `Float` money remains; no PII beyond last-4.

### Phase 2 — Auth & roles
- Register (role choice → short form), login, logout, demo login, `me`. bcrypt cost ≥ 10. Session cookie: httpOnly, secure in prod, sameSite=lax, 7-day expiry. `middleware.ts` protects `/dashboard/**` and redirects with `?next=`. `requireUser(roles)` helper for server components and routes.
- Delete `src/lib/auth.ts` (localStorage) and every use of it.
- **Accept:** logged-out user hitting `/dashboard` → login → back to intended page. BUYER calling an ADMIN endpoint → `403`. Editing localStorage/cookies by hand cannot elevate role. Tests cover permissions matrix.

### Phase 3 — Design system & app shell
- Implement tokens (Section 6), all shared components, `PublicHeader/Footer`, `AppShell` (sidebar + mobile bottom tabs), `loading.tsx`, `error.tsx`, `not-found.tsx`, theme handling (light default, system-aware, persisted, no flash).
- Build a hidden `/dev/ui` route (dev only) showing every component in every state, both themes — use it to self-review.
- **Accept:** no hard-coded colors outside tokens; contrast verified; usable at 320 px; keyboard-navigable; visual review at 375 / 768 / 1280 px in both themes.

### Phase 4 — Landing & public pages
- Build Section 7 fully, plus `/how-it-works`, `/for-businesses`, `/for-farmers`, `/pricing`, `/faq`, `/contact`, `/privacy`, `/terms`. Working lead form. Sitemap, robots, OG image, JSON-LD. Remove fabricated stats and banned claims (D15).
- **Accept:** Lighthouse (mobile) ≥ 90 Performance/Accessibility/Best Practices/SEO or a written reason for each miss; no lorem/fake numbers; lead form persists a `Lead`; every CTA lands somewhere useful.

### Phase 5 — Buyer core loop
- `/browse` with search, category chips, harvest-date filter, sort, "available now" badges, pagination. Listing detail. Basket (persisted server-side or per-user localStorage keyed by user id) grouped by farm, qty steppers respecting min/step, live total. Checkout: address (prefilled), delivery date (earliest auto-selected + cutoff countdown), window, delivery type, **full price breakdown** (subtotal, delivery, credit, total, "of which farmers receive ₱X"), Pay-on-Delivery explanation, confirm. Order success screen + `/dashboard/orders` + detail with `OrderTimeline` + Reorder + Cancel + Confirm delivery + Rate + Report a problem.
- **Accept:** placing an order writes Order+Items+reserved qty+notifications atomically; two concurrent orders can't oversell (test); price tampering in devtools has no effect; order after 8 PM shows the correct earliest date; double-click creates one order.

### Phase 6 — Farmer app
- Home (today's to-do: orders to harvest, payouts pending), listings CRUD with simple form (photo optional, price/kg, kg available, harvest date; live preview of "what buyers see"), orders-to-fulfil grouped by harvest date with big "Mark harvested" buttons, payouts page with gross/fee/net, verification banner. Phone-first.
- **Accept:** a brand-new farmer can list a crop in < 60 seconds on a phone; cannot edit qty below reserved; sees only own order lines.

### Phase 7 — Courier & Admin
- Courier: today's run (ordered stops), stop detail with address/phone tap-to-call/map link, `PhotoCapture`, big "Picked up"/"Delivered"/"Can't deliver" buttons.
- Admin: KPI dashboard (real: orders, GMV, fee revenue, on-time %, dispute rate, active farms/kitchens, promo cost), verification queue, order board with assign-courier, pooled route builder, dispute resolution, leads inbox, config view, demo-reset.
- **Accept:** full loop works end-to-end using only the UI (see demo script, Section 14). All admin numbers match a hand-computed sample in a test.

### Phase 8 — Trust features
- Notifications (bell + page, unread badge), ratings & reliability, disputes, first-order credit, reroute-to-backup-farmer, audit log viewer (admin).
- **Accept:** each state change notifies the right people; reliability updates; a refund reflects in ledger and payout.

### Phase 9 — Polish & hardening
- Full a11y pass; empty/error/loading audit on **every** screen; copy pass (D14); security checklist (Section 13); performance pass (image sizes, no unused client components, `use client` only where needed); print-friendly order detail; PWA-lite (`manifest.webmanifest`, icons) so farmers can "Add to Home Screen".
- **Accept:** checklist in Section 12 fully ticked.

### Phase 10 — QA, docs, deploy
- Tests (Section 14), `README.md` rewritten (accurate setup with Neon, env, seed, demo accounts), `docs/DEMO_SCRIPT.md`, update `docs/DEFENSE_CHEAT_SHEET.md` with a **"What's real vs simulated"** table, deploy to Vercel with Postgres, add domain, smoke-test production.
- **Accept:** fresh clone → running app in ≤ 5 documented steps; production URL passes the demo script.

---

## 12. Dumb-proof UX checklist (tick every item before Phase 9 ends)

- [ ] Each screen has **one obvious primary button**; secondary actions look secondary.
- [ ] Plain words only ("Harvest listing", "Deliver on", "You'll receive"). No internal jargon or enum names shown to users.
- [ ] Units, ₱, and dates are always visible next to numbers ("₱120 / kg", "Tue 22 Sep, 6–9 AM").
- [ ] Sensible defaults everywhere (earliest delivery date, min qty, saved address, last delivery window).
- [ ] Inline validation with human messages ("Phone should look like 0917 123 4567"), never raw zod errors.
- [ ] Destructive actions (cancel, delete listing, reject) use `ConfirmDialog` that names the consequence.
- [ ] Double-submit impossible (button disables + spinner + idempotency key).
- [ ] Every list has an empty state with the next action ("No orders yet — Browse harvests").
- [ ] Every failure explains what happened and what to do next; Retry works.
- [ ] Progress is visible: order timeline, checkout steps (1 Basket · 2 Delivery · 3 Confirm), verification status.
- [ ] Session expiry redirects to login and returns to the same page.
- [ ] Browser back/refresh never loses a basket or duplicates an action.
- [ ] Works one-handed on a phone; primary actions reachable at the bottom.
- [ ] Number inputs use steppers; phone inputs format themselves; addresses are prefilled.
- [ ] Status is shown with **icon + color + text**.
- [ ] Jargon tooltips only where unavoidable ("Pooled delivery = shared truck, lower fee").
- [ ] Nothing important is hover-only.

---

## 13. Security & privacy checklist

- [ ] All mutations authenticated + role-checked + ownership-checked; no endpoint trusts client prices, IDs, or roles.
- [ ] Passwords bcrypt-hashed; min length 8; login rate-limited; generic "email or password is wrong".
- [ ] `SESSION_SECRET` ≥ 32 chars, required in prod; cookies httpOnly + secure + sameSite.
- [ ] Zod validation on **every** input; max lengths; strip unknown keys.
- [ ] Security headers (CSP reasonable, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`) via `next.config.ts`.
- [ ] No secrets in client bundles (`NEXT_PUBLIC_` only for safe values); `.env` in `.gitignore`.
- [ ] PII minimized: ID/permit stored as last-4 + status; phone/address visible only to parties on the same order + admin.
- [ ] Privacy page states what's collected and why, and how to request deletion (Data Privacy Act, RA 10173).
- [ ] Uploaded photos limited by type & size; no HTML/SVG uploads.
- [ ] Errors never leak stack traces or SQL.
- [ ] Demo endpoints exist **only** when `DEMO_MODE=true`.

---

## 14. Tests, QA, and the demo

**Unit (vitest) — required**
`money` (rounding; parts sum to total) · `commission` · `cutoff` (7:59 PM vs 8:00 PM vs 8:01 PM Manila; month/year boundaries) · `state machine` (every legal and illegal transition) · `permissions matrix` (role × endpoint) · `stock reservation` (concurrent orders) · `idempotency` · `reliability score`.

**Manual QA script (write to `docs/QA_CHECKLIST.md`, run and tick):** 320 / 375 / 768 / 1280 px · light & dark · Chrome, Safari(iOS), Firefox · slow 3G throttle · keyboard-only run · screen-reader spot check · each role's full journey · try to break: empty forms, huge numbers, negative qty, past dates, tampered requests.

**Demo script (`docs/DEMO_SCRIPT.md`) — a 6-minute panel walkthrough**
1. Landing → explain problem & "where every peso goes".
2. Register a new kitchen (or "Try demo: Buyer").
3. Browse → basket from 2 farms → checkout → show cutoff & price breakdown → place order.
4. Switch to Farmer demo → see order → Mark harvested → show payout math (₱2,000 → ₱1,840).
5. Courier demo → picked up (photo) → delivered (photo).
6. Buyer confirms → rates.
7. Admin → KPIs, verification queue, dispute example, "What's real vs simulated".

**Rehearse failure answers** using `docs/DEFENSE_CHEAT_SHEET.md`; keep the doc consistent with what the software actually does.

---

## 15. Deployment

- Neon Postgres: two branches (dev, prod). `DATABASE_URL` via env.
- Vercel: env vars set; `postinstall` runs `prisma generate`; build command `prisma migrate deploy && next build`.
- Domain `uma.xalhexi.wtf`: CNAME `uma` → `cname.vercel-dns.com`.
- After deploy: run the demo script on production; verify `/robots.txt`, `/sitemap.xml`, OG preview, 404 page, HTTPS redirect.

---

## 16. Never do this

- Never present simulated functionality as real. If something is a pilot simplification (D9, D10), say so in the docs and admin config view.
- Never reintroduce localStorage auth, static catalog data, or float money.
- Never add features outside this spec (chat, maps routing, live GPS, live payment gateway, multi-language) — list them under "Future" in `docs/DECISIONS.md` instead.
- Never leave a phase half-done to start a shinier one.
- Never say "done" without listing what you ran and what you saw.

---

## 17. Report format (after every phase)

```
PHASE N — <name>
Built: <bullets, with file paths>
Ran: lint ✅/❌ · typecheck ✅/❌ · test ✅/❌ (N passed) · build ✅/❌
Acceptance checks: <each check → pass/fail + evidence>
Decisions made: <anything added to docs/DECISIONS.md>
Known gaps: <honest list, or "none">
Next: Phase N+1
```

**Start now with Phase 0.**
