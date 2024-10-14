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
        "/auth": { target: "http://localhost:8080", changeOrigin: true },
        "/search": {
          target: "http://localhost:8080", // 백엔드 서버 주소
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/search/, "/search"),
        },
      },
    },
    base: "",
    define: {
      VITE_API_BASE_URL: JSON.stringify(process.env.VITE_API_BASE_URL || ""),
      VITE_SPOTIFY_CLIENT_ID: JSON.stringify(
        process.env.VITE_SPOTIFY_CLIENT_ID || ""
      ),
      VITE_SPOTIFY_CLIENT_SECRET: JSON.stringify(
        process.env.VITE_SPOTIFY_CLIENT_SECRET || ""
      ),
      VITE_SPOTIFY_REDIRECT_URI: JSON.stringify(
        process.env.VITE_SPOTIFY_REDIRECT_URI || ""
      ),
    },
  };
});
