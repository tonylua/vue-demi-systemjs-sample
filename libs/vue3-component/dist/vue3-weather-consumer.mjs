import { defineComponent as u, computed as s, h as o, isVue2 as n } from "vue-demi";
const l = u({
  props: {
    city: {
      type: String,
      default: "unknown"
    },
    temperature: Number
  },
  setup(e, { emit: t }) {
    const c = s(() => `${e.temperature || "--"}℃`), i = n ? 2 : 3, r = () => {
      console.log("onClick", e.city), t("msg", e.city);
    };
    return () => o(
      "div",
      {
        class: "consumer",
        ...n ? {
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
        `i am running in Vue${i}`
      ]
    );
  },
  style: `
    .consumer {
      border: 1px solid var(--vue3-color, #336699);
      border-radius: 10px;
      width: 300px;
      box-sizing: border-box;
      padding: 20px;
    }
  `
});
console.log(
  "v3c",
  l
  // Vue.version,
  // Vue === window.Vue,
  // Vue === window.Vue3,
  // VueDemi,
  // VueDemi.isVue2,
  // @ts-ignore
  // VueDemi === window.VueDemi
);
export {
  l as default
};
