import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z
    .string()
    .min(10, 'Please enter a valid Philippine mobile number (e.g. 0917 123 4567 or +63)')
    .max(16, 'Phone number is too long'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  type: z.enum(['BUSINESS', 'FARMER', 'OTHER'], {
    message: 'Please select whether you are a Commercial Kitchen, Farmer, or Other partner',
  }),
  barangay: z.string().min(2, 'Barangay is required').max(100),
  message: z.string().max(1000, 'Message cannot exceed 1000 characters').optional().or(z.literal('')),
  honeypot: z.string().max(0, 'Bot detected').optional().or(z.literal('')),
});

export type LeadInput = z.infer<typeof leadSchema>;
