export type UserRole = 'buyer' | 'supplier' | 'admin';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  businessName?: string;
  barangay: string;
}

export const DEMO_ACCOUNTS: Record<UserRole, UserSession> = {
  buyer: {
    id: 'usr_buyer_01',
    name: 'Sampaguita Kitchen',
    email: 'buyer@uma.ph',
    role: 'buyer',
    businessName: 'Sampaguita Carinderia & Catering',
    barangay: 'Butuan Proper',
  },
  supplier: {
    id: 'usr_supp_01',
    name: 'Mang Santos',
    email: 'farmer@uma.ph',
    role: 'supplier',
    businessName: 'Santos Farm & Dairy',
    barangay: 'La Paz Agricultural District',
  },
  admin: {
    id: 'usr_admin_01',
    name: 'UMA Operations Admin',
    email: 'admin@uma.ph',
    role: 'admin',
    barangay: 'Butuan Central Hub',
  },
};

const SESSION_KEY = 'uma_demo_user';

export function getCurrentUser(): UserSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(role: UserRole): UserSession {
  const session = DEMO_ACCOUNTS[role];
  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
  return session;
}

export function clearCurrentUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_KEY);
  }
}
