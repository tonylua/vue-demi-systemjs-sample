// function enableShadowCss(config) {
//   const configs = [config.module.rule("vue").use("vue-loader")];
//   // based on common rules returned by `vue inspect`
//   const ruleSets = ["css", "postcss", "scss", "sass", "less", "stylus"];
//   const ruleNames = ["vue-modules", "vue", "normal-modules", "normal"];
//
//   ruleSets.forEach((ruleSet) => {
//     if (config.module.rules.store.has(ruleSet)) {
//       ruleNames.forEach((rName) => {
//         if (config.module.rule(ruleSet).oneOfs.store.has(rName)) {
//           if (
//             config.module
//               .rule(ruleSet)
//               .oneOf(rName)
//               .uses.store.has("vue-style-loader")
//           ) {
//             configs.push(
//               config.module.rule(ruleSet).oneOf(rName).use("vue-style-loader")
//             );
//           }
//         }
//       });
//     }
//   });
//   if (!process.env.BUILD_MODE) {
//     process.env.BUILD_MODE = config.store.get("mode");
//   }
//   configs.forEach((c) =>
//     c.tap((options) => {
//       options.shadowMode = true;
//       return options;
//     })
//   );
// }

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
  // chainWebpack: (config) => {
  //   enableShadowCss(config);
  // },
  css: {
    sourceMap: true,
    extract: false,
  },
};
