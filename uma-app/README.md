# 🌾 UMA Web Application (`uma-app`)

This folder contains the Next.js 16 web application for **UMA** ([uma.xalhexi.wtf](https://uma.xalhexi.wtf)), built with **100% shadcn/ui**, **Tailwind CSS v4**, and **Prisma ORM**.

For complete project documentation, see the [Root README](../README.md).

## Quick Start

```bash
# Install dependencies
npm install

# Setup local database & seed demo data
npx prisma db push
npx tsx prisma/seed.ts

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack
- **Framework**: Next.js 16 (App Router + Turbopack)
- **UI System**: shadcn/ui (Base UI)
- **Styling**: Tailwind CSS v4 + OKLCH Tokens
- **Icons**: Lucide React
- **ORM**: Prisma (SQLite / PostgreSQL)
