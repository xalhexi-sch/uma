# 🌾 UMA — Fresh Farm Food Marketplace

> **Direct farm produce, fresh milk, and eggs delivered straight from Butuan growers.**  
> Zero middleman markups. Fair farmer payouts. Fast local delivery.  
> 🌐 **Live Domain:** [uma.xalhexi.wtf](https://uma.xalhexi.wtf)

---

## ⚡ Highlights

* **100% shadcn/ui Architecture**: Built using standard, reusable components (`Button`, `Card`, `Badge`, `Input`, `Dialog`, `Tabs`, `Avatar`) with custom emerald branding.
* **Flawless Dark & Light Themes**: High-contrast, crystal-clear typography and surfaces matching [ui.shadcn.com](https://ui.shadcn.com).
* **Punchy & Dumb-Proof**: Direct, simple words that customers, farmers, and restaurant managers understand in 2 seconds. Zero academic fluff.
* **Expanded Public Catalog ([`/products`](https://uma.xalhexi.wtf/products))**: Fresh bottled cow's milk (1L glass bottle), free-range farm eggs, native tomatoes, purple eggplant, squash, and garlic with live category filters.
* **1-Click Demo Accounts ([`/login`](https://uma.xalhexi.wtf/login))**: Instant role switching between **Customer / Buyer**, **Farmer / Supplier**, and **Platform Admin**.
* **Interactive Operations Dashboard ([`/dashboard`](https://uma.xalhexi.wtf/dashboard))**: Role-tailored views for tracking live deliveries, listing new crop harvests, and managing corridor dispatch routes.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **UI Library** | [shadcn/ui](https://ui.shadcn.com/) (Base UI primitives) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with OKLCH CSS variables |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Database** | [Prisma ORM](https://www.prisma.io/) (SQLite local, PostgreSQL production ready) |
| **Language** | TypeScript 5 (Strict mode) |

---

## 🚀 Quick Start (Local Setup)

Follow these simple steps to run UMA on your machine:

### 1. Clone the Repository
```bash
git clone https://github.com/xalhexi-sch/uma.git
cd uma/uma-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Initialize the Database
```bash
# Push Prisma schema to local SQLite database
npx prisma db push

# Seed initial growers, buyers, and produce listings
npx tsx prisma/seed.ts
```

### 4. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧑‍💻 1-Click Demo Accounts

Test the platform instantly from the `/login` page or `/dashboard`:

| Role | Email | Profile | Description |
|---|---|---|---|
| 🛒 **Customer / Buyer** | `buyer@uma.ph` | Sampaguita Kitchen | Tracks incoming produce orders, delivery ETA, and item receipts. |
| 🚜 **Farmer / Supplier** | `farmer@uma.ph` | Santos Dairy & Farm | Lists new harvest crops, manages stock quantities, tracks payouts. |
| ⚡ **Platform Admin** | `admin@uma.ph` | Butuan Central Hub | Monitors GMV, route dispatches, and approved supplier partners. |

---

## 📂 Project Structure

```text
uma/
├── UMA_COMPLETE_BLUEPRINT.md    # Full B2B platform architecture specification
├── UMA_DATABASE_SETUP.md        # Prisma database schema documentation
├── UMA_DEFENSE_CHEAT_SHEET.md   # Academic / panel defense objections & responses
├── UMA_EXECUTIVE_SUMMARY.md     # 2-page platform executive summary
├── uma-logo-green.png           # Official UMA brand logo
├── uma-favicon.png              # Favicon asset
└── uma-app/                     # Next.js web application
    ├── prisma/
    │   ├── schema.prisma        # 11 relational models (Farmer, Listing, Order, Delivery)
    │   └── seed.ts              # Demo seed data for Butuan pilot
    ├── public/                  # Favicons and static assets
    └── src/
        ├── app/
        │   ├── layout.tsx       # Root layout with ThemeProvider & fonts
        │   ├── page.tsx         # Consumer landing page & quick order modal
        │   ├── globals.css      # OKLCH color system & Tailwind v4 config
        │   ├── products/        # Public catalog with category filters
        │   ├── login/           # 1-click role authentication
        │   ├── dashboard/       # Multi-role dashboard (Buyer, Farmer, Admin)
        │   └── api/             # REST endpoints (/api/listings, /api/orders, /api/stats)
        ├── components/
        │   └── ui/              # shadcn/ui components (button, card, dialog, badge, input)
        ├── context/
        │   └── ThemeContext.tsx # Persistent light/dark mode provider
        └── lib/
            ├── auth.ts          # Mock session store for 1-click demo accounts
            ├── catalog.ts       # Product catalog dataset & categories
            ├── prisma.ts        # Prisma Client singleton
            └── utils.ts         # Standard cn() class merging utility
```

---

## 🌐 Deploy to Production (`uma.xalhexi.wtf`)

UMA is optimized for one-click deployment on **Vercel**:

1. Push this repository to GitHub: `xalhexi-sch/uma`
2. Import project in [Vercel](https://vercel.com/new).
3. Set **Root Directory** to `uma-app`.
4. Set build command to `npm run build`.
5. Add Custom Domain: `uma.xalhexi.wtf`.
6. Add DNS CNAME record in your domain registrar pointing `uma` to `cname.vercel-dns.com`.

---

## 📄 License

MIT © 2026 [xalhexi-sch](https://github.com/xalhexi-sch) • UMA Agricultural B2B Marketplace Platform
