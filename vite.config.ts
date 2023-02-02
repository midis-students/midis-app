import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      manifest: {
        name: "Мидис Студент",
        short_name: "midis-app",
        start_url: ".",
        display: "standalone",
        description: "Мидис клиент для portal.midis.info",
        background_color: "#f5f5f5",
        theme_color: "#ff7c0a",
        orientation: "portrait-primary",
        icons: [48, 72, 96, 144, 168, 192].map((size) => ({
          src: `icons/${size}.png`,
          sizes: `${size}x${size}`,
          type: "image/png",
        })),
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve("src"),
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
});
