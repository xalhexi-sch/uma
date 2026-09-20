import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';
import { SESSION_COOKIE_NAME, verifySessionToken } from './session';
import { SessionUser, UnauthenticatedError, ForbiddenError } from '@/server/api/handler';

/**
 * Server Component / Server Action guard to require authenticated user and optional role.
 * If redirectOnFail is true (default for Server Components/Pages), redirects to /login?next=...
 */
export async function requireUser(
  allowedRoles?: Role[],
  options: { redirectOnFail?: boolean; nextUrl?: string } = { redirectOnFail: true }
): Promise<SessionUser> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    if (options.redirectOnFail) {
      const nextParam = options.nextUrl ? `?next=${encodeURIComponent(options.nextUrl)}` : '';
      redirect(`/login${nextParam}`);
    }
    throw new UnauthenticatedError();
  }

  const user = await verifySessionToken(token);
  if (!user) {
    if (options.redirectOnFail) {
      redirect('/login');
    }
    throw new UnauthenticatedError('Invalid or expired session');
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role as Role)) {
    if (options.redirectOnFail) {
      redirect('/dashboard'); // Not authorized for this sub-dashboard
    }
    throw new ForbiddenError(`Access requires one of: ${allowedRoles.join(', ')}`);
  }

  return user;
}

/**
 * Optional session user retrieval without throwing.
 */
export async function getOptionalUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}
