# 🌾 UMA — Fresh Farm Food Marketplace

<div align="center">

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4.0-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-100%25-black?style=for-the-badge&logo=shadcnui)](https://ui.shadcn.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-6.4-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

**Direct farm produce, fresh milk, and eggs delivered straight from Butuan growers.**  
Zero middleman markups. Fair farmer payouts. Fast local delivery.

🌐 **Production Domain:** [uma.xalhexi.wtf](https://uma.xalhexi.wtf)

</div>

---

## ⚡ Core Features

- **100% shadcn/ui Architecture**: Built using official shadcn components (`Button`, `Card`, `Badge`, `Input`, `Dialog`, `Tabs`, `Avatar`) with custom emerald branding.
- **Flawless Dark & Light Themes**: High-contrast, crystal-clear typography and card surfaces matching [ui.shadcn.com](https://ui.shadcn.com).
- **Dumb-Proof Copy**: Direct, punchy messaging that customers, farmers, and restaurant managers understand in 2 seconds. Zero academic fluff.
- **Public Produce Catalog ([`/products`](https://uma.xalhexi.wtf/products))**: Fresh bottled cow milk (1L glass bottle), free-range farm eggs, native tomatoes, purple eggplant, squash, and garlic with category filters and quick order modals.
- **1-Click Demo Accounts ([`/login`](https://uma.xalhexi.wtf/login))**: Instant sign-in for **Customer / Buyer**, **Farmer / Supplier**, and **Platform Admin**.
- **Interactive Operations Dashboard ([`/dashboard`](https://uma.xalhexi.wtf/dashboard))**: Live dispatch tracking, crop listing manager, and platform revenue metrics.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router + Turbopack) |
| **Component Library** | [shadcn/ui](https://ui.shadcn.com/) (Base UI primitives) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + OKLCH CSS Variables |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Database & ORM** | [Prisma ORM](https://www.prisma.io/) (SQLite local, PostgreSQL production) |
| **Language** | TypeScript 5 (Strict mode) |

---

## 🚀 Quick Start (Local Setup)

Get UMA running locally in under 60 seconds:

### 1. Clone the Repository
```bash
git clone https://github.com/xalhexi-sch/uma.git
cd uma
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Initialize the Database
```bash
# Push Prisma schema to local database
npx prisma db push

# Seed demo growers, buyers, and produce listings
npx tsx prisma/seed.ts
```

### 4. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧑‍💻 1-Click Demo Accounts

Test the platform instantly from the `/login` page:

| Role | Demo Email | Profile | Description |
|---|---|---|---|
| 🛒 **Customer / Buyer** | `buyer@uma.ph` | Sampaguita Kitchen | Tracks incoming produce orders, delivery ETA, and item receipts. |
| 🚜 **Farmer / Supplier** | `farmer@uma.ph` | Santos Dairy & Farm | Lists new harvest crops, manages stock quantities, tracks payouts. |
| ⚡ **Platform Admin** | `admin@uma.ph` | Butuan Central Hub | Monitors GMV, route dispatches, and approved supplier partners. |

---

## 📂 Repository Structure

```text
uma/
├── docs/                        # Architecture, database schema, & defense package
│   ├── BLUEPRINT.md             # Complete platform specification
│   ├── DATABASE_SETUP.md        # Prisma database schema documentation
│   ├── DEFENSE_CHEAT_SHEET.md   # Oral defense objections & responses
│   └── EXECUTIVE_SUMMARY.md     # 2-page platform executive summary
├── prisma/
│   ├── schema.prisma            # 11 relational models (Farmer, Listing, Order, Delivery)
│   └── seed.ts                  # Pilot seed data for Butuan City
├── public/                      # Brand logos, icons, and static assets
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout with ThemeProvider & Geist font
│   │   ├── page.tsx             # Landing page with hero & popular items
│   │   ├── globals.css          # OKLCH color system & Tailwind v4 config
│   │   ├── products/            # Public produce catalog with search & filters
│   │   ├── login/               # 1-click role authentication
│   │   ├── dashboard/           # Multi-role dashboard (Buyer, Farmer, Admin)
│   │   └── api/                 # REST endpoints (/api/listings, /api/orders, /api/stats)
│   ├── components/
│   │   └── ui/                  # shadcn/ui components (button, card, dialog, badge, input)
│   ├── context/
│   │   └── ThemeContext.tsx     # Theme provider (syncs dark/light to localStorage)
│   └── lib/
│       ├── auth.ts              # Session store for 1-click demo accounts
│       ├── catalog.ts           # Product catalog dataset & categories
│       ├── prisma.ts            # Prisma Client singleton
│       └── utils.ts             # Standard cn() class merging utility
├── .env.example                 # Environment variables template
├── components.json              # shadcn/ui configuration
├── next.config.ts               # Next.js configuration
├── package.json                 # Dependencies & project scripts
└── tsconfig.json                # TypeScript configuration
```

---

## 🌐 Deploy to Production (`uma.xalhexi.wtf`)

UMA is optimized for zero-config deployment on **Vercel**:

1. Push your repository to GitHub: `xalhexi-sch/uma`
2. Import project in [Vercel](https://vercel.com/new).
3. Vercel automatically detects **Next.js** at the root.
4. Click **Deploy**.
5. Under **Settings > Domains**, add `uma.xalhexi.wtf`.
6. Configure DNS CNAME record pointing `uma` to `cname.vercel-dns.com`.

---

## 📄 License

MIT © 2026 [xalhexi-sch](https://github.com/xalhexi-sch) • UMA Agricultural B2B Marketplace Platform
