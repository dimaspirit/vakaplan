import path from 'path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    watch: false,
    globals: true,
    watch: false,
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.js'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
})