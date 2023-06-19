import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

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
