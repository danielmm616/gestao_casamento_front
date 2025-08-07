import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['3696161943fd.ngrok-free.app', 'localhost'],
  },
});
// https://3696161943fd.ngrok-free.app/guest-info/scanner
