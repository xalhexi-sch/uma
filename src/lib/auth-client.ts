'use client';

import { LoginInput, RegisterInput, DemoLoginInput } from '@/lib/validation/auth';

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  phone: string;
  role: 'BUYER' | 'FARMER' | 'COURIER' | 'ADMIN';
  farmerId?: number | null;
  businessId?: number | null;
  courierId?: number | null;
  verificationStatus?: 'PENDING' | 'VERIFIED' | 'REJECTED';
}

export async function loginUser(input: LoginInput): Promise<{ user: AuthUser }> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  const json = await res.json();
  if (!res.ok || !json.ok) {
    throw new Error(json.error?.message || 'Login failed. Please check your credentials.');
  }

  return json.data;
}

export async function registerUser(input: RegisterInput): Promise<{ user: AuthUser }> {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  const json = await res.json();
  if (!res.ok || !json.ok) {
    throw new Error(json.error?.message || 'Registration failed. Please check your details.');
  }

  return json.data;
}

export async function loginDemoUser(role: DemoLoginInput['role']): Promise<{ user: AuthUser }> {
  const res = await fetch('/api/auth/demo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role }),
  });

  const json = await res.json();
  if (!res.ok || !json.ok) {
    throw new Error(json.error?.message || 'Demo login failed');
  }

  return json.data;
}

export async function logoutUser(): Promise<void> {
  await fetch('/api/auth/logout', { method: 'POST' });
}

export async function fetchCurrentUser(): Promise<AuthUser | null> {
  try {
    const res = await fetch('/api/auth/me');
    if (!res.ok) return null;
    const json = await res.json();
    return json.ok ? json.data.user : null;
  } catch {
    return null;
  }
}
