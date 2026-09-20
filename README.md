<div align="center">

<img src="public/uma-logo-green.png" alt="UMA Logo" width="110" height="110" />

# UMA — B2B Agricultural Marketplace
### Scheduled Farm-Fresh Produce for Commercial Kitchens

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.5-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)
[![Prisma 6](https://img.shields.io/badge/Prisma-6.4-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-5.0-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

**Connecting Butuan-area smallholder farmers directly with commercial kitchens, carinderias, canteens, and restaurants.**  
*Transparent 8% platform fee · Zero bagsakan markups · Harvest-to-order scheduling · Photo-verified proof on delivery.*

[🌐 Live Production](https://uma.xalhexi.wtf) • [📖 Architecture Blueprint](docs/BLUEPRINT.md) • [📋 Product Decisions](docs/DECISIONS.md) • [🛡️ Defense Package](docs/DEFENSE_CHEAT_SHEET.md)

---

</div>

## 📌 Executive Overview

**UMA** is a purpose-built B2B agricultural forward-order platform designed for the commercial food ecosystem of Butuan City and Agusan del Norte, Philippines. 

Traditional produce supply chains subject smallholder farmers to volatile farmgate pricing (losing 20–30% to multi-tier middlemen) while commercial kitchens endure unpredictable supply, erratic pricing, and morning market chaos. UMA replaces speculative harvest with **harvest-to-order forward scheduling** and **pooled logistics**.

### The Core Loop
```
Farmer lists upcoming harvest
          │
          ▼
Kitchen orders basket before 8:00 PM Manila cutoff
          │
          ▼
Farmer harvests only confirmed quantities at dawn
          │
          ▼
UMA Courier picks up & delivers with photo proof
          │
          ▼
Kitchen confirms order → Farmer receives net payout (gross − 8% fee)
```

---

## ⚡ Key Platform Capabilities

- **Strict B2B Model**: Built for commercial food buyers (carinderias, canteens, hotel resorts, catering kitchens) ordering recurring volume.
- **Harvest-to-Order Model**: Farmers harvest only what has been paid/confirmed by kitchens before the 8:00 PM cutoff, eliminating field spoilage.
- **Transparent Unit Economics**: Fixed **8% platform commission** with clear breakdowns (e.g. ₱2,000 basket → ₱1,840 farmer net payout + ₱160 UMA fee + ₱100/₱150 delivery fee).
- **Integer Centavos Accounting**: All financial data stored as integer centavos (`Int`) to prevent IEEE-754 floating-point rounding defects.
- **Multi-Role Security & Cryptographic Auth**: Role-based access control (`BUYER`, `FARMER`, `COURIER`, `ADMIN`) backed by `bcryptjs`, signed `httpOnly` session cookies via `jose`, and server-side route guards.
- **Photo-Verified Custody Chain**: Camera & file capture with automatic client-side JPEG optimization (≤1024px, q≈0.7, ≤250 KB) stored on every pickup and drop-off.
- **Manila Timezone Cutoff Engine**: Automated delivery slot calculator enforcing the 8:00 PM `Asia/Manila` deadline for next-day 6:00–9:00 AM delivery.
- **60-30-10 Design System**: Restrained, accessible interface utilizing Warm Neutral surfaces (60%), Brand Forest Green (30%), and Harvest Amber CTA highlights (10%).

---

## 🛠️ Architecture & Tech Stack

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js 16 (App Router)                  │
│   React 19 · Tailwind CSS v4 · OKLCH Theme · shadcn/ui       │
├──────────────────────────────┬──────────────────────────────┤
│      Server Components       │      API Route Handlers      │
│    (Direct Server Reads)     │ (apiHandler + Zod + jose Auth)│
├──────────────────────────────┴──────────────────────────────┤
│                   Prisma ORM 6 (PostgreSQL)                 │
│    11 Relational Models · Typed Enums · Centavo Ledger      │
└─────────────────────────────────────────────────────────────┘
```

| Layer | Technology | Details |
|---|---|---|
| **Framework** | [Next.js 16.3](https://nextjs.org/) | App Router, Turbopack, React 19 Server Components |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict mode typing across client, server, and tests |
| **Database** | [PostgreSQL (Neon)](https://neon.tech/) | Managed serverless relational PostgreSQL |
| **ORM** | [Prisma ORM 6.4](https://www.prisma.io/) | Typed schemas, enums, migrations, and seed scripts |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Native CSS variables, OKLCH palette, dark/light theme |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) | Base UI primitives with high-contrast accessibility |
| **Authentication** | [jose](https://github.com/panva/jose) + [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Signed `httpOnly` JWT session cookies, password hashing |
| **Validation** | [Zod 4](https://zod.dev/) | Strict runtime schemas shared between API and forms |
| **Testing** | [Vitest 5](https://vitest.dev/) | Unit test suite for money math, cutoffs, and role guards |

---

## 👥 Four-Role System & Demo Accounts

When `DEMO_MODE=true`, pre-seeded demo accounts allow instant evaluation of every user journey:

| Role | Demo Email | Password | Persona & Responsibility |
|---|---|---|---|
| 🛒 **BUYER** | `buyer@uma.ph` | `umaDemo2026!` | **Kusina Butuan Carinderia**<br>Browses harvests, manages basket, places forward orders, tracks live runs, rates farmers/couriers. |
| 🚜 **FARMER** | `farmer@uma.ph` | `umaDemo2026!` | **Mang Juan dela Cruz (Antongalon)**<br>Lists harvest batches, views orders to harvest, marks crops ready, inspects gross/commission/net payouts. |
| 🚚 **COURIER** | `courier@uma.ph` | `umaDemo2026!` | **Kuya Jun (Motorcycle Dispatch)**<br>Mobile-optimized run sheet, turn-by-turn stops, photo proof capture on pickup & delivery. |
| 🛡️ **ADMIN** | `admin@uma.ph` | `umaDemo2026!` | **UMA Operations Lead**<br>Verifies farm/business credentials, builds pooled delivery routes, manages disputes, monitors real GMV. |

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js `20.x` or later
- npm `10.x` or later
- PostgreSQL database instance (local PostgreSQL or cloud [Neon](https://neon.tech))

### 1. Clone & Install
```bash
git clone https://github.com/xalhexi-sch/uma.git
cd uma
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and set your credentials:
```bash
cp .env.example .env
```

```env
DATABASE_URL="postgresql://user:password@localhost:5432/uma?schema=public"
SESSION_SECRET="uma-production-session-secret-at-least-32-chars-long"
DEMO_MODE="true"
DEMO_PASSWORD="umaDemo2026!"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
FIRST_ORDER_DELIVERY_CREDIT="true"
```

### 3. Initialize & Seed Database
Run the idempotent database migration and seed script:
```bash
# Push schema and populate rich seed data
npm run db:reset
# or run individually:
# npm run db:migrate
# npm run db:seed
```

### 4. Run Test Suite
```bash
npm test
```

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application or [http://localhost:3000/dev/ui](http://localhost:3000/dev/ui) to inspect the design system gallery.

---

## 📊 Business Rules & Economics

```
Produce Subtotal     = Σ (Listing Price × Quantity)
Platform Commission  = Produce Subtotal × 8% (Deducted from farmer gross)
Farmer Net Payout    = Produce Subtotal − Platform Commission
Buyer Order Total    = Produce Subtotal + Delivery Fee (₱150 Direct / ₱100 Pooled) − Discount
```

- **Cutoff Rules**: Orders before 8:00 PM Manila deliver next morning (6:00–9:00 AM). Orders after 8:00 PM schedule for day-after-tomorrow.
- **Proof Storage**: Photos are resized client-side to ≤1024px JPEG and stored as base64 data URLs for pilot simplicity.
- **No Float Money**: Every monetary figure is calculated in Philippine Centavos (₱1.00 = 100 centavos) with half-up rounding.

---

## 📂 Repository Layout

```text
uma/
├── docs/                        # Specifications, architecture, & defense packages
│   ├── BLUEPRINT.md             # Complete business model & operational spec
│   ├── DECISIONS.md             # Architectural & engineering decisions log (D1–D16)
│   ├── DEFENSE_CHEAT_SHEET.md   # Oral defense objections & defensible responses
│   └── EXECUTIVE_SUMMARY.md     # 2-page platform executive summary
├── prisma/
│   ├── schema.prisma            # PostgreSQL schema with 11 relational models
│   └── seed.ts                  # Idempotent seed data across all 8 order statuses
├── public/                      # Brand assets, logos, and icons
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (public)             # Marketing, explainer, catalog & lead pages
│   │   ├── api/                 # Secure Route Handlers with apiHandler
│   │   ├── dashboard/           # Role-based protected operational dashboards
│   │   ├── dev/ui/              # Interactive design system component gallery
│   │   ├── globals.css          # OKLCH 60-30-10 color tokens & Tailwind v4
│   │   ├── layout.tsx           # Root layout with ThemeProvider & Toaster
│   │   ├── loading.tsx          # Global skeleton loader
│   │   ├── error.tsx            # Global error boundary with retry
│   │   └── not-found.tsx        # 404 recovery view
│   ├── components/
│   │   ├── navigation/          # AppShell, PublicHeader, PublicFooter, ThemeToggle
│   │   ├── shared/              # StatusBadge, MoneyText, DateText, PhotoCapture, etc.
│   │   └── ui/                  # Base UI / shadcn primitives
│   ├── lib/                     # Config, dates, money math, env validation
│   └── server/                  # Auth session cookies, API handlers, role guards
├── tests/                       # Vitest unit test suite (money, cutoff, permissions)
├── UMA_MASTER_SPEC.md           # Single source of truth master specification
├── next.config.ts               # Next.js configuration & security headers
├── package.json                 # Scripts and dependencies
└── tsconfig.json                # TypeScript configuration
```

---

## 🛡️ Documentation & Defense Package

For project evaluation, technical audits, and panel presentations, refer to the documentation suite in [`docs/`](docs/):

- [`UMA_MASTER_SPEC.md`](UMA_MASTER_SPEC.md) — Single source of truth master spec covering all 10 engineering phases.
- [`docs/DECISIONS.md`](docs/DECISIONS.md) — Architecture decision records (D1–D16).
- [`docs/DEFENSE_CHEAT_SHEET.md`](docs/DEFENSE_CHEAT_SHEET.md) — Rigorous Q&A addressing logistics risk, farmer adoption, and unit economics.
- [`docs/EXECUTIVE_SUMMARY.md`](docs/EXECUTIVE_SUMMARY.md) — Commercial and operational overview.

---

## 📄 License

MIT © 2026 [xalhexi-sch](https://github.com/xalhexi-sch) • UMA Agricultural B2B Marketplace Platform
