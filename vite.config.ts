import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['801d0eedd18c.ngrok-free.app', 'localhost'],
  },
});
// https://801d0eedd18c.ngrok-free.app
