<script>
// vue 2 component
import { defineComponent, h, computed, isVue2 } from "vue-demi";

export default defineComponent({
  props: {
    city: {
      type: String,
      default: "unknown",
    },
    temperature: Number,
  },
  setup(props, { emit }) {
    const vueVer = isVue2 ? 2 : 3;

    console.log("setup", vueVer);

    const centigrade = computed(() => `${props.temperature || "--"}℃`);
    const onClick = () => {
      console.log("onClick", props.city);
      emit("msg", props.city);
    };

    return () =>
      h(
        "div",
        {
          class: "consumer",
          ...(isVue2
            ? {
                on: {
                  click: onClick,
                },
              }
            : {
                onClick: onClick,
              }),
        },
        [
          h("h1", {
            style: "color: #336699",
            domProps: {
              innerHTML: "&lt;vue2-weather-consumer/&gt;",
            },
          }),
          `${props.city}: ${centigrade.value}`,
          h("hr"),
          `i am running in Vue${vueVer}`,
        ]
      );
  },
  style: `
  `,
});
</script>

<style scoped>
.consumer {
  border: 1px solid var(--vue2-color, #000);
  border-radius: 10px;
  width: 300px;
  box-sizing: border-box;
  padding: 20px;
}
</style>
