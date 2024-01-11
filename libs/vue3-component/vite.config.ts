import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    vue({
      // template: {
      //   compilerOptions: {
      //     isCustomElement: (tag) => tag.includes("-"),
      //   },
      // },
    }),
  ],
  build: {
    lib: {
      entry: "./src/main.ts",
      name: "vue3-weather-consumer",
      fileName: "vue3-weather-consumer",
    },
    rollupOptions: {
      external: ["vue-demi"],
      // output: {
      //   globals: {
      //     vue: "Vue3",
      //   },
      // },
    },
  },
  define: {
    "process.env": process.env,
  },
  resolve: {
    alias: {
      "h-demi": path.resolve(__dirname, "../../src/utils/h-demi"),
    },
  },
});
