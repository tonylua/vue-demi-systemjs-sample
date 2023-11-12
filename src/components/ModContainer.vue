<template>
  <div class="mod-container" :class="{ loaded: ready }">
    <component v-if="ready" :is="mod" v-bind="$attrs" v-on="$listeners" />
    <span v-else>⏳ loading...</span>
  </div>
</template>

<script>
import { loadComponent, loadStyle, loadPrefetch } from "../utils/load";

export default {
  name: "ModContainer",
  props: {
    src: {
      type: String,
      required: true,
    },
    assets: {
      type: Array,
      default: () => [],
    },
    hostName: {
      type: String,
      default: "",
    },
    dependenciesReady: {
      type: Boolean,
      default: false,
    },
    preFetch: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      preFetchedMod: null,
      mod: null,
    };
  },
  computed: {
    ready() {
      return this.dependenciesReady && !!this.mod;
    },
  },
  methods: {
    async doFetch() {
      const res = await loadComponent(this.src, {
        hostName: this.hostName,
      });
      return res.default || res;
    },
  },
  async created() {
    if (this.preFetch) {
      loadPrefetch(this.src);
    }

    this.$watch(
      () => this.dependenciesReady,
      async (ready) => {
        if (!ready) return;

        window.Vue = window.Vue2;

        const res = await loadComponent(this.src);
        if (!res) {
          console.log(res);
          return;
        }
        const comp = res.default || res;
        this.mod = comp;
        console.log("mod-container component loaded", comp, window.Vue.version);

        this.assets
          ?.filter((asset) => /\.css$/.test(asset))
          .forEach((asset) => {
            loadStyle(asset);
            console.log("mod-container asset loaded", asset);
          });
      },
      { immediate: true }
    );
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
