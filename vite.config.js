import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname, "src"),
  plugins: [],

  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,

    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/index.html"),
        projects: path.resolve(__dirname, "src/projects.html"),
      },
    },
  },

  server: {
    port: 5173,
  },
});
