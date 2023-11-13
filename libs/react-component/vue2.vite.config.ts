import { resolve } from "path";
import vue2 from "@vitejs/plugin-vue2";
import { defineConfig, loadEnv, ResolvedConfig } from "vite";

const env = loadEnv("production", process.cwd(), "");

export default defineConfig({
  define: {
    "process.<wbr>env": env,
  },
  plugins: [
    vue2(),
    (function () {
      let viteConfig: ResolvedConfig;
      return {
        name: "vite-plugin-vue-fix-react-env",
        configResolved(resolvedConfig) {
          viteConfig = resolvedConfig;
        },
        transform(code) {
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
    outDir: resolve(__dirname, "./dist/vue2/"),
    lib: {
      entry: resolve(__dirname, "./vue-wrapper/v2.js"),
      name: "v2react-weather-consumer",
      fileName: "v2react-weather-consumer",
    },
    rollupOptions: {
      external: ["React"],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css")
            return "v2react-weather-consumer.css";
          return assetInfo.name;
        },
      },
    },
  },
});
