import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, { message: 'DATABASE_URL is required' }),
  SESSION_SECRET: z
    .string()
    .min(32, { message: 'SESSION_SECRET must be at least 32 characters long' })
    .default('uma_pilot_secure_super_secret_session_key_2026_at_least_32_chars'),
  DEMO_MODE: z
    .string()
    .optional()
    .default('true')
    .transform((val) => val === 'true' || val === '1'),
  DEMO_PASSWORD: z.string().default('umaDemo2026!'),
  NEXT_PUBLIC_SITE_URL: z.string().default('http://localhost:3000'),
  FIRST_ORDER_DELIVERY_CREDIT: z
    .string()
    .optional()
    .default('true')
    .transform((val) => val === 'true' || val === '1'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

function validateEnv() {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const errorDetails = parsed.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');
    console.error(`\n[FATAL] Invalid environment configuration:\n${errorDetails}\n`);
    // Fail fast with clear message
    throw new Error(`Invalid environment variables:\n${errorDetails}`);
  }
  return parsed.data;
}

export const env = validateEnv();
