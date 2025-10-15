import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,
    coverage: {
      provider: 'v8',                 // fast, zero-config
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: 'coverage',
      include: ['src/**/*.{ts,tsx}'], // only measure app files
      exclude: [
        'src/test/**',
        '**/*.d.ts',
        'src/main.tsx',               // optional: entrypoint
      ],
      thresholds: {                   // optional gates
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80,
      },
    },
  },
})