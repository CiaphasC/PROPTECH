import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: "index.html",
        prueba: "prueba.html",
      },
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          three: ["three"],
          icons: ["lucide-react"],
        },
      },
    },
  },
});
