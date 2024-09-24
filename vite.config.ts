import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {},
    }),
  ],
  define: {
    VITE_SPOTIFY_CLIENT_ID: JSON.stringify(" f02dbdc5d74f4b9aa10fcc00ae912943"),
    VITE_SPOTIFY_CLIENT_SECRET: JSON.stringify(
      "de85e1845047418ab6811a2eb034afc0"
    ),
    VITE_SPOTIFY_REDIRECT_URI: JSON.stringify("http://localhost:5173/callback"),
  },
});
