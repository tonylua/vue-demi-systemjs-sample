import { defineComponent as s, computed as u, h as o, isVue2 as n } from "vue-demi";
const l = `
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
  setup(e, { emit: r }) {
    const c = u(() => `${e.temperature || "--"}℃`), i = n ? 2 : 3, t = () => {
      console.log("onClick", e.city), r("msg", e.city);
    };
    return () => o(
      "div",
      {
        class: "consumer",
        style: l,
        ...n ? {
          on: {
            click: t
          }
        } : {
          onClick: t
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
        `i am running in Vue${i}`
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
