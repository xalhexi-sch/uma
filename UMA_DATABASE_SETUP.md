# UMA Database Setup Guide
## Prisma + PostgreSQL Schema with Sample Data

---

## Quick Start

### Prerequisites
```bash
npm install @prisma/client
npm install prisma --save-dev
npm install dotenv
```

### Environment Setup (`.env`)
```
DATABASE_URL="postgresql://user:password@localhost:5432/uma_db"
```

### Initialize Prisma
```bash
npx prisma init
npx prisma migrate dev --name init
```

---

## Prisma Schema (`schema.prisma`)

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ===== CORE MODELS =====

model Farmer {
  id            Int       @id @default(autoincrement())
  name          String
  email         String    @unique
  phone         String
  barangay      String    // La Paz, Buenavista, etc.
  idType        String    // "Drivers License", "Passport", etc.
  idNumber      String
  verifiedAt    DateTime?
  reliabilityScore Float @default(5.0) // 1-5 stars
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  listings      Listing[]
  ratings       Rating[]  @relation("RatingToFarmer")
  deliveries    Delivery[]
}

model Listing {
  id            Int       @id @default(autoincrement())
  farmerId      Int
  crop          String    // "Eggplant", "Tomatoes", etc.
  harvestDate   DateTime  // When farmer expects to harvest
  estimatedQty  Float     // kg
  price         Float     // per kg
  status        String    @default("active") // active, sold_out, cancelled
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  farmer        Farmer    @relation(fields: [farmerId], references: [id], onDelete: Cascade)
  orderItems    OrderItem[] @relation("ListingToOrderItem")

  @@index([farmerId])
  @@index([harvestDate])
}

model Business {
  id            Int       @id @default(autoincrement())
  name          String
  email         String    @unique
  phone         String
  address       String
  barangay      String    // Delivery location
  permitNo      String    // DTI/BIR registration
  permitType    String    // "DTI", "BIR", "Business Permit"
  verifiedAt    DateTime?
  reliabilityScore Float @default(5.0)
  creditTermsDays Int @default(0) // 0 = pay-on-delivery, 7+ = trade credit
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  orders        Order[]
  ratings       Rating[]  @relation("RatingToBusiness")
}

model Order {
  id            Int       @id @default(autoincrement())
  businessId    Int
  cutoffWindow  DateTime  // When order deadline is
  status        String    @default("pending") // pending, confirmed, harvested, picked_up, delivered, disputed, completed
  paymentStatus String    @default("unpaid") // unpaid, paid, refunded
  totalValue    Float     @default(0)
  deliveryFee   Float     @default(150) // ₱150 default for MVP
  deliveryType  String    @default("one-to-one") // one-to-one or pooled
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  business      Business   @relation(fields: [businessId], references: [id], onDelete: Cascade)
  orderItems    OrderItem[]
  delivery      Delivery?
  dispute       Dispute?
  ratings       Rating[]   @relation("RatingToOrder")

  @@index([businessId])
  @@index([status])
}

model OrderItem {
  id            Int       @id @default(autoincrement())
  orderId       Int
  listingId     Int
  qtyRequested  Float     // kg
  priceAtOrder  Float     // Price locked at order time
  status        String    @default("confirmed") // confirmed, fulfilled, cancelled, rerouted
  createdAt     DateTime  @default(now())

  order         Order      @relation(fields: [orderId], references: [id], onDelete: Cascade)
  listing       Listing    @relation("ListingToOrderItem", fields: [listingId], references: [id], onDelete: Restrict)

  @@unique([orderId, listingId]) // One listing per order
  @@index([orderId])
  @@index([listingId])
}

model Courier {
  id            Int       @id @default(autoincrement())
  name          String
  email         String    @unique
  phone         String
  vehicleType   String    // "motorcycle", "tricycle", "van"
  licensePlate  String
  licenseNo     String    // Driver's license
  verifiedAt    DateTime?
  reliabilityScore Float @default(5.0)
  totalDeliveries Int @default(0)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  deliveries    Delivery[]
  ratings       Rating[]   @relation("RatingToCourier")
}

model Delivery {
  id            Int       @id @default(autoincrement())
  orderId       Int       @unique
  courierId     Int
  routeId       Int?      // NULL if one-to-one, references Route if pooled
  pickupTime    DateTime?
  deliveryTime  DateTime?
  pickupProof   String?   // URL to photo
  deliveryProof String?   // URL to photo
  status        String    @default("pending") // pending, picked_up, in_transit, delivered, failed
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  order         Order      @relation(fields: [orderId], references: [id], onDelete: Cascade)
  courier       Courier    @relation(fields: [courierId], references: [id])
  route         Route?     @relation(fields: [routeId], references: [id], onDelete: SetNull)

  @@index([courierId])
  @@index([status])
}

model Route {
  id            Int       @id @default(autoincrement())
  date          DateTime
  type          String    @default("pooled") // pooled or one-to-one
  barangayFrom  String    // Farming barangay
  barangayTo    String    // Destination barangay
  createdAt     DateTime  @default(now())

  deliveries    Delivery[]
}

model Rating {
  id            Int       @id @default(autoincrement())
  orderId       Int
  fromType      String    // "farmer", "business", "courier"
  toType        String    // What is being rated
  toFarmerId    Int?
  toBusinessId  Int?
  toCourierId   Int?
  score         Float     // 1-5
  comment       String?
  createdAt     DateTime  @default(now())

  order         Order      @relation("RatingToOrder", fields: [orderId], references: [id], onDelete: Cascade)
  farmer        Farmer?    @relation("RatingToFarmer", fields: [toFarmerId], references: [id], onDelete: SetNull)
  business      Business?  @relation("RatingToBusiness", fields: [toBusinessId], references: [id], onDelete: SetNull)
  courier       Courier?   @relation("RatingToCourier", fields: [toCourierId], references: [id], onDelete: SetNull)

  @@index([orderId])
  @@index([fromType])
}

model Dispute {
  id            Int       @id @default(autoincrement())
  orderId       Int       @unique
  raisedBy      String    // "farmer", "business"
  description   String
  status        String    @default("open") // open, under_review, resolved
  resolution    String?   // How it was resolved
  refundAmount  Float     @default(0)
  evidence      String?   // URL to photo evidence
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  order         Order      @relation(fields: [orderId], references: [id], onDelete: Cascade)

  @@index([status])
}

// ===== ANALYTICS / TRACKING =====

model Transaction {
  id            Int       @id @default(autoincrement())
  orderId       Int
  type          String    // "commission", "delivery_fee", "refund", "payout"
  amount        Float
  status        String    @default("pending") // pending, completed, failed
  createdAt     DateTime  @default(now())

  @@index([orderId])
}
```

---

## Sample Data Insert (`seed.ts`)

Save this as `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (careful in production!)
  await prisma.rating.deleteMany();
  await prisma.dispute.deleteMany();
  await prisma.delivery.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.farmer.deleteMany();
  await prisma.business.deleteMany();
  await prisma.courier.deleteMany();
  await prisma.route.deleteMany();

  console.log('✓ Cleared all tables');

  // ===== FARMERS =====
  const farmer1 = await prisma.farmer.create({
    data: {
      name: 'Mr. Santos',
      email: 'santos@farm.local',
      phone: '+63917123456',
      barangay: 'La Paz',
      idType: 'Drivers License',
      idNumber: 'DL-2023-001',
      verifiedAt: new Date(),
      reliabilityScore: 4.8,
    },
  });

  const farmer2 = await prisma.farmer.create({
    data: {
      name: 'Mrs. Cruz',
      email: 'cruz@farm.local',
      phone: '+63917234567',
      barangay: 'Buenavista',
      idType: 'Passport',
      idNumber: 'PP-2022-456',
      verifiedAt: new Date(),
      reliabilityScore: 4.9,
    },
  });

  const farmer3 = await prisma.farmer.create({
    data: {
      name: 'Mr. Reyes',
      email: 'reyes@farm.local',
      phone: '+63917345678',
      barangay: 'La Paz',
      idType: 'National ID',
      idNumber: 'NID-2021-789',
      verifiedAt: new Date(),
      reliabilityScore: 4.5,
    },
  });

  console.log('✓ Created 3 farmers');

  // ===== LISTINGS =====
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);

  const listing1 = await prisma.listing.create({
    data: {
      farmerId: farmer1.id,
      crop: 'Eggplant',
      harvestDate: tomorrow,
      estimatedQty: 40,
      price: 80,
      status: 'active',
    },
  });

  const listing2 = await prisma.listing.create({
    data: {
      farmerId: farmer2.id,
      crop: 'Tomatoes',
      harvestDate: tomorrow,
      estimatedQty: 25,
      price: 120,
      status: 'active',
    },
  });

  const listing3 = await prisma.listing.create({
    data: {
      farmerId: farmer3.id,
      crop: 'Squash',
      harvestDate: dayAfter,
      estimatedQty: 30,
      price: 60,
      status: 'active',
    },
  });

  console.log('✓ Created 3 listings');

  // ===== BUSINESSES =====
  const business1 = await prisma.business.create({
    data: {
      name: 'Sampaguita Carinderia',
      email: 'sampaguita@carinderia.local',
      phone: '+63825551234',
      address: 'Poblacion St., Butuan City',
      barangay: 'Butuan Proper',
      permitNo: 'DTI-2023-0001',
      permitType: 'DTI',
      verifiedAt: new Date(),
      reliabilityScore: 4.7,
    },
  });

  const business2 = await prisma.business.create({
    data: {
      name: 'Butuan Resort & Restaurant',
      email: 'resort@butuan.local',
      phone: '+63825552345',
      address: 'Maharlika Ave., Butuan City',
      barangay: 'Butuan Proper',
      permitNo: 'BIR-2023-0045',
      permitType: 'BIR',
      verifiedAt: new Date(),
      reliabilityScore: 4.9,
      creditTermsDays: 7, // Premium account with 7-day credit
    },
  });

  console.log('✓ Created 2 businesses');

  // ===== ORDERS =====
  const cutoffTime = new Date();
  cutoffTime.setHours(20, 0, 0); // 8pm cutoff

  const order1 = await prisma.order.create({
    data: {
      businessId: business1.id,
      cutoffWindow: cutoffTime,
      status: 'confirmed',
      paymentStatus: 'unpaid',
      totalValue: 2000,
      deliveryFee: 150,
      deliveryType: 'one-to-one',
    },
  });

  const order2 = await prisma.order.create({
    data: {
      businessId: business2.id,
      cutoffWindow: cutoffTime,
      status: 'confirmed',
      paymentStatus: 'unpaid',
      totalValue: 5400,
      deliveryFee: 200,
      deliveryType: 'pooled',
    },
  });

  console.log('✓ Created 2 orders');

  // ===== ORDER ITEMS (linking orders to listings) =====
  await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      listingId: listing1.id,
      qtyRequested: 25, // 25kg of eggplant
      priceAtOrder: 80,
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      listingId: listing1.id,
      qtyRequested: 15,
      priceAtOrder: 80,
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      listingId: listing2.id,
      qtyRequested: 20,
      priceAtOrder: 120,
    },
  });

  console.log('✓ Created 3 order items');

  // ===== COURIERS =====
  const courier1 = await prisma.courier.create({
    data: {
      name: 'Mang Rodel',
      email: 'rodel@courier.local',
      phone: '+63917456789',
      vehicleType: 'motorcycle',
      licensePlate: 'ABC-1234',
      licenseNo: 'DL-2023-RODEL',
      verifiedAt: new Date(),
      reliabilityScore: 4.6,
      totalDeliveries: 87,
    },
  });

  console.log('✓ Created 1 courier');

  // ===== DELIVERIES =====
  const delivery1 = await prisma.delivery.create({
    data: {
      orderId: order1.id,
      courierId: courier1.id,
      status: 'pending',
    },
  });

  console.log('✓ Created 1 delivery (pending)');

  // ===== ROUTE =====
  const route1 = await prisma.route.create({
    data: {
      date: tomorrow,
      type: 'pooled',
      barangayFrom: 'La Paz',
      barangayTo: 'Butuan Proper',
    },
  });

  console.log('✓ Created 1 route');

  console.log('\n✅ Seed complete!');
  console.log(`- Farmers: 3`);
  console.log(`- Listings: 3`);
  console.log(`- Businesses: 2`);
  console.log(`- Orders: 2`);
  console.log(`- Couriers: 1`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### Run Seed
```bash
npx prisma db seed
```

---

## Sample API Routes (Next.js)

### Get all available products (`pages/api/listings.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const listings = await prisma.listing.findMany({
    where: { status: 'active' },
    include: {
      farmer: {
        select: { name: true, barangay: true, reliabilityScore: true },
      },
    },
    orderBy: { harvestDate: 'asc' },
  });

  return NextResponse.json(listings);
}
```

### Create an order (`pages/api/orders.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { businessId, items } = await request.json(); // items = [{listingId, qty}, ...]

  const order = await prisma.order.create({
    data: {
      businessId,
      cutoffWindow: new Date(Date.now() + 24 * 60 * 60 * 1000),
      totalValue: items.reduce((sum: number, item: any) => sum + (item.qty * item.price), 0),
      status: 'pending',
    },
  });

  // Add order items
  for (const item of items) {
    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        listingId: item.listingId,
        qtyRequested: item.qty,
        priceAtOrder: item.price,
      },
    });
  }

  return NextResponse.json(order);
}
```

### Get business orders (`pages/api/business/[id]/orders.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const orders = await prisma.order.findMany({
    where: { businessId: parseInt(params.id) },
    include: {
      orderItems: {
        include: {
          listing: {
            include: { farmer: { select: { name: true } } },
          },
        },
      },
      delivery: true,
      dispute: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(orders);
}
```

---

## Key Queries You'll Need

### Check farmer's upcoming listings
```typescript
const farmerListings = await prisma.listing.findMany({
  where: {
    farmerId,
    harvestDate: { gte: new Date() }, // Future only
    status: 'active',
  },
});
```

### Check order status
```typescript
const order = await prisma.order.findUnique({
  where: { id: orderId },
  include: {
    orderItems: { include: { listing: { include: { farmer: true } } } },
    delivery: { include: { courier: true } },
    dispute: true,
  },
});
```

### Get farmer's reliability score trend
```typescript
const farmerRatings = await prisma.rating.findMany({
  where: { toFarmerId: farmerId },
  select: { score: true, createdAt: true },
  orderBy: { createdAt: 'desc' },
  take: 20,
});

const avgScore = farmerRatings.reduce((sum, r) => sum + r.score, 0) / farmerRatings.length;
```

### Auto-reroute on farm cancellation
```typescript
// 1. Find all OrderItems for this listing
const orderItems = await prisma.orderItem.findMany({
  where: { listingId },
  include: { order: true },
});

// 2. For each OrderItem, find a backup listing (same crop, same harvest date)
for (const item of orderItems) {
  const backup = await prisma.listing.findFirst({
    where: {
      crop: item.listing.crop,
      harvestDate: item.listing.harvestDate,
      status: 'active',
      id: { not: listingId }, // NOT the cancelled listing
    },
  });

  if (backup) {
    // Update OrderItem to new listing
    await prisma.orderItem.update({
      where: { id: item.id },
      data: { listingId: backup.id, status: 'rerouted' },
    });
  } else {
    // No backup — cancel the order
    await prisma.order.update({
      where: { id: item.orderId },
      data: { status: 'cancelled' },
    });
  }
}
```

---

## Deployment (Optional: Railway, Render, or Neon)

### Quick deploy to Neon (PostgreSQL)
1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Copy connection string
4. Update `.env`:
   ```
   DATABASE_URL="postgresql://[neon-connection-string]"
   ```
5. Run migrations:
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

---

## Test Data Queries

### See all farmers with reliability > 4.5
```typescript
const topFarmers = await prisma.farmer.findMany({
  where: { reliabilityScore: { gte: 4.5 } },
});
```

### See pending orders from last 24 hours
```typescript
const recentOrders = await prisma.order.findMany({
  where: {
    status: 'pending',
    createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
  },
});
```

### See disputes that need resolution
```typescript
const openDisputes = await prisma.dispute.findMany({
  where: { status: 'open' },
  include: { order: true },
});
```

---

## Notes

- **Reliability scores** are calculated on a rolling basis from `Rating` records; update `Farmer.reliabilityScore` after each new rating
- **Inventory** decreases on `OrderItem.status === "confirmed"`, not on listing browse
- **Payment** is released to farmer on `Delivery.status === "delivered"`
- **Disputes** are resolved by admin, reflected in `Dispute.resolution` and `Dispute.refundAmount`

This is enough to get MVP running. Avoid over-engineering until real data proves you need it.
