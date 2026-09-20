import { NextRequest } from 'next/server';
import { getSessionUser } from '@/server/auth/session';
import { jsonOk, jsonError } from '@/server/api/handler';

export async function GET(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) {
    return jsonError('UNAUTHENTICATED', 'No active session', 401);
  }
  return jsonOk({ user });
}
