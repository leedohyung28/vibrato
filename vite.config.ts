import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      svgr({
        svgrOptions: {},
      }),
    ],
    server: {
      proxy: {
        "/auth": {
          target: "http://localhost:8080",
          changeOrigin: true,
        },
        "/search": {
          target: "http://localhost:8080",
          changeOrigin: true,
        },
        "/follows": {
          target: "http://localhost:8080",
          changeOrigin: true,
        },
        "/reviews": {
          target: "http://localhost:8080",
          changeOrigin: true,
        },
        "/review": {
          target: "http://localhost:8080",
          changeOrigin: true,
        },
        "/newmusic": {
          target: "http://localhost:8080",
          changeOrigin: true,
        },
      },
    },
    base: "",
    define: {
      VITE_API_BASE_URL: JSON.stringify(
        process.env.VITE_API_BASE_URL || "http://localhost:8080"
      ),
    },
  };
});
