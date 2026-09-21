import { prisma } from '@/lib/prisma';
import { jsonOk, jsonError } from '@/server/api/handler';

export const dynamic = 'force-dynamic';
export const revalidate = 300; // 5 minutes cache

export async function GET() {
  try {
    const [farmersCount, businessesCount, ordersCount, listingsCount] = await Promise.all([
      prisma.farmer.count({ where: { verificationStatus: 'VERIFIED' } }),
      prisma.business.count({ where: { verificationStatus: 'VERIFIED' } }),
      prisma.order.count({ where: { status: { in: ['DELIVERED', 'COMPLETED'] } } }),
      prisma.listing.count({ where: { status: 'ACTIVE' } }),
    ]);

    const response = jsonOk({
      verifiedFarmers: farmersCount,
      verifiedKitchens: businessesCount,
      completedOrders: ordersCount,
      activeListings: listingsCount,
      commissionRatePercent: 8,
    });

    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    return response;
  } catch (error) {
    console.error('[Public Stats Error]:', error);
    return jsonError('INTERNAL', 'Unable to retrieve platform statistics at this time.', 500);
  }
}
