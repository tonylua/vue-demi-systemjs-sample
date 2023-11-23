/**
 * @typedef {Object} ScopedStyleOptions
 * @property {boolean} [isPrepare]
 * @property {string[]} [whitelist] - 允许透传的全局样式
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

/**
 * style元素是否包含模块本身的scoped样式
 * @param {string[]} datasetList - 模块根元素上的dataset集合
 * @param {HTMLStyleElement} styleTag - head中的`<style />`元素
 * @returns {boolean}
 */
const isSelfScopedStyle = (datasetList, styleTag) =>
  datasetList.length &&
  datasetList.some((attr) => styleTag.textContent.includes(attr));

/**
 * 将祖先元素scoped样式中包含的白名单样式转换为shadowDOM下可用
 * @param {HTMLElement} moduleWrapper
 * @param {string[]} whitelist
 * @param {HTMLStyleElement} styleTag
 * @returns {HTMLStyleElement}
 */
const transAncestorWhitelistScoped = (moduleWrapper, whitelist, styleTag) => {
  const clone = styleTag.cloneNode(true);
  let cont = clone.textContent;
  let dom = moduleWrapper;
  let matched = {};
  while ((dom = dom.parentNode)) {
    if (dom instanceof HTMLDocument) break;
    if (dom instanceof ShadowRoot) {
      dom = dom.host;
      if (!dom) continue;
    }
    const datasets = findDatasetAttrs(dom);
    if (
      datasets?.some((ds) => {
        return whitelist?.some((cls) => {
          const clsWithHash = `\\.${cls}\\[${ds}\\]`;
          const re = new RegExp(clsWithHash);
          const match = re.test(cont);
          if (match)
            matched[clsWithHash.replace(/\\+/g, "")] = { re, to: `.${cls}` };
          return match;
        });
      })
    ) {
      break;
    }
  }
  if (Object.keys(matched).length) {
    Object.values(matched).forEach(({ re, to }) => {
      cont = cont.replace(new RegExp(re, "g"), to);
    });
    clone.textContent = cont;
  }
  return clone;
};

/**
 * style元素是否包含白名单允许透传的样式
 * @param {string[]} whitelist - 允许透传的全局样式
 * @param {HTMLStyleElement} styleTag - head中的`<style />`元素
 * @returns {boolean}
 */
const isWhitelistStyle = (whitelist, styleTag) =>
  whitelist?.length &&
  whitelist.some((cls) => styleTag.textContent.includes(cls));

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
    includeAncestorScopedWhitelist: false,
    ...options,
  };

  const wrapperAttrs = findDatasetAttrs(moduleWrapper);
  const moduleArrts = findDatasetAttrs(moduleWrapper.firstElementChild).filter(
    (attr) => !wrapperAttrs.includes(attr)
  );

  const allStyles = Array.prototype.filter.call(document.head.children, (tag) =>
    /^style$/i.test(tag.tagName)
  );
  let restStyles = allStyles;
  const getRest = (excludes = []) =>
    restStyles.filter((sty) => !excludes.includes(sty));

  const selfScopedStyles = restStyles.filter((tag) =>
    isSelfScopedStyle(moduleArrts, tag)
  );
  restStyles = getRest(selfScopedStyles);
  selfScopedStyles
    .map((tag) => tag.cloneNode(true))
    .forEach((tag) => hostElement.appendChild(tag));
  // selfScopedStyles.forEach((tag) => tag.parentNode.removeChild(tag));

  const whiteStyles = restStyles.filter((tag) =>
    isWhitelistStyle(options.whitelist, tag)
  );
  restStyles = getRest(whiteStyles);
  whiteStyles
    .map((tag) =>
      options.includeAncestorScopedWhitelist
        ? transAncestorWhitelistScoped(moduleWrapper, options.whitelist, tag)
        : tag.cloneNode(true)
    )
    .forEach((tag) => hostElement.appendChild(tag));
  // whiteStyles.forEach((tag) => tag.parentNode.removeChild(tag));

  // TODO 全局el-样式
  console.log("rest", restStyles);
  // TODO styled-component 动态演算的样式无法拷贝
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
