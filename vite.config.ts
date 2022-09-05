import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import axios from 'axios';

const versioning = (): PluginOption => {
  return {
    name: 'VersioningPlugin',
    enforce: 'post',
    async generateBundle(options, bundle) {
      const indexHtml = bundle['index.html'];
      if (indexHtml.type === 'asset') {
        let owner = 'DamirLut';
        let repo = 'midis-app';

        const { data } = await axios.get(
          `http://ip2.damirlut.online:9000/github/commits/${owner}/${repo}/`,
        );
        const version = `Build #${data} ${new Date().toLocaleDateString()}`;
        console.log(version);

        indexHtml.source = indexHtml.source
          .toString()
          .replace(/version="(.*?)"/gm, `version="${version}"`);
      }
    },
  };
};

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        name: 'Midis Student',
        short_name: 'midis-app',
        start_url: '.',
        display: 'standalone',
        description: 'Мидис клиент для portal.midis.info',
        background_color: '#222222',
        theme_color: '#141414',
        orientation: 'portrait-primary',
        icons: [48, 72, 96, 144, 168, 192].map((size) => ({
          src: `icons/${size}.png`,
          sizes: `${size}x${size}`,
          type: 'image/png',
        })),
      },
      devOptions: {
        enabled: true,
      },
    }),
    versioning(),
  ],
});
