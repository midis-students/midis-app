import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

import { versioning } from './plugins/GithubVersioning';

export default defineConfig({
  plugins: [
    react(),
    versioning('midis-students', 'midis-app', 'client', (version) => {
      const output = `Версия ${version}`;

      const date = new Date().toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      return `${output}, от ${date}`;
    }),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        name: 'МИДиС Мини',
        short_name: 'midis-mini',
        start_url: '.',
        display: 'standalone',
        description: 'МИДиС мини клиент для portal.midis.info',
        background_color: '#f5f5f5',
        theme_color: '#2688EB',
        orientation: 'portrait-primary',
        icons: [48, 72, 96, 144, 168, 192].map((size) => ({
          src: `icons/${size}.png`,
          sizes: `${size}x${size}`,
          type: 'image/png',
        })),
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^@vkontakte\/vkui$/,
        replacement: '@vkontakte/vkui/dist/cssm',
      },
      {
        find: '@/',
        replacement: '/src/',
      },
    ],
  },
});
