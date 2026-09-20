import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  role: z.enum(['BUYER', 'FARMER'], {
    message: 'Please choose whether you are registering as a Business Kitchen or Farmer',
  }),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Full contact name is required'),
  phone: z
    .string()
    .min(10, 'Please enter a valid Philippine mobile number (e.g. 0917 123 4567 or +63)'),
  entityName: z.string().min(2, 'Business or Farm name is required'),
  barangay: z.string().min(2, 'Barangay is required'),
  addressText: z.string().min(4, 'Street address or location details required'),
  idOrPermitType: z.string().default("Mayor's Permit / National ID"),
  idOrPermitLast4: z
    .string()
    .length(4, 'Must provide the last 4 characters of your ID or Permit for verification'),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const demoLoginSchema = z.object({
  role: z.enum(['BUYER', 'FARMER', 'COURIER', 'ADMIN']),
});

export type DemoLoginInput = z.infer<typeof demoLoginSchema>;
