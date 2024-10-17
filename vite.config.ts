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
          target: "https://vibrato1.shop",
          changeOrigin: true,
        },
        "/search": {
          target: "https://vibrato1.shop",
          changeOrigin: true,
        },
        "/follows": {
          target: "https://vibrato1.shop",
          changeOrigin: true,
        },
        "/reviews": {
          target: "https://vibrato1.shop",
          changeOrigin: true,
        },
        "/review": {
          target: "https://vibrato1.shop",
          changeOrigin: true,
        },
        "/newmusic": {
          target: "https://vibrato1.shop",
          changeOrigin: true,
        },
      },
    },
    base: "",
    define: {
      VITE_API_BASE_URL: JSON.stringify(
        process.env.VITE_API_BASE_URL || "https://vibrato1.shop"
      ),
    },
  };
});
