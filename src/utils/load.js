const _loadJS = (url, onload) => {
  const s = document.createElement("script");
  s.type = "text/javascript";
  s.src = url;
  s.defer = "defer";
  if (typeof onload === "function") s.onload = onload;
  document.head.appendChild(s);
};
_loadJS("/@systemjs/system.min.js");
_loadJS("/@systemjs/extras/amd.min.js");
_loadJS("/@systemjs/extras/global.min.js");
_loadJS("/@systemjs/extras/module-types.min.js");
_loadJS("/@systemjs/extras/named-register.min.js");
_loadJS("/@systemjs/extras/use-default.min.js");

export const loadComponent = (url) => {
  if (!window.System._importMapAdded) {
    window.System.addImportMap({
      imports: {
        vue: window.Vue3,
        // "vue-demi": window.VueDemi,
        "vue-demi": "https://unpkg.com/vue-demi@0.14.6/lib/index.iife.js",
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
