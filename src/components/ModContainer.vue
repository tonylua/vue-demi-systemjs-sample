<template>
  <div class="mod-container" :class="{ loaded: !!mod }">
    <component v-if="!!mod" :is="mod" v-bind="$attrs" v-on="$listeners" />
    <span v-else>⏳ loading...</span>
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
  created() {
    // window.VueCompositionAPI = VueCompositionAPI;
  },
  mounted() {
    setTimeout(async () => {
      window.Vue = window.Vue2;
      const res = await loadComponent(this.src);
      const comp = res.default || res;
      // this.mod = window.VueDemi.defineComponent(comp);
      this.mod = comp;
      console.log("mod-container comp loaded", comp, window.Vue.version);
    }, 2000);
  },
};
</script>

<style scoped>
.mod-container {
  min-width: 50px;
  min-height: 50px;
  background-color: #ccc;
}
.mod-container.loaded {
  background-color: transparent;
}
</style>
