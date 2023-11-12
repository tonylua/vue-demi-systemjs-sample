import * as VueDemi from "vue-demi";
import ProxySandbox from "./sandbox/ProxySandbox";
// import { stringLiteral, expressionStatement } from "@babel/types";
import { code } from "@babel/template";
import generator from "@babel/generator";
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

window.ProxySandbox = ProxySandbox;

const resolvePromisesSeq = async (tasks) => {
  const results = [];
  for (const task of tasks) {
    results.push(await task);
  }
  return results;
};

const systemJsDeps = [
  { url: "/@systemjs/system.min.js" },
  { url: "/@systemjs/extras/amd.min.js" },
  { url: "/@systemjs/extras/global.min.js" },
  { url: "/@systemjs/extras/module-types.min.js" },
  { url: "/@systemjs/extras/named-register.min.js" },
  { url: "/@systemjs/extras/use-default.min.js" },
];

const frameworkDeps = [
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
  // ...systemJsDeps,
];

function _loadDep(dep) {
  return new Promise((resolve, reject) => {
    const { url, onload } = dep;
    const script = document.createElement("script");
    script.src = url;
    script.onload = function () {
      resolve(onload ? onload(dep) || dep : dep);
    };
    script.onerror = function (ex) {
      reject(ex);
    };
    document.body.appendChild(script);
  });
}

export async function loadBaseDeps() {
  const items = await resolvePromisesSeq(frameworkDeps.map(_loadDep));
  console.log(items.length + " scripts loaded");
  return items;
}

export async function loadSystemjsDeps() {
  await resolvePromisesSeq(systemJsDeps.map(_loadDep));
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
  return window.System;
}

/**
 * @typedef {Object} LoadComponentOptiosn
 * @property {string} hostName - 宿主系统标识
 * @property {boolean} sandbox - 是否沙箱隔离JS
 */
/**
 * 加载组件
 * @param {string} url
 * @param {LoadComponentOptiosn} [options]
 * @return {Promise<Object>}
 */
export const loadComponent = async (url, options) => {
  // if (!window.System) throw new Error("no systemjs");

  console.log(
    "systemjs load: ",
    options,
    url,
    window.VueDemi
    // window.System._importMapAdded
  );

  options = {
    hostName: "",
    sandbox: true,
    ...options,
  };

  let res;
  // if (options.sandbox) {
  //   const id = "sandbox_" + btoa(url);
  //   const sandbox = new ProxySandbox(id);
  //   res = (async function (window) {
  //     sandbox.active();
  //
  //     window.__COMPONENT_HOST_NAME__ = options.hostName;
  //     window.__COMPONENT_HOST_VUE_VERSION__ = VueDemi.isVue2
  //       ? window.Vue2?.version || 2
  //       : window.Vue3?.version || 3;
  //     window.__CONTEXT_NAME__ = id;
  //     window.__RAW_WINDOW__ = sandbox.globalContext;
  //
  //     const sysjs = await loadSystemjsDeps();
  //     global.VueDemi = window.VueDemi;
  //     console.log(
  //       window,
  //       window.VueDemi,
  //       self,
  //       self.VueDemi,
  //       global,
  //       window.__RAW_WINDOW__
  //     );
  //     return sysjs.import(url);
  //     // let modCont = await fetch(url).then((r) => r.text());
  //     // // modCont.replace(/self\./, "window.");
  //     // // console.log(url, modCont);
  //     // return module2Component(modCont);
  //     // const umdFn = eval(modCont);
  //     // console.log(typeof umdFn, 1111);
  //     // const mod = umdFn();
  //     // return Promise.resolve(mod);
  //   })(sandbox.proxy);
  // } else {
  await loadSystemjsDeps();
  // res = window.System.import(url);
  // }
  let modCont = await fetch(url).then((r) => r.text());

  const ast = parser.parse(modCont, {
    sourceType: "script",
  });
  let functionCounter = 0;
  traverse(ast, {
    enter(path) {
      if (path.node.type === "FunctionExpression") {
        functionCounter++;
        if (functionCounter === 2) {
          const { start, end } = path.node;
          let source = modCont.slice(start, end);
          source = source.replace(/{/, "{console.log('abc');");
          source = source.replace(/}$/, "console.log('123');}");
          path.replaceWithSourceString(source);
        }
      }
    },
  });
  modCont = generator(ast, {}, code).code;
  // console.log(modCont, 3333);
  res = module2Component(modCont);

  return res;
};

export const module2Component = async (moduleContent) => {
  const dataUrl = `data:text/javascript;charset=utf-8;base64,${btoa(
    unescape(encodeURIComponent(moduleContent))
  )}`;
  const res = await window.System.import(dataUrl);
  return res.default || res;
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
