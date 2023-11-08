const path = require("path");

// craco error cannot find module 'react-scripts/package.json'
// https://juejin.cn/s/craco%20error%20cannot%20find%20module%20'react-scripts%2Fpackage.json'

module.exports = {
  webpack: {
    configure: (config, { env, paths }) => {
      config.output = {
        filename: "react-weather-consumer.js",
        path: path.resolve(__dirname, "build"),
      };
      if (env === "production") {
        config.externals = {
          react: "React",
          "react-dom": "ReactDOM",
        };
      }
      return config;
    },
  },
};
