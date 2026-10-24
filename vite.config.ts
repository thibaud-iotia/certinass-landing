/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  // Cartes de code pour PostHog : envoyées par la CI puis retirées de `dist/` avant publication.
  build: { sourcemap: true },
  server: {
    host: '127.0.0.1',
    port: 5174,
    strictPort: true,
  },
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
});
