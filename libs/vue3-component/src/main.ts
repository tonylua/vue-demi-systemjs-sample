import WeatherConsumer from "./components/WeatherConsumer";
// import * as Vue from "vue";
// import VueDemi from "vue-demi";
console.log(
  "v3c",
  WeatherConsumer
  // Vue.version,
  // Vue === window.Vue,
  // Vue === window.Vue3,
  // VueDemi,
  // VueDemi.isVue2,
  // @ts-ignore
  // VueDemi === window.VueDemi
);

// const install = function (Vue) {
//   console.log("v3c install", Vue.version);
//   if (install.installed) return;
//   Vue.component(WeatherConsumer.name, WeatherConsumer);
//   if (typeof window !== "undefined" && window.Vue) install(window.Vue);
// };
// WeatherConsumer.install = install;

export default WeatherConsumer;
