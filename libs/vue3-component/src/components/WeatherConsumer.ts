// vue 3 component
import { defineComponent, computed, isVue2 } from "vue-demi";
import h from "h-demi";

const Sty = `
    border: 1px solid var(--vue3-color, #336699);
    border-radius: 10px;
    width: 300px;
    box-sizing: border-box;
    padding: 20px;
`;

interface IProps {
  city: string;
  temperature?: number;
}

interface IEmit {
  (e: "msg", value: string): void;
}

export default defineComponent({
  props: {
    city: {
      type: String,
      default: "unknown",
    },
    temperature: Number,
  },
  setup(props: IProps, { emit }: { emit: IEmit }) {
    const centigrade = computed(() => `${props.temperature || "--"}℃`);
    const vueVer = isVue2 ? 2 : 3;

    // @ts-ignore
    window.globalVar1 = "vue3GlobalVar1";
    console.log(
      "🇵🇸 setup 3",
      vueVer,
      // @ts-ignore
      window.globalVar1,
      // @ts-ignore
      window.__CONTEXT_NAME__,
      // @ts-ignore
      window.__COMPONENT_HOST_VUE_VERSION__
    );

    const onClick = () => {
      console.log("onClick", props.city);
      emit("msg", props.city);
    };

    return () =>
      h(
        "div",
        {
          class: "consumer",
          style: Sty,
          on: {
            click: onClick,
          },
        },
        [
          h("h1", {
            style: "color: #336699",
            domProps: {
              innerHTML: "&lt;vue3-weather-consumer/&gt;",
            },
          }),
          `${props.city}: ${centigrade.value}`,
          h("hr"),
          h(
            "div",
            {
              class: "el-foo-bar custom-style",
            },
            `i am running in Vue${vueVer}`
          ),
        ]
      );
  },
});
