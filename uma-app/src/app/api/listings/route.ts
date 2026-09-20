import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const listings = await prisma.listing.findMany({
      where: { status: 'active' },
      include: {
        farmer: {
          select: {
            id: true,
            name: true,
            barangay: true,
            reliabilityScore: true,
          },
        },
      },
      orderBy: { harvestDate: 'asc' },
    });

    return NextResponse.json({ success: true, count: listings.length, data: listings });
  } catch (error) {
    console.error('Failed to fetch listings:', error);
    return NextResponse.json({ success: false, error: 'Database query failed' }, { status: 500 });
  }
}
