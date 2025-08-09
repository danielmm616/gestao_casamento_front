import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['ddb3290112d3.ngrok-free.app', 'localhost'],
  },
});
// https://ddb3290112d3.ngrok-free.app
