import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Midis Student',
        short_name: 'midis-app',
        start_url: '.',
        display: 'standalone',
        icons: [48, 72, 96, 144, 168, 192].map((size) => ({
          src: `icons/${size}.png`,
          sizes: `${size}x${size}`,
          type: 'image/png',
        })),
      },
    }),
  ],
});
