import { defineConfig } from "vite";
import sassPlugin from "vite-plugin-sass";

export default defineConfig({
  plugins: [sassPlugin()],
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  server: {
    open: true,
  },
  preview: {
    port: 4173,
  },
});
