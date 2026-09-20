import { PrismaClient, Role, VerificationStatus, ListingStatus, OrderStatus, PaymentStatus, DeliveryStatus, DeliveryType, DisputeStatus, TxStatus, LeadType, Unit } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding UMA PostgreSQL database...');

  const demoPassword = process.env.DEMO_PASSWORD || 'umaDemo2026!';
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(demoPassword, salt);

  // 1. Clear existing data in reverse dependency order for idempotency
  await prisma.notification.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.payout.deleteMany();
  await prisma.dispute.deleteMany();
  await prisma.rating.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.delivery.deleteMany();
  await prisma.route.deleteMany();
  await prisma.order.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.user.deleteMany();
  await prisma.courier.deleteMany();
  await prisma.business.deleteMany();
  await prisma.farmer.deleteMany();
  await prisma.lead.deleteMany();

  console.log('  Cleaned old records');

  // 2. Create Admin
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@uma.ph',
      name: 'UMA Operations Admin',
      phone: '+63 917 100 0001',
      passwordHash,
      role: Role.ADMIN,
      verificationStatus: VerificationStatus.VERIFIED,
    },
  });

  // 3. Create Farmers (8 farmers, 7 verified, 1 pending)
  const farmerData = [
    { name: 'Mang Juan dela Cruz', email: 'farmer@uma.ph', barangay: 'Antongalon', phone: '+63 917 200 0001', score: 4.9, verified: true, idType: 'National ID', last4: '8821' },
    { name: 'Tatay Ramon Bautista', email: 'ramon.bautista@uma.ph', barangay: 'Los Angeles', phone: '+63 917 200 0002', score: 4.8, verified: true, idType: "Driver's License", last4: '4192' },
    { name: 'Elena Santos', email: 'elena.santos@uma.ph', barangay: 'Baan', phone: '+63 917 200 0003', score: 5.0, verified: true, idType: 'PhilHealth ID', last4: '7723' },
    { name: 'Pedro Morales', email: 'pedro.morales@uma.ph', barangay: 'Libertad', phone: '+63 917 200 0004', score: 4.7, verified: true, idType: 'National ID', last4: '1092' },
    { name: 'Gloria Mendoza', email: 'gloria.mendoza@uma.ph', barangay: 'Taguibo', phone: '+63 917 200 0005', score: 4.6, verified: true, idType: 'Voter ID', last4: '3819' },
    { name: 'Lito Carpio', email: 'lito.carpio@uma.ph', barangay: 'Ampayon', phone: '+63 917 200 0006', score: 4.9, verified: true, idType: 'National ID', last4: '6271' },
    { name: 'Carmela Ramos', email: 'carmela.ramos@uma.ph', barangay: 'Doongan', phone: '+63 917 200 0007', score: 4.8, verified: true, idType: "Driver's License", last4: '9920' },
    { name: 'Bernardo Ocampo', email: 'bernardo.ocampo@uma.ph', barangay: 'Pigdaulan', phone: '+63 917 200 0008', score: 5.0, verified: false, idType: 'National ID', last4: '5512' }, // Unverified
  ];

  const farmers = [];
  for (const f of farmerData) {
    const farmer = await prisma.farmer.create({
      data: {
        name: f.name,
        email: f.email,
        phone: f.phone,
        barangay: f.barangay,
        addressText: `Purok 4, Brgy. ${f.barangay}, Butuan City`,
        idType: f.idType,
        idLast4: f.last4,
        verificationStatus: f.verified ? VerificationStatus.VERIFIED : VerificationStatus.PENDING,
        verifiedAt: f.verified ? new Date() : null,
        verifiedByUserId: f.verified ? adminUser.id : null,
        reliabilityScore: f.score,
      },
    });

    await prisma.user.create({
      data: {
        email: f.email,
        passwordHash,
        name: f.name,
        phone: f.phone,
        role: Role.FARMER,
        verificationStatus: f.verified ? VerificationStatus.VERIFIED : VerificationStatus.PENDING,
        farmerId: farmer.id,
      },
    });

    farmers.push(farmer);
  }

  // 4. Create Businesses / Commercial Kitchens (8 businesses, 7 verified, 1 unverified)
  const businessData = [
    { name: 'Kusina Butuan Carinderia', email: 'buyer@uma.ph', barangay: 'Libertad', address: '124 Montilla Blvd', permitType: "Mayor's Permit", last4: '4410', score: 4.9, verified: true },
    { name: 'Almont Inland Resort Central Kitchen', email: 'kitchen.almont@uma.ph', barangay: 'San Vicente', address: 'J.C. Aquino Ave', permitType: 'BIR 2303', last4: '8829', score: 5.0, verified: true },
    { name: 'Balanghai Seafood Grille', email: 'balanghai.grille@uma.ph', barangay: 'Doongan', address: 'Doongan Road', permitType: "Mayor's Permit", last4: '2910', score: 4.8, verified: true },
    { name: 'Caraga State University Canteen', email: 'csu.canteen@uma.ph', barangay: 'Ampayon', address: 'CSU Campus Food Hall', permitType: 'DTI Registration', last4: '9941', score: 4.9, verified: true },
    { name: 'Neneng Eatery & Catering', email: 'neneng.eatery@uma.ph', barangay: 'Baan Km 3', address: 'Baan Highway', permitType: "Mayor's Permit", last4: '1209', score: 4.7, verified: true },
    { name: 'Green Spot Vegetarian Cafe', email: 'greenspot@uma.ph', barangay: 'Villa Kananga', address: '88 Capitol Drive', permitType: 'DTI Registration', last4: '7721', score: 4.8, verified: true },
    { name: 'Agusan Valley Medical Hospital Dietary', email: 'avmc.dietary@uma.ph', barangay: 'Libertad', address: 'Hospital Road', permitType: 'BIR 2303', last4: '6634', score: 5.0, verified: true },
    { name: 'Sizzling Express Butuan', email: 'sizzling.express@uma.ph', barangay: 'Holy Redeemer', address: 'Langihan Market Rd', permitType: "Mayor's Permit", last4: '3318', score: 4.6, verified: false }, // Unverified
  ];

  const businesses: Awaited<ReturnType<typeof prisma.business.create>>[] = [];
  for (let i = 0; i < businessData.length; i++) {
    const b = businessData[i];
    const businessPhone = `+63 917 300 000${i + 1}`;
    const business = await prisma.business.create({
      data: {
        name: b.name,
        email: b.email,
        phone: businessPhone,
        addressText: b.address,
        barangay: b.barangay,
        permitType: b.permitType,
        permitLast4: b.last4,
        verificationStatus: b.verified ? VerificationStatus.VERIFIED : VerificationStatus.PENDING,
        verifiedAt: b.verified ? new Date() : null,
        verifiedByUserId: b.verified ? adminUser.id : null,
        reliabilityScore: b.score,
      },
    });

    await prisma.user.create({
      data: {
        email: b.email,
        passwordHash,
        name: b.name,
        phone: businessPhone,
        role: Role.BUYER,
        verificationStatus: b.verified ? VerificationStatus.VERIFIED : VerificationStatus.PENDING,
        businessId: business.id,
      },
    });

    businesses.push(business);
  }

  // 5. Create Couriers (3 couriers)
  const courierData = [
    { name: 'Kuya Jun (Motorcycle Dispatch)', email: 'courier@uma.ph', phone: '+63 917 400 0001', vehicle: 'motorcycle', plate: 'KAA-1204', last4: '9921', deliveries: 142 },
    { name: 'Kuya Rey (Multicab Cargo)', email: 'rey.courier@uma.ph', phone: '+63 917 400 0002', vehicle: 'multicab', plate: 'MAC-8831', last4: '4412', deliveries: 89 },
    { name: 'Kuya Mario (Van Pooled Hub)', email: 'mario.courier@uma.ph', phone: '+63 917 400 0003', vehicle: 'van', plate: 'VAN-7729', last4: '1109', deliveries: 64 },
  ];

  const couriers = [];
  for (const c of courierData) {
    const courier = await prisma.courier.create({
      data: {
        name: c.name,
        email: c.email,
        phone: c.phone,
        vehicleType: c.vehicle,
        licensePlate: c.plate,
        licenseLast4: c.last4,
        verificationStatus: VerificationStatus.VERIFIED,
        verifiedAt: new Date(),
        verifiedByUserId: adminUser.id,
        reliabilityScore: 4.9,
        totalDeliveries: c.deliveries,
      },
    });

    await prisma.user.create({
      data: {
        email: c.email,
        passwordHash,
        name: c.name,
        phone: c.phone,
        role: Role.COURIER,
        verificationStatus: VerificationStatus.VERIFIED,
        courierId: courier.id,
      },
    });

    couriers.push(courier);
  }

  // 6. Create Listings (16 listings over the next 7 days across 6 categories)
  const now = new Date();
  const day1 = new Date(now.getTime() + 1 * 86400000);
  const day2 = new Date(now.getTime() + 2 * 86400000);
  const day3 = new Date(now.getTime() + 3 * 86400000);
  const day4 = new Date(now.getTime() + 4 * 86400000);
  const day5 = new Date(now.getTime() + 5 * 86400000);

  const listingsData = [
    { farmer: farmers[0], crop: 'Native Red Tomatoes (Kamatis)', category: 'Vegetables', unit: Unit.KG, date: day1, qty: 150, reserved: 20, price: 12000, min: 5, img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80', desc: 'Naturally vine-ripened Butuan local kamatis. Firm, high yield for stews and sawsawan.' },
    { farmer: farmers[0], crop: 'Purple Eggplant (Talong)', category: 'Vegetables', unit: Unit.KG, date: day1, qty: 120, reserved: 15, price: 8000, min: 5, img: 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?auto=format&fit=crop&w=600&q=80', desc: 'Glossy long talong harvested at dawn. Tender flesh, minimal seed cavity.' },
    { farmer: farmers[1], crop: 'Native Kalabasa (Squash)', category: 'Vegetables', unit: Unit.KG, date: day2, qty: 250, reserved: 30, price: 5500, min: 10, img: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?auto=format&fit=crop&w=600&q=80', desc: 'Deep orange, sweet and starchy variety perfect for ginataang dishes.' },
    { farmer: farmers[1], crop: 'Ampalaya (Bitter Gourd)', category: 'Vegetables', unit: Unit.KG, date: day2, qty: 80, reserved: 0, price: 9500, min: 5, img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80', desc: 'Crisp green Ampalaya with balanced bitterness, ideal for ginisang ampalaya.' },
    { farmer: farmers[2], crop: 'Fresh Whole Cow Milk (Glass Bottle)', category: 'Dairy & Eggs', unit: Unit.BOTTLE, date: day1, qty: 60, reserved: 10, price: 9500, min: 2, img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80', desc: '1-liter pasteurized unhomogenized farm-fresh milk from Baan dairy herd.' },
    { farmer: farmers[2], crop: 'Free-Range Brown Eggs (Tray of 30)', category: 'Dairy & Eggs', unit: Unit.TRAY, date: day1, qty: 40, reserved: 5, price: 24000, min: 1, img: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80', desc: 'Medium to large eggs from pasture-raised hens in Baan.' },
    { farmer: farmers[3], crop: 'White Potato (Patatas)', category: 'Root Crops', unit: Unit.KG, date: day3, qty: 300, reserved: 0, price: 11000, min: 10, img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80', desc: 'Firm, clean Butuan valley potatoes. Great storage life and texture for braises.' },
    { farmer: farmers[3], crop: 'Carrots (Karot)', category: 'Root Crops', unit: Unit.KG, date: day3, qty: 150, reserved: 0, price: 11500, min: 5, img: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=600&q=80', desc: 'Sweet, crisp table carrots washed and graded.' },
    { farmer: farmers[4], crop: 'Red Onion (Sibuyas Pula)', category: 'Herbs & Spices', unit: Unit.KG, date: day2, qty: 200, reserved: 25, price: 14000, min: 5, img: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80', desc: 'Cured red onions from Taguibo, strong pungency and long shelf life.' },
    { farmer: farmers[4], crop: 'Native Garlic (Bawang)', category: 'Herbs & Spices', unit: Unit.KG, date: day3, qty: 90, reserved: 0, price: 21000, min: 2, img: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=600&q=80', desc: 'Aromatic native small-clove garlic with intense flavor profile.' },
    { farmer: farmers[5], crop: 'Baguio Beans (Habichuelas)', category: 'Vegetables', unit: Unit.KG, date: day2, qty: 110, reserved: 0, price: 10500, min: 5, img: 'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?auto=format&fit=crop&w=600&q=80', desc: 'Tender snap beans harvested young for crunchy texture.' },
    { farmer: farmers[5], crop: 'Siling Labuyo (Birdseye Chili)', category: 'Herbs & Spices', unit: Unit.KG, date: day1, qty: 45, reserved: 5, price: 32000, min: 1, img: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80', desc: 'Fiery genuine labuyo chilis, hand-picked.' },
    { farmer: farmers[6], crop: 'Cardava Cooking Banana (Saba)', category: 'Fruits', unit: Unit.KG, date: day1, qty: 220, reserved: 20, price: 4500, min: 10, img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80', desc: 'Dense, firm Saba bananas for maruya, turon, and nilaga dishes.' },
    { farmer: farmers[6], crop: 'Calamansi', category: 'Fruits', unit: Unit.KG, date: day2, qty: 130, reserved: 0, price: 8500, min: 5, img: 'https://images.unsplash.com/photo-1534432182912-63863115e106?auto=format&fit=crop&w=600&q=80', desc: 'Plump, highly juicy calamansi with green skin, essential for marinades.' },
    { farmer: farmers[0], crop: 'Sayote (Chayote)', category: 'Vegetables', unit: Unit.KG, date: day4, qty: 180, reserved: 0, price: 4000, min: 5, img: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=600&q=80', desc: 'Fresh tender sayote for soups and stir-fries.' },
    { farmer: farmers[1], crop: 'Dinorado White Rice (50kg sack)', category: 'Staples & Grains', unit: Unit.TRAY, date: day5, qty: 25, reserved: 0, price: 265000, min: 1, img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80', desc: 'Fragrant newly milled Dinorado rice from Butuan fields.' },
  ];

  const listings = [];
  for (const l of listingsData) {
    const listing = await prisma.listing.create({
      data: {
        farmerId: l.farmer.id,
        crop: l.crop,
        category: l.category,
        unit: l.unit,
        harvestDate: l.date,
        estimatedQty: l.qty,
        reservedQty: l.reserved,
        priceCentavos: l.price,
        minOrderQty: l.min,
        imageUrl: l.img,
        description: l.desc,
        status: ListingStatus.ACTIVE,
      },
    });
    listings.push(listing);
  }

  // 7. Create Pooled Routes (2 routes)
  const route1 = await prisma.route.create({
    data: {
      date: day1,
      type: DeliveryType.POOLED,
      barangayFrom: 'Antongalon',
      barangayTo: 'Libertad Commercial Corridor',
    },
  });

  const route2 = await prisma.route.create({
    data: {
      date: day2,
      type: DeliveryType.POOLED,
      barangayFrom: 'Baan',
      barangayTo: 'Doongan Food District',
    },
  });

  // 8. Create Orders across all statuses
  // Helper for unique order codes
  let orderCounter = 1;
  const makeCode = () => `UMA-2609-${String(orderCounter++).padStart(4, '0')}`;

  // Order 1: COMPLETED (Normal happy path, ratings + payout created)
  const order1Subtotal = 20 * listings[0].priceCentavos + 10 * listings[4].priceCentavos; // 240,000 + 95,000 = 335,000 centavos (₱3,350)
  const order1Delivery = 10000; // ₱100 pooled
  const order1Total = order1Subtotal + order1Delivery;

  const order1 = await prisma.order.create({
    data: {
      code: makeCode(),
      businessId: businesses[0].id,
      requestedFor: day1,
      deliveryWindow: 'MORNING_6_9',
      deliveryAddress: businesses[0].addressText,
      deliveryType: DeliveryType.POOLED,
      status: OrderStatus.COMPLETED,
      paymentStatus: PaymentStatus.PAID,
      subtotalCentavos: order1Subtotal,
      deliveryFeeCentavos: order1Delivery,
      discountCentavos: 0,
      totalCentavos: order1Total,
      notes: 'Please drop at kitchen back door.',
      createdAt: new Date(now.getTime() - 2 * 86400000),
    },
  });

  await prisma.orderItem.createMany({
    data: [
      { orderId: order1.id, listingId: listings[0].id, qtyRequested: 20, priceAtOrderCentavos: listings[0].priceCentavos, lineTotalCentavos: 20 * listings[0].priceCentavos, status: 'fulfilled' },
      { orderId: order1.id, listingId: listings[4].id, qtyRequested: 10, priceAtOrderCentavos: listings[4].priceCentavos, lineTotalCentavos: 10 * listings[4].priceCentavos, status: 'fulfilled' },
    ],
  });

  await prisma.delivery.create({
    data: {
      orderId: order1.id,
      courierId: couriers[0].id,
      routeId: route1.id,
      status: DeliveryStatus.DELIVERED,
      pickupTime: new Date(now.getTime() - 86400000),
      deliveryTime: new Date(now.getTime() - 86400000 + 3600000),
      pickupProof: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/samplePickupProof',
      deliveryProof: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/sampleDeliveryProof',
    },
  });

  // Payout for Farmer 1 on Order 1
  const f1Gross = 20 * listings[0].priceCentavos;
  const f1Commission = Math.round(f1Gross * 0.08);
  await prisma.payout.create({
    data: {
      orderId: order1.id,
      farmerId: farmers[0].id,
      grossCentavos: f1Gross,
      commissionCentavos: f1Commission,
      netCentavos: f1Gross - f1Commission,
      status: TxStatus.COMPLETED,
      paidAt: new Date(now.getTime() - 40000000),
      reference: 'GCASH-REF-8891024',
    },
  });

  // Ratings for Order 1
  await prisma.rating.create({
    data: {
      orderId: order1.id,
      fromType: 'buyer',
      toType: 'farmer',
      toFarmerId: farmers[0].id,
      score: 5.0,
      comment: 'Excellent tomatoes, crisp and clean box.',
    },
  });

  await prisma.rating.create({
    data: {
      orderId: order1.id,
      fromType: 'buyer',
      toType: 'courier',
      toCourierId: couriers[0].id,
      score: 5.0,
      comment: 'Right on time at 7:15 AM.',
    },
  });

  // Order 2: DELIVERED (Awaiting buyer confirmation / rate)
  const order2Subtotal = 15 * listings[1].priceCentavos; // 120,000 (₱1,200)
  const order2 = await prisma.order.create({
    data: {
      code: makeCode(),
      businessId: businesses[1].id,
      requestedFor: day1,
      deliveryWindow: 'MORNING_6_9',
      deliveryAddress: businesses[1].addressText,
      deliveryType: DeliveryType.ONE_TO_ONE,
      status: OrderStatus.DELIVERED,
      paymentStatus: PaymentStatus.PAID,
      subtotalCentavos: order2Subtotal,
      deliveryFeeCentavos: 15000,
      discountCentavos: 0,
      totalCentavos: order2Subtotal + 15000,
      createdAt: new Date(now.getTime() - 86400000),
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      listingId: listings[1].id,
      qtyRequested: 15,
      priceAtOrderCentavos: listings[1].priceCentavos,
      lineTotalCentavos: order2Subtotal,
      status: 'fulfilled',
    },
  });

  await prisma.delivery.create({
    data: {
      orderId: order2.id,
      courierId: couriers[1].id,
      status: DeliveryStatus.DELIVERED,
      pickupTime: new Date(now.getTime() - 7200000),
      deliveryTime: new Date(now.getTime() - 3600000),
      pickupProof: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/proof2p',
      deliveryProof: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/proof2d',
    },
  });

  // Order 3: PICKED_UP (In transit)
  const order3Subtotal = 30 * listings[2].priceCentavos; // 165,000 centavos (₱1,650)
  const order3 = await prisma.order.create({
    data: {
      code: makeCode(),
      businessId: businesses[2].id,
      requestedFor: day1,
      deliveryWindow: 'MIDDAY_10_1',
      deliveryAddress: businesses[2].addressText,
      deliveryType: DeliveryType.POOLED,
      status: OrderStatus.PICKED_UP,
      paymentStatus: PaymentStatus.UNPAID,
      subtotalCentavos: order3Subtotal,
      deliveryFeeCentavos: 10000,
      discountCentavos: 0,
      totalCentavos: order3Subtotal + 10000,
      createdAt: new Date(now.getTime() - 12 * 3600000),
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order3.id,
      listingId: listings[2].id,
      qtyRequested: 30,
      priceAtOrderCentavos: listings[2].priceCentavos,
      lineTotalCentavos: order3Subtotal,
      status: 'confirmed',
    },
  });

  await prisma.delivery.create({
    data: {
      orderId: order3.id,
      courierId: couriers[2].id,
      routeId: route2.id,
      status: DeliveryStatus.PICKED_UP,
      pickupTime: new Date(now.getTime() - 1800000),
      pickupProof: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/proof3p',
    },
  });

  // Order 4: HARVESTED (Ready for courier pickup)
  const order4Subtotal = 25 * listings[8].priceCentavos; // 350,000 centavos (₱3,500)
  const order4 = await prisma.order.create({
    data: {
      code: makeCode(),
      businessId: businesses[3].id,
      requestedFor: day2,
      deliveryWindow: 'MORNING_6_9',
      deliveryAddress: businesses[3].addressText,
      deliveryType: DeliveryType.POOLED,
      status: OrderStatus.HARVESTED,
      paymentStatus: PaymentStatus.UNPAID,
      subtotalCentavos: order4Subtotal,
      deliveryFeeCentavos: 10000,
      discountCentavos: 0,
      totalCentavos: order4Subtotal + 10000,
      createdAt: new Date(now.getTime() - 6 * 3600000),
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order4.id,
      listingId: listings[8].id,
      qtyRequested: 25,
      priceAtOrderCentavos: listings[8].priceCentavos,
      lineTotalCentavos: order4Subtotal,
      status: 'harvested',
    },
  });

  // Order 5: CONFIRMED (Scheduled for tomorrow)
  const order5Subtotal = 5 * listings[5].priceCentavos; // 120,000 centavos (₱1,200)
  const order5 = await prisma.order.create({
    data: {
      code: makeCode(),
      businessId: businesses[4].id,
      requestedFor: day2,
      deliveryWindow: 'MORNING_6_9',
      deliveryAddress: businesses[4].addressText,
      deliveryType: DeliveryType.ONE_TO_ONE,
      status: OrderStatus.CONFIRMED,
      paymentStatus: PaymentStatus.UNPAID,
      subtotalCentavos: order5Subtotal,
      deliveryFeeCentavos: 15000,
      discountCentavos: 0,
      totalCentavos: order5Subtotal + 15000,
      createdAt: new Date(now.getTime() - 2 * 3600000),
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order5.id,
      listingId: listings[5].id,
      qtyRequested: 5,
      priceAtOrderCentavos: listings[5].priceCentavos,
      lineTotalCentavos: order5Subtotal,
      status: 'confirmed',
    },
  });

  // Order 6: PENDING (Just placed)
  const order6Subtotal = 20 * listings[12].priceCentavos; // 90,000 centavos (₱900)
  const order6 = await prisma.order.create({
    data: {
      code: makeCode(),
      businessId: businesses[5].id,
      requestedFor: day3,
      deliveryWindow: 'AFTERNOON_2_5',
      deliveryAddress: businesses[5].addressText,
      deliveryType: DeliveryType.ONE_TO_ONE,
      status: OrderStatus.PENDING,
      paymentStatus: PaymentStatus.UNPAID,
      subtotalCentavos: order6Subtotal,
      deliveryFeeCentavos: 15000,
      discountCentavos: 0,
      totalCentavos: order6Subtotal + 15000,
      createdAt: now,
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order6.id,
      listingId: listings[12].id,
      qtyRequested: 20,
      priceAtOrderCentavos: listings[12].priceCentavos,
      lineTotalCentavos: order6Subtotal,
      status: 'confirmed',
    },
  });

  // Order 7: DISPUTED (Dispute filed with evidence)
  const order7Subtotal = 10 * listings[0].priceCentavos; // 120,000 centavos (₱1,200)
  const order7 = await prisma.order.create({
    data: {
      code: makeCode(),
      businessId: businesses[6].id,
      requestedFor: new Date(now.getTime() - 86400000),
      deliveryWindow: 'MORNING_6_9',
      deliveryAddress: businesses[6].addressText,
      deliveryType: DeliveryType.ONE_TO_ONE,
      status: OrderStatus.DISPUTED,
      paymentStatus: PaymentStatus.PAID,
      subtotalCentavos: order7Subtotal,
      deliveryFeeCentavos: 15000,
      discountCentavos: 0,
      totalCentavos: order7Subtotal + 15000,
      createdAt: new Date(now.getTime() - 2 * 86400000),
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order7.id,
      listingId: listings[0].id,
      qtyRequested: 10,
      priceAtOrderCentavos: listings[0].priceCentavos,
      lineTotalCentavos: order7Subtotal,
      status: 'disputed',
    },
  });

  await prisma.dispute.create({
    data: {
      orderId: order7.id,
      raisedBy: 'business',
      description: '3 kg of tomatoes arrived bruised due to rough crate handling.',
      status: DisputeStatus.OPEN,
      refundCentavos: 36000, // 3kg * ₱120 = ₱360 refund requested
      evidence: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/disputePhoto',
    },
  });

  // Order 8: CANCELLED (Pre-harvest cancellation)
  const order8Subtotal = 5 * listings[11].priceCentavos; // 160,000 centavos (₱1,600)
  const order8 = await prisma.order.create({
    data: {
      code: makeCode(),
      businessId: businesses[0].id,
      requestedFor: day3,
      deliveryWindow: 'MORNING_6_9',
      deliveryAddress: businesses[0].addressText,
      deliveryType: DeliveryType.ONE_TO_ONE,
      status: OrderStatus.CANCELLED,
      paymentStatus: PaymentStatus.UNPAID,
      subtotalCentavos: order8Subtotal,
      deliveryFeeCentavos: 15000,
      discountCentavos: 0,
      totalCentavos: order8Subtotal + 15000,
      cancelledReason: 'Kitchen menu adjustment by buyer before cutoff.',
      createdAt: new Date(now.getTime() - 3 * 3600000),
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order8.id,
      listingId: listings[11].id,
      qtyRequested: 5,
      priceAtOrderCentavos: listings[11].priceCentavos,
      lineTotalCentavos: order8Subtotal,
      status: 'cancelled',
    },
  });

  // 9. Create Leads (Inbound waitlist / pilot leads)
  await prisma.lead.createMany({
    data: [
      { name: 'Chef Marco Valdes', phone: '+63 917 555 1201', email: 'marco@valdescatering.com', type: LeadType.BUSINESS, barangay: 'Villa Kananga', message: 'Need weekly supply of 50kg kamatis and 30L milk for resort weddings.' },
      { name: 'Narding Quijano', phone: '+63 917 555 1202', type: LeadType.FARMER, barangay: 'Pigdaulan', message: 'Have 2 hectares of ampalaya and string beans ready for harvest in 2 weeks.' },
      { name: 'Ate Liza Carinderia', phone: '+63 917 555 1203', type: LeadType.BUSINESS, barangay: 'Libertad', message: 'Inquiring if pooled delivery covers Montilla Blvd early mornings.' },
    ],
  });

  // 10. Create Notifications
  await prisma.notification.createMany({
    data: [
      { userId: adminUser.id, type: 'VERIFICATION_NEEDED', title: 'New Verification Request', body: 'Farmer Bernardo Ocampo submitted ID for verification.', href: '/dashboard/admin/verifications' },
      { userId: adminUser.id, type: 'DISPUTE_OPENED', title: 'Order Dispute Filed', body: 'Order UMA-2609-0007 disputed: 3kg bruised tomatoes.', href: '/dashboard/admin/disputes' },
      { userId: farmers[0].id, type: 'ORDER_RECEIVED', title: 'New Harvest Order', body: 'Kusina Butuan ordered 20kg Kamatis for tomorrow morning.', href: '/dashboard/orders' },
      { userId: businesses[0].id, type: 'DELIVERY_COMPLETED', title: 'Order Delivered', body: 'Kuya Jun delivered your morning produce basket with photo proof.', href: '/dashboard/orders' },
    ],
  });

  // 11. Create Audit Logs
  await prisma.auditLog.createMany({
    data: [
      { actorUserId: adminUser.id, action: 'VERIFY_FARMER', entity: 'Farmer', entityId: farmers[0].id, meta: { status: 'VERIFIED', notes: 'National ID verified' } },
      { actorUserId: adminUser.id, action: 'VERIFY_BUSINESS', entity: 'Business', entityId: businesses[0].id, meta: { status: 'VERIFIED', notes: "Mayor's Permit verified" } },
      { actorUserId: adminUser.id, action: 'TRANSITION_ORDER', entity: 'Order', entityId: order1.id, meta: { from: 'PICKED_UP', to: 'DELIVERED', photoAttached: true } },
    ],
  });

  console.log(`✅ Seed finished successfully!`);
  console.log(`   - 1 Admin: admin@uma.ph`);
  console.log(`   - 8 Farmers: farmer@uma.ph, ramon.bautista@uma.ph, etc.`);
  console.log(`   - 8 Businesses: buyer@uma.ph, kitchen.almont@uma.ph, etc.`);
  console.log(`   - 3 Couriers: courier@uma.ph, rey.courier@uma.ph, mario.courier@uma.ph`);
  console.log(`   - Password for all demo accounts: ${demoPassword}`);
  console.log(`   - ${listings.length} Active Listings`);
  console.log(`   - 8 Orders across all 8 lifecycle statuses`);
  console.log(`   - 2 Pooled Routes, Payouts, Ratings, Disputes, Leads & Notifications`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
