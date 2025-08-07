import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['0b19eab897e8.ngrok-free.app', 'localhost'],
  },
});
// https://0b19eab897e8.ngrok-free.app/guest-info/scanner
