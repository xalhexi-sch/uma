import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        business: { select: { name: true, barangay: true } },
        orderItems: {
          include: {
            listing: { select: { crop: true, price: true } },
          },
        },
        delivery: {
          include: { courier: { select: { name: true, vehicleType: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ success: false, error: 'Database query failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessId, items, deliveryType = 'one-to-one' } = body;

    if (!businessId || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid payload. businessId and items array are required.' },
        { status: 400 }
      );
    }

    const cutoffWindow = new Date();
    cutoffWindow.setHours(20, 0, 0); // 8pm cutoff

    const deliveryFee = deliveryType === 'pooled' ? 100 : 150;
    const totalValue = items.reduce(
      (sum: number, item: { qty: number; price: number }) => sum + item.qty * item.price,
      0
    );

    const order = await prisma.$transaction(async (tx) => {
      const createdOrder = await tx.order.create({
        data: {
          businessId: Number(businessId),
          cutoffWindow,
          status: 'confirmed',
          paymentStatus: 'unpaid',
          deliveryFee,
          deliveryType,
          totalValue,
        },
      });

      for (const item of items) {
        await tx.orderItem.create({
          data: {
            orderId: createdOrder.id,
            listingId: Number(item.listingId),
            qtyRequested: Number(item.qty),
            priceAtOrder: Number(item.price),
            status: 'confirmed',
          },
        });
      }

      return createdOrder;
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error('Failed to create order:', error);
    return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 });
  }
}
