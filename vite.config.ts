import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Ensure it listens on a port that DigitalOcean supports
    host: true, // Allows external access
  },
  preview: {
    port: 3000, // Ensure preview mode also runs on the right port
    host: true,
    allowedHosts: [
      "www.onukpa.com",
      "onukpa.com",
      "https://onukpa-oecb7.ondigitalocean.app",
    ],
  },
});
