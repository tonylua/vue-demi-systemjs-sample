<template>
  <div class="mod-container">
    <component :is="mod" v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
import { loadComponent } from "../utils/load";

export default {
  name: "ModContainer",
  props: {
    src: String,
  },
  data() {
    return {
      mod: null,
    };
  },
  mounted() {
    setTimeout(async () => {
      const comp = await loadComponent(this.src);
      console.log("mod-container comp loaded", comp);
      this.mod = comp;
    }, 1000);
  },
};
</script>

<style scoped></style>
