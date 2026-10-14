import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/socket.io": {
        target: "https://bloggee-test-app-backend.onrender.com",
        ws: true,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "socket.io-client": "socket.io-client/dist/socket.io.js",
    },
  },
  build: {
    sourcemap: true,
    minify: "esbuild",
  },
});
