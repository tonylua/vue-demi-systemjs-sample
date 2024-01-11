import { isVue2 as l, h as c, defineComponent as a, computed as d } from "vue-demi";
const m = (o) => o ? Object.entries(o).reduce((r, [e, t]) => (e = e.charAt(0).toUpperCase() + e.slice(1), e = `on${e}`, { ...r, [e]: t }), {}) : null, n = (o, r = {}, e) => {
  if (l)
    return c(o, r, e);
  const { props: t, domProps: s, on: i, ...u } = r;
  return c(
    o,
    { ...u, ...t, ...s, ...m(i) },
    e
  );
}, p = `
    border: 1px solid var(--vue3-color, #336699);
    border-radius: 10px;
    width: 300px;
    box-sizing: border-box;
    padding: 20px;
`, g = a({
  props: {
    city: {
      type: String,
      default: "unknown"
    },
    temperature: Number
  },
  setup(o, { emit: r }) {
    const e = d(() => `${o.temperature || "--"}℃`), t = l ? 2 : 3;
    window.globalVar1 = "vue3GlobalVar1", console.log(
      "🇵🇸 setup 3",
      t,
      // @ts-ignore
      window.globalVar1,
      // @ts-ignore
      window.__CONTEXT_NAME__,
      // @ts-ignore
      window.__COMPONENT_HOST_VUE_VERSION__
    );
    const s = () => {
      console.log("onClick", o.city), r("msg", o.city);
    };
    return () => n(
      "div",
      {
        class: "consumer",
        style: p,
        on: {
          click: s
        }
      },
      [
        n("h1", {
          style: "color: #336699",
          domProps: {
            innerHTML: "&lt;vue3-weather-consumer/&gt;"
          }
        }),
        `${o.city}: ${e.value}`,
        n("hr"),
        n(
          "div",
          {
            class: "el-foo-bar custom-style"
          },
          `i am running in Vue${t}`
        )
      ]
    );
  }
});
console.log(
  "v3c",
  g
  // Vue.version,
  // Vue === window.Vue,
  // Vue === window.Vue3,
  // VueDemi,
  // VueDemi.isVue2,
  // @ts-ignore
  // VueDemi === window.VueDemi
);
export {
  g as default
};
