import { resolve } from "path";
// import vue3 from "@vitejs/plugin-vue";
import veauryVitePlugins from "veaury/vite/index.js";
import { defineConfig, loadEnv, ResolvedConfig } from "vite";

const env = loadEnv("production", process.cwd(), "");

export default defineConfig({
  define: {
    "process.<wbr>env": env,
  },
  plugins: [
    // vue3(),
    veauryVitePlugins({
      type: "vue",
    }),
    (function () {
      let viteConfig: ResolvedConfig;
      return {
        name: "vite-plugin-vue-fix-react-env",
        configResolved(resolvedConfig: ResolvedConfig) {
          viteConfig = resolvedConfig;
        },
        transform(code: string) {
          if (viteConfig.command === "build") {
            const re = new RegExp("process.env.NODE_ENV", "g");
            code = code.replace(re, '"production"');
          }
          return code;
        },
      };
    })(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "./vue-wrapper/v3.js"),
      name: "v3react-weather-consumer",
      fileName: "v3react-weather-consumer",
    },
    rollupOptions: {
      external: ["React"],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css")
            return "v3react-weather-consumer.css";
          return assetInfo.name;
        },
      },
    },
  },
});
