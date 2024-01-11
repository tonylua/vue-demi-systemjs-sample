const path = require("path");

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    ...(process.env.NODE_ENV === "production"
      ? {
          externals: {
            vue: "Vue2",
            "vue-demi": "vue-demi",
          },
        }
      : {}),
    optimization: {
      // splitChunks: false,
      minimize: false,
    },
    resolve: {
      alias: {
        "h-demi": path.resolve(__dirname, "../../src/utils/h-demi"),
      },
    },
  },
  // filenameHashing: false,
  pages: {
    "vue2-weather-consumer": {
      entry: "src/main.js",
      filename: "index.html",
    },
  },
  css: {
    sourceMap: true,
    extract: false,
  },
};
