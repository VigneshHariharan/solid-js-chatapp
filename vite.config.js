import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { splitVendorChunkPlugin } from "vite";

export default defineConfig({
  plugins: [solidPlugin(), splitVendorChunkPlugin()],

  server: {
    port: 3000,
  },

  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser",
    },
  },
  build: {
    target: "esnext",
    rollupOptions: {
      treeshake: "smallest",
    },
  },
});
