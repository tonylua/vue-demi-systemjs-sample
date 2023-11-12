import { defineComponent as s, computed as u, h as o, isVue2 as i } from "vue-demi";
const a = `
    border: 1px solid var(--vue3-color, #336699);
    border-radius: 10px;
    width: 300px;
    box-sizing: border-box;
    padding: 20px;
`, d = s({
  props: {
    city: {
      type: String,
      default: "unknown"
    },
    temperature: Number
  },
  setup(e, { emit: l }) {
    var t;
    const c = u(() => `${e.temperature || "--"}℃`), n = i ? 2 : 3;
    window.globalVar1 = "vue3GlobalVar1", (t = window.__RAW_WINDOW__) == null || t.console.log("setup3", n, window.globalVar1);
    const r = () => {
      console.log("onClick", e.city), l("msg", e.city);
    };
    return () => o(
      "div",
      {
        class: "consumer",
        style: a,
        ...i ? {
          on: {
            click: r
          }
        } : {
          onClick: r
        }
      },
      [
        o("h1", {
          style: "color: #336699",
          domProps: {
            innerHTML: "&lt;vue3-weather-consumer/&gt;"
          }
        }),
        `${e.city}: ${c.value}`,
        o("hr"),
        `i am running in Vue${n}`
      ]
    );
  }
});
console.log(
  "v3c",
  d
  // Vue.version,
  // Vue === window.Vue,
  // Vue === window.Vue3,
  // VueDemi,
  // VueDemi.isVue2,
  // @ts-ignore
  // VueDemi === window.VueDemi
);
export {
  d as default
};
