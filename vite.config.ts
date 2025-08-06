import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['0d946d6cb5b8.ngrok-free.app', 'localhost'],
  },
});
// https://0d946d6cb5b8.ngrok-free.app
