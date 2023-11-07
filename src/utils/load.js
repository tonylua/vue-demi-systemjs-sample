import * as VueDemi from "vue-demi";

const deps = [
  {
    url: "/vue@2.6.14.js",
    onload: () => {
      window.Vue2 = window.Vue;
      console.log("v2", window.Vue2.version);
    },
  },
  {
    url: "/vue@3.2.21.js",
    onload: () => {
      window.Vue3 = window.Vue;
      console.log("v3", window.Vue3.version);
    },
  },
  { url: "/@systemjs/system.min.js" },
  { url: "/@systemjs/extras/amd.min.js" },
  { url: "/@systemjs/extras/global.min.js" },
  { url: "/@systemjs/extras/module-types.min.js" },
  { url: "/@systemjs/extras/named-register.min.js" },
  { url: "/@systemjs/extras/use-default.min.js" },
];

function loadDeps(index = 0) {
  if (index >= deps.length) {
    console.log("All scripts loaded");
    return;
  }
  const script = document.createElement("script");
  script.src = deps[index].url;
  script.onload = function () {
    console.log(`${deps[index].url} loaded`);
    deps[index].onload?.();
    loadDeps(index + 1); // Load the next script
  };
  document.body.appendChild(script);
}

loadDeps();

export const loadComponent = async (url) => {
  if (!window.System._importMapAdded) {
    const VueCompositionAPI = await import("@vue/composition-api");
    window.VueCompositionAPI = VueCompositionAPI;

    window.System.set("app:Vue", window.Vue2);
    window.System.set("app:VueDemi", VueDemi);
    window.System.addImportMap({
      imports: {
        vue: "app:Vue",
        "vue-demi": "app:VueDemi",
      },
    });
    window.System._importMapAdded = true;
  }
  console.log(
    "systemjs load: ",
    url,
    window.VueDemi,
    window.System._importMapAdded
  );
  return window.System.import(url);
};
