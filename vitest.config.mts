import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    env: {
      DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/uma_db',
      SESSION_SECRET: process.env.SESSION_SECRET || 'uma_pilot_secure_super_secret_session_key_2026_at_least_32_chars',
      DEMO_MODE: 'true',
      DEMO_PASSWORD: 'umaDemo2026!',
      NODE_ENV: 'test',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
});
