import { clearSessionCookie } from '@/server/auth/session';
import { jsonOk } from '@/server/api/handler';

export async function POST() {
  const res = jsonOk({ success: true, message: 'Logged out successfully' });
  clearSessionCookie(res);
  return res;
}
