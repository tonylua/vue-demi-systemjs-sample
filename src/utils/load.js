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
  {
    url: "/react@18.2.0.js",
    onload: () => {
      console.log("react", window.React.version);
    },
  },
  {
    url: "/react-dom@18.2.0.js",
  },
  { url: "/@systemjs/system.min.js" },
  { url: "/@systemjs/extras/amd.min.js" },
  { url: "/@systemjs/extras/global.min.js" },
  { url: "/@systemjs/extras/module-types.min.js" },
  { url: "/@systemjs/extras/named-register.min.js" },
  { url: "/@systemjs/extras/use-default.min.js" },
];

export function loadBaseDeps(index = 0, callback = () => {}) {
  if (index >= deps.length) {
    console.log("All scripts loaded");
    return;
  }
  const script = document.createElement("script");
  script.src = deps[index].url;
  script.onload = function () {
    deps[index].onload?.();
    callback(deps, index);
    loadBaseDeps(index + 1, callback); // Load the next script
  };
  document.body.appendChild(script);
}

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

export const loadStyle = (url) => {
  const s = document.createElement("link");
  s.rel = "stylesheet";
  s.type = "text/css";
  s.href = url;
  document.head.appendChild(s);
};

export const loadPrefetch = (url) => {
  const s = document.createElement("link");
  s.rel = "preload";
  s.as = "script";
  s.href = url;
  document.head.appendChild(s);
  console.log("prefetch", url);
};
