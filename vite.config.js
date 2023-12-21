import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      // Proxying API requests for Weather API
      "/weather-api": {
        target: "https://api.weatherapi.com/v1/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/weather-api/, ""),
      },
      // Proxying API requests for Tomorrow.io
      "/tomorrow-api": {
        target: "https://api.tomorrow.io/v4/weather/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tomorrow-api/, ""),
      },
    },
  },
});
