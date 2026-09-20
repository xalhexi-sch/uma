import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { loginSchema } from '@/lib/validation/auth';
import { createSessionToken, setSessionCookie } from '@/server/auth/session';
import { jsonOk, jsonError, RateLimitError, ApiError } from '@/server/api/handler';

// In-memory sliding rate limiter: 5 attempts per minute per key
const loginAttempts = new Map<string, { count: number; firstAttempt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_ATTEMPTS = 5;

function checkRateLimit(key: string) {
  const now = Date.now();
  const record = loginAttempts.get(key);

  if (!record) {
    loginAttempts.set(key, { count: 1, firstAttempt: now });
    return;
  }

  if (now - record.firstAttempt > RATE_LIMIT_WINDOW_MS) {
    loginAttempts.set(key, { count: 1, firstAttempt: now });
    return;
  }

  if (record.count >= MAX_ATTEMPTS) {
    throw new RateLimitError('Too many failed login attempts. Please wait 1 minute before trying again.');
  }

  record.count += 1;
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();
    const parseResult = loginSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return jsonError('VALIDATION_ERROR', 'Please provide a valid email and password', 422);
    }

    const { email, password } = parseResult.data;
    const clientIp = req.headers.get('x-forwarded-for') || 'local';
    const rateLimitKey = `${clientIp}:${email.toLowerCase()}`;

    checkRateLimit(rateLimitKey);

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        farmer: { select: { id: true, verificationStatus: true } },
        business: { select: { id: true, verificationStatus: true } },
        courier: { select: { id: true, verificationStatus: true } },
      },
    });

    if (!user) {
      // Generic error per Section 13 security checklist
      return jsonError('UNAUTHENTICATED', 'Email or password is wrong', 401);
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid) {
      return jsonError('UNAUTHENTICATED', 'Email or password is wrong', 401);
    }

    // Reset rate limiter on successful login
    loginAttempts.delete(rateLimitKey);

    // Update lastLoginAt
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

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
    console.error('[Login Error]', err);
    return jsonError('INTERNAL', 'An error occurred during login. Please try again.', 500);
  }
}
