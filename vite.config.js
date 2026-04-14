import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    outDir: "dist",
    sourcemap: true,
    cssCodeSplit: true,
  },
  server: {
    open: true,
  },
  preview: {
    port: 4173,
  },
});
