import { describe, it, expect } from 'vitest';
import { leadSchema } from '@/lib/validation/lead';

describe('Lead Schema Validation', () => {
  it('validates a correct commercial kitchen lead', () => {
    const validData = {
      name: 'Maria Santos',
      phone: '09171234567',
      email: 'maria@kusinabutuan.ph',
      type: 'BUSINESS' as const,
      barangay: 'Libertad',
      message: 'Need 40kg tomatoes weekly',
    };

    const result = leadSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('validates a correct farmer lead without optional email or message', () => {
    const validData = {
      name: 'Mang Juan dela Cruz',
      phone: '+639181234567',
      type: 'FARMER' as const,
      barangay: 'Antongalon',
    };

    const result = leadSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects short names or invalid phone numbers', () => {
    const invalidData = {
      name: 'M',
      phone: '123',
      type: 'BUSINESS' as const,
      barangay: 'Doongan',
    };

    const result = leadSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.includes('name'))).toBe(true);
      expect(result.error.issues.some((i) => i.path.includes('phone'))).toBe(true);
    }
  });

  it('detects and rejects bot submissions via honeypot', () => {
    const botData = {
      name: 'Spam Bot',
      phone: '09171234567',
      type: 'BUSINESS' as const,
      barangay: 'Libertad',
      honeypot: 'http://spam-link.com',
    };

    const result = leadSchema.safeParse(botData);
    expect(result.success).toBe(false);
  });
});
