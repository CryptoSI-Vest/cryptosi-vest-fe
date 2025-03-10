import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 8000,
  },
  plugins: [
    react({
      fastRefresh: true, // Ensures fast refresh is enabled.
    }),
  ],
});
