/**
 * @typedef {string[] | RegExp[]} WhiteList
 */

/**
 * @typedef {Object} ScopedStyleOptions
 * @property {boolean} [isPrepare]
 * @property {WhiteList} [whitelist] - 允许透传的全局样式
 * @property {WhiteList} [globalWhitelist] - 允许默认全局透传的样式
 * @property {boolean} [includeAncestorScopedWhitelist] - 祖先元素scoped样式中包含的白名单样式是否生效
 */

/**
 * 获取DOM结点上的dataset属性
 * @param {HTMLElement} dom
 * @returns {string[]}
 */
const findDatasetAttrs = (dom) =>
  Array.from(dom.attributes)
    .filter((attr) => /^data-/.test(attr.name))
    .map((tag) => tag.name);

// /**
//  * 遍历元素和子元素得到样式名集合
//  * @param {HTMLElement} ele
//  * @returns {string[]}
//  */
// const collectElemsClass = (ele) => {
//   let classnames = [];
//   for (let child of ele.children) {
//     classnames = [...classnames, ...collectElemsClass(child)];
//   }
//   classnames = [...classnames, ...Array.from(ele.classList)];
//   return classnames;
// };

/**
 * style元素是否包含模块本身的scoped样式
 * @param {HTMLElement} moduleWrapper
 * @param {HTMLStyleElement} styleTag - head中的`<style />`元素
 * @returns {boolean}
 */
const isSelfScopedStyle = (moduleWrapper, styleTag) => {
  const wrapperAttrs = findDatasetAttrs(moduleWrapper);
  const moduleArrts = findDatasetAttrs(moduleWrapper.firstElementChild).filter(
    (attr) => !wrapperAttrs.includes(attr)
  );
  return (
    moduleArrts.length &&
    moduleArrts.some((attr) => styleTag.textContent.includes(attr))
  );
};

// /**
//  * style元素是否包含模块本身相关的全局元素，如 `el-` 等
//  * @param {HTMLElement} moduleWrapper
//  * @param {HTMLStyleElement} styleTag - head中的`<style />`元素
//  * @returns {boolean}
//  */
// const isSelfGlobalStyle = (moduleWrapper, styleTag) =>
//   collectElemsClass(moduleWrapper)?.some((cls) =>
//     styleTag.textContent.includes(cls)
//   );

/**
 * 将祖先元素scoped样式中包含的白名单样式转换为shadowDOM下可用
 * @param {HTMLElement} moduleWrapper
 * @property {WhiteList} [whitelist] - 允许透传的全局样式
 * @param {HTMLStyleElement} styleTag
 * @returns {HTMLStyleElement}
 */
const transAncestorWhitelistScoped = (moduleWrapper, whitelist, styleTag) => {
  const clone = styleTag.cloneNode(true);
  let cont = clone.textContent;
  let dom = moduleWrapper;
  let matched = {};
  while ((dom = dom.parentNode)) {
    if (dom instanceof Document) break;
    if (dom instanceof ShadowRoot) {
      dom = dom.host;
      if (!dom) continue;
    }
    const datasets = findDatasetAttrs(dom);
    if (
      datasets?.some((ds) => {
        return whitelist?.some((whiteItem) => {
          const matchWL =
            whiteItem instanceof RegExp
              ? new RegExp(whiteItem).test(cont)
              : cont.includes(`.${whiteItem}`);
          const match = matchWL && cont.includes(`[${ds}]`);
          if (match) matched[ds] = { ds, whiteItem };
          // const clsWithHash = `\\.${cls}\\[${ds}\\]`;
          // const re = new RegExp(clsWithHash);
          // const match = re.test(cont);
          // if (match)
          //   matched[clsWithHash.replace(/\\+/g, "")] = { re, to: `.${cls}` };
          return match;
        });
      })
    ) {
      break;
    }
  }
  if (Object.keys(matched).length) {
    Object.values(matched).forEach(({ ds, cls }) => {
      cont = cont.replace(new RegExp(`\\[${ds}\\]`, "g"), "");
      cont = cont.replace(new RegExp(`\\.${cls}`, "g"), ":host");
    });
    // Object.values(matched).forEach(({ re, to }) => {
    //   cont = cont.replace(new RegExp(re, "g"), to);
    // });
    clone.textContent = cont;
  }
  return clone;
};

/**
 * style元素是否包含白名单允许透传的样式
 * @property {WhiteList} [whitelist] - 允许透传的全局样式
 * @param {HTMLStyleElement} styleTag - head中的`<style />`元素
 * @returns {boolean}
 */
const isWhitelistStyle = (whitelist, styleTag) =>
  whitelist?.some((whiteItem) =>
    whiteItem instanceof RegExp
      ? new RegExp(whiteItem).test(styleTag.textContent)
      : styleTag.textContent.includes(`.${whiteItem}`)
  );

const isStyleElement = (tag) => /^style$/i.test(tag.tagName);

const isLinkElement = (tag) =>
  /^link$/i.test(tag.tagName) &&
  (tag.type === "text/css" || tag.rel === "stylesheet");

/**
 * 将head中的样式搬运到shadowDOM下
 * @param {HTMLElement} hostElement - shadowDOM 实际挂载的元素
 * @param {HTMLElement} moduleWrapper - 组件原本的父元素
 * @param {ScopedStyleOptions} [options]
 * @returns {Void}
 */
const moveScopedStyle = (hostElement, moduleWrapper, options) => {
  options = {
    isPrepare: false,
    whitelist: [],
    globalWhitelist: [],
    includeAncestorScopedWhitelist: false,
    ...options,
  };

  const _append = (tag, clone = true) => {
    const clonedTag = clone ? tag.cloneNode(true) : tag;
    hostElement.appendChild(clonedTag);
  };

  const _appendWL = (tag, whitelist) =>
    _append(
      options.includeAncestorScopedWhitelist
        ? transAncestorWhitelistScoped(moduleWrapper, whitelist, tag)
        : tag.cloneNode(true)
    );

  Array.from(document.head.children)
    .filter((tag) => isStyleElement(tag) || isLinkElement(tag))
    .forEach((tag) => {
      if (isLinkElement(tag) || isSelfScopedStyle(moduleWrapper, tag)) {
        _append(tag);
      } else if (isWhitelistStyle(options.whitelist, tag)) {
        _appendWL(tag, options.whitelist);
      } else if (isWhitelistStyle(options.globalWhitelist, tag)) {
        _appendWL(tag, options.globalWhitelist);
      }
    });
};

/**
 * 处理scoped样式
 * @param {HTMLElement} hostElement - shadowDOM 实际挂载的元素
 * @param {HTMLElement} moduleWrapper - 组件原本的父元素
 * @param {ScopedStyleOptions} [options]
 * @returns {Void}
 */
export const handleScopedStyle = (hostElement, moduleWrapper, options) => {
  const shadow =
    hostElement.shadowRoot || hostElement.attachShadow({ mode: "open" });
  if (options.isPrepare) {
    shadow.appendChild(moduleWrapper);
  } else {
    moveScopedStyle(shadow, moduleWrapper, options);
  }
  return shadow;
};
