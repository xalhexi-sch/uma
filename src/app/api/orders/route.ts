import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma, OrderStatus, PaymentStatus, DeliveryType } from '@prisma/client';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        business: { select: { name: true, barangay: true } },
        orderItems: {
          include: {
            listing: { select: { crop: true, priceCentavos: true } },
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

    const scheduledDate = new Date();
    scheduledDate.setDate(scheduledDate.getDate() + 1);

    const deliveryFeeCentavos = deliveryType === 'pooled' ? 10000 : 15000;
    const subtotalCentavos = items.reduce(
      (sum: number, item: { qty: number; price: number }) =>
        sum + Math.round(item.qty * item.price * 100),
      0
    );
    const totalCentavos = subtotalCentavos + deliveryFeeCentavos;
    const orderCode = `UMA-2609-${Math.floor(1000 + Math.random() * 9000)}`;

    const order = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const createdOrder = await tx.order.create({
        data: {
          code: orderCode,
          businessId: Number(businessId),
          requestedFor: scheduledDate,
          deliveryAddress: 'Montilla Blvd, Butuan City',
          deliveryWindow: 'MORNING_6_9',
          status: OrderStatus.CONFIRMED,
          paymentStatus: PaymentStatus.UNPAID,
          deliveryType: deliveryType === 'pooled' ? DeliveryType.POOLED : DeliveryType.ONE_TO_ONE,
          subtotalCentavos,
          deliveryFeeCentavos,
          discountCentavos: 0,
          totalCentavos,
        },
      });

      for (const item of items) {
        const itemPriceCentavos = Math.round(Number(item.price) * 100);
        const lineTotalCentavos = Math.round(Number(item.qty) * itemPriceCentavos);

        await tx.orderItem.create({
          data: {
            orderId: createdOrder.id,
            listingId: Number(item.listingId),
            qtyRequested: Number(item.qty),
            priceAtOrderCentavos: itemPriceCentavos,
            lineTotalCentavos,
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
