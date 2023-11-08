module.exports = {
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
