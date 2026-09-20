import { describe, it, expect } from 'vitest';
import bcrypt from 'bcryptjs';
import { createSessionToken, verifySessionToken } from '@/server/auth/session';
import { SessionUser, apiHandler } from '@/server/api/handler';
import { NextRequest } from 'next/server';

describe('Auth & Permissions Matrix', () => {
  const mockUser: SessionUser = {
    id: 1,
    email: 'buyer@uma.ph',
    name: 'Kusina Butuan',
    phone: '+63 917 300 0001',
    role: 'BUYER',
    businessId: 1,
    verificationStatus: 'VERIFIED',
  };

  const mockAdmin: SessionUser = {
    id: 99,
    email: 'admin@uma.ph',
    name: 'Operations Admin',
    phone: '+63 917 100 0001',
    role: 'ADMIN',
    verificationStatus: 'VERIFIED',
  };

  it('generates and verifies signed session tokens via jose', async () => {
    const token = await createSessionToken(mockUser);
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');

    const parsed = await verifySessionToken(token);
    expect(parsed).not.toBeNull();
    expect(parsed?.id).toBe(1);
    expect(parsed?.email).toBe('buyer@uma.ph');
    expect(parsed?.role).toBe('BUYER');
  });

  it('rejects tampered or malformed session tokens', async () => {
    const validToken = await createSessionToken(mockUser);
    const tamperedToken = validToken.slice(0, -5) + 'xxxxx';

    const result = await verifySessionToken(tamperedToken);
    expect(result).toBeNull();
  });

  it('hashes passwords with bcrypt cost >= 10 and verifies them', async () => {
    const plainPassword = 'umaSecretPassword123!';
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(plainPassword, salt);

    expect(hash).not.toBe(plainPassword);
    expect(hash.startsWith('$2')).toBe(true);

    const match = await bcrypt.compare(plainPassword, hash);
    expect(match).toBe(true);

    const wrongMatch = await bcrypt.compare('wrongPassword', hash);
    expect(wrongMatch).toBe(false);
  });

  it('enforces role restrictions in apiHandler (403 for BUYER accessing ADMIN endpoint)', async () => {
    // Admin only endpoint
    const adminEndpoint = apiHandler({
      roles: ['ADMIN'],
      handler: async () => ({ secret: 'top_secret_data' }),
    });

    // Mock request with BUYER session cookie
    const token = await createSessionToken(mockUser);
    const req = new NextRequest('http://localhost:3000/api/admin/metrics', {
      headers: {
        cookie: `uma_session=${token}`,
      },
    });

    const res = await adminEndpoint(req);
    const json = await res.json();

    expect(res.status).toBe(403);
    expect(json.ok).toBe(false);
    expect(json.error.code).toBe('FORBIDDEN');
  });

  it('enforces authentication in apiHandler (401 for unauthenticated request)', async () => {
    const protectedEndpoint = apiHandler({
      roles: ['BUYER', 'FARMER', 'ADMIN'],
      handler: async () => ({ data: 'protected' }),
    });

    const req = new NextRequest('http://localhost:3000/api/dashboard/orders');
    const res = await protectedEndpoint(req);
    const json = await res.json();

    expect(res.status).toBe(401);
    expect(json.ok).toBe(false);
    expect(json.error.code).toBe('UNAUTHENTICATED');
  });

  it('allows authorized roles through apiHandler with valid session', async () => {
    const adminEndpoint = apiHandler({
      roles: ['ADMIN'],
      handler: async (_req, { user }) => ({ welcome: `Hello, ${user?.name}` }),
    });

    const token = await createSessionToken(mockAdmin);
    const req = new NextRequest('http://localhost:3000/api/admin/metrics', {
      headers: {
        cookie: `uma_session=${token}`,
      },
    });

    const res = await adminEndpoint(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(json.data.welcome).toBe('Hello, Operations Admin');
  });
});
