import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: "index.html",
        appearance: "appearance.html",
        making: "making.html",
        living: "living.html",
      },
    },
  },
});
