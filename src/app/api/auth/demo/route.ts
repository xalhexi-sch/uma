import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { env } from '@/lib/env';
import { demoLoginSchema } from '@/lib/validation/auth';
import { createSessionToken, setSessionCookie } from '@/server/auth/session';
import { jsonOk, jsonError, ForbiddenError, ApiError } from '@/server/api/handler';

const DEMO_EMAILS: Record<string, string> = {
  BUYER: 'buyer@uma.ph',
  FARMER: 'farmer@uma.ph',
  COURIER: 'courier@uma.ph',
  ADMIN: 'admin@uma.ph',
};

export async function POST(req: NextRequest) {
  try {
    if (!env.DEMO_MODE) {
      throw new ForbiddenError('Demo mode is disabled in this environment');
    }

    const rawBody = await req.json();
    const parseResult = demoLoginSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return jsonError('VALIDATION_ERROR', 'Invalid demo role requested', 422);
    }

    const { role } = parseResult.data;
    const targetEmail = DEMO_EMAILS[role];

    if (!targetEmail) {
      return jsonError('NOT_FOUND', 'No demo persona configured for role', 404);
    }

    const user = await prisma.user.findUnique({
      where: { email: targetEmail },
      include: {
        farmer: { select: { id: true, verificationStatus: true } },
        business: { select: { id: true, verificationStatus: true } },
        courier: { select: { id: true, verificationStatus: true } },
      },
    });

    if (!user) {
      return jsonError(
        'NOT_FOUND',
        `Demo user for ${role} (${targetEmail}) not found. Please run seed script.`,
        404
      );
    }

    const sessionUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
      farmerId: user.farmerId,
      businessId: user.businessId,
      courierId: user.courierId,
      verificationStatus: user.verificationStatus,
    };

    const token = await createSessionToken(sessionUser);
    const res = jsonOk({ user: sessionUser });
    setSessionCookie(res, token);

    return res;
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      return jsonError(err.code, err.message, err.status);
    }
    console.error('[Demo Login Error]', err);
    return jsonError('INTERNAL', 'Failed to log in as demo persona', 500);
  }
}
