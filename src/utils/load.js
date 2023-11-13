import * as VueDemi from "vue-demi";
import { wrapModuleWithSandbox } from "./content";

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
  console.log("systemjs load: ", options, url, window.VueDemi);

  options = {
    hostName: "",
    sandbox: true,
    ...options,
  };

  await loadSystemjsDeps();

  let modCont = await fetch(url).then((r) => r.text());
  const sandboxId = "sandbox_" + btoa(url);
  modCont = wrapModuleWithSandbox(sandboxId, modCont, {
    __CONTEXT_NAME__: sandboxId,
    __COMPONENT_HOST_NAME__: options.hostName,
    __COMPONENT_HOST_VUE_VERSION__: VueDemi.isVue2
      ? window.Vue2?.version || 2
      : window.Vue3?.version || 3,
  });
  const res = module2Component(modCont);

  return res;
};

export const module2Component = async (moduleContent) => {
  const dataUrl = `data:text/javascript;charset=utf-8;base64,${btoa(
    unescape(encodeURIComponent(moduleContent))
  )}`;
  const res = await window.System.import(dataUrl);
  return res.default || res;
};

export const loadStyle = (url, target = document.head) => {
  const s = document.createElement("link");
  s.rel = "stylesheet";
  s.type = "text/css";
  s.href = url;
  target.appendChild(s);
};

const findDatasetAttrs = (dom) =>
  Array.from(dom.attributes)
    .filter((attr) => /^data-/.test(attr.name))
    .map((tag) => tag.name);

export const copyScopedStyle = (shadow, wrapperDom) => {
  const attrs0 = findDatasetAttrs(wrapperDom);
  const attrs1 = findDatasetAttrs(wrapperDom.firstElementChild).filter(
    (attr) => !attrs0.includes(attr)
  );
  const tags = Array.prototype.filter
    .call(document.head.children, (tag) => /^style$/i.test(tag.tagName))
    .filter(
      (tag) =>
        attrs1.length && attrs1.some((attr) => tag.textContent.includes(attr))
    );
  tags
    .map((tag) => tag.cloneNode(true))
    .forEach((tag) => shadow.appendChild(tag));
  tags.forEach((tag) => tag.parentNode.removeChild(tag));

  // TODO styled-component 动态演算的样式无法拷贝
};

export const loadPrefetch = (url) => {
  const s = document.createElement("link");
  s.rel = "preload";
  s.as = "script";
  s.href = url;
  document.head.appendChild(s);
  console.log("prefetch", url);
};
