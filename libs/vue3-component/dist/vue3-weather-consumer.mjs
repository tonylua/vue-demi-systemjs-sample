import { defineComponent as c, computed as s, h as o, isVue2 as r } from "vue-demi";
const u = `
    border: 1px solid var(--vue3-color, #336699);
    border-radius: 10px;
    width: 300px;
    box-sizing: border-box;
    padding: 20px;
`, a = c({
  props: {
    city: {
      type: String,
      default: "unknown"
    },
    temperature: Number
  },
  setup(e, { emit: i }) {
    const l = s(() => `${e.temperature || "--"}℃`), n = r ? 2 : 3;
    window.globalVar1 = "vue3GlobalVar1", console.log(
      "🇵🇸 setup 3",
      n,
      // @ts-ignore
      window.globalVar1,
      // @ts-ignore
      window.__CONTEXT_NAME__,
      // @ts-ignore
      window.__COMPONENT_HOST_VUE_VERSION__
    );
    const t = () => {
      console.log("onClick", e.city), i("msg", e.city);
    };
    return () => o(
      "div",
      {
        class: "consumer",
        style: u,
        ...r ? {
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
        `${e.city}: ${l.value}`,
        o("hr"),
        o(
          "div",
          {
            class: "custom-style"
          },
          `i am running in Vue${n}`
        )
      ]
    );
  }
});
console.log(
  "v3c",
  a
  // Vue.version,
  // Vue === window.Vue,
  // Vue === window.Vue3,
  // VueDemi,
  // VueDemi.isVue2,
  // @ts-ignore
  // VueDemi === window.VueDemi
);
export {
  a as default
};
