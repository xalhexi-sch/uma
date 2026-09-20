import { NextRequest, NextResponse } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';
import { env } from '@/lib/env';
import { SessionUser } from '@/server/api/handler';

export const SESSION_COOKIE_NAME = 'uma_session';
const SESSION_EXPIRATION_SECONDS = 7 * 24 * 60 * 60; // 7 days

const encodedSecret = new TextEncoder().encode(env.SESSION_SECRET);

export interface JwtSessionPayload {
  sub: string; // User ID as string
  email: string;
  name: string;
  phone: string;
  role: 'BUYER' | 'FARMER' | 'COURIER' | 'ADMIN';
  farmerId?: number | null;
  businessId?: number | null;
  courierId?: number | null;
  verificationStatus?: 'PENDING' | 'VERIFIED' | 'REJECTED';
}

/**
 * Creates a signed JWT token using jose.
 */
export async function createSessionToken(user: SessionUser): Promise<string> {
  const payload: JwtSessionPayload = {
    sub: String(user.id),
    email: user.email,
    name: user.name,
    phone: user.phone,
    role: user.role,
    farmerId: user.farmerId,
    businessId: user.businessId,
    courierId: user.courierId,
    verificationStatus: user.verificationStatus,
  };

  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_EXPIRATION_SECONDS}s`)
    .sign(encodedSecret);
}

/**
 * Verifies a JWT session token and returns the parsed user.
 */
export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, encodedSecret);
    const p = payload as unknown as JwtSessionPayload;

    return {
      id: parseInt(p.sub, 10),
      email: p.email,
      name: p.name,
      phone: p.phone,
      role: p.role,
      farmerId: p.farmerId,
      businessId: p.businessId,
      courierId: p.courierId,
      verificationStatus: p.verificationStatus,
    };
  } catch {
    return null;
  }
}

/**
 * Reads and verifies the session token from an incoming NextRequest.
 */
export async function getSessionUser(req: NextRequest): Promise<SessionUser | null> {
  const cookie = req.cookies.get(SESSION_COOKIE_NAME);
  if (!cookie?.value) return null;
  return verifySessionToken(cookie.value);
}

/**
 * Attaches the httpOnly session cookie to an outgoing NextResponse.
 */
export function setSessionCookie(res: NextResponse, token: string): void {
  res.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_EXPIRATION_SECONDS,
    path: '/',
  });
}

/**
 * Clears the session cookie on logout.
 */
export function clearSessionCookie(res: NextResponse): void {
  res.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
}
