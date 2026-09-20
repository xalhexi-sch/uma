import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding UMA Agricultural Marketplace database...');

  // Clear existing data safely
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
  await prisma.transaction.deleteMany();

  console.log('✓ Cleared existing records');

  // ===== FARMERS =====
  const farmer1 = await prisma.farmer.create({
    data: {
      name: 'Mr. Santos',
      email: 'santos@farm.local',
      phone: '+639171234567',
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
      phone: '+639172345678',
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
      phone: '+639173456789',
      barangay: 'La Paz',
      idType: 'National ID',
      idNumber: 'NID-2021-789',
      verifiedAt: new Date(),
      reliabilityScore: 4.5,
    },
  });

  console.log('✓ Created 3 verified farmers in Butuan');

  // ===== FORWARD LISTINGS =====
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

  await prisma.listing.create({
    data: {
      farmerId: farmer3.id,
      crop: 'Squash',
      harvestDate: dayAfter,
      estimatedQty: 30,
      price: 60,
      status: 'active',
    },
  });

  console.log('✓ Created 3 forward crop listings');

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
      creditTermsDays: 0,
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
      creditTermsDays: 7, // Institutional tier with 7-day trade credit
    },
  });

  console.log('✓ Created 2 commercial buyers');

  // ===== ORDERS =====
  const cutoffTime = new Date();
  cutoffTime.setHours(20, 0, 0); // 8:00 PM cutoff

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
      totalValue: 3600,
      deliveryFee: 200,
      deliveryType: 'pooled',
    },
  });

  console.log('✓ Created 2 active orders');

  // ===== ORDER ITEMS =====
  await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      listingId: listing1.id,
      qtyRequested: 25, // 25kg eggplant
      priceAtOrder: 80,
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      listingId: listing1.id,
      qtyRequested: 15, // remaining 15kg eggplant
      priceAtOrder: 80,
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      listingId: listing2.id,
      qtyRequested: 20, // 20kg tomatoes
      priceAtOrder: 120,
    },
  });

  console.log('✓ Created 3 order items with locked pricing');

  // ===== COURIER =====
  const courier1 = await prisma.courier.create({
    data: {
      name: 'Mang Rodel',
      email: 'rodel@courier.local',
      phone: '+639174567890',
      vehicleType: 'motorcycle',
      licensePlate: 'ABC-1234',
      licenseNo: 'DL-2023-RODEL',
      verifiedAt: new Date(),
      reliabilityScore: 4.8,
      totalDeliveries: 87,
    },
  });

  console.log('✓ Created 1 partnered courier');

  // ===== DELIVERIES =====
  await prisma.delivery.create({
    data: {
      orderId: order1.id,
      courierId: courier1.id,
      status: 'pending',
    },
  });

  // ===== ROUTE =====
  await prisma.route.create({
    data: {
      date: tomorrow,
      type: 'pooled',
      barangayFrom: 'La Paz',
      barangayTo: 'Butuan Proper',
    },
  });

  console.log('✓ Created delivery assignment and pooled route');
  console.log('✅ UMA Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
