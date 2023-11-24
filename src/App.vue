<template>
  <div id="app">
    <h1>Vue 2.x Host Page</h1>
    <h2>-- Weather Provider</h2>

    <div class="mod-box">
      <mod-container
        host-name="app1"
        src="/vue2-weather-consumer.umd.js"
        :dependencies-ready="depsFinished"
        :temperature="3"
        city="石家庄"
        @msg="onMsg"
        :classname-whitelist="['custom-style']"
      />
      <mod-container
        pre-fetch
        host-name="app1"
        src="/vue3-weather-consumer.umd.js"
        :dependencies-ready="depsFinished"
        :temperature="5"
        city="北京"
        @msg="onMsg"
      />
      <mod-container
        css-scoped
        host-name="app1"
        src="/v2react-weather-consumer.umd.js"
        :dependencies-ready="depsFinished"
        :assets="['/v2react-weather-consumer.css']"
        :temperature="-12"
        city="锡林郭勒"
        @msg="onMsg"
      />
    </div>
    <span v-if="!depsFinished">loading deps...</span>
  </div>
</template>

<script>
import { loadBaseDeps } from "./utils/load";
import ModContainer from "./components/ModContainer.vue";

export default {
  name: "App",
  components: {
    ModContainer,
  },
  data() {
    return {
      depsFinished: false,
    };
  },
  methods: {
    onMsg(msg) {
      alert(msg);
    },
  },
  mounted() {
    loadBaseDeps().then((deps) => {
      console.log(deps.map((dep) => `${dep.url} loaded`).join("\n"));
      this.depsFinished = true;
    });
  },
};
</script>

<style>
#app {
  --vue3-color: #ff0000;
  --vue2-color: #338811;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.mod-box {
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.mod-box > div {
  flex-basis: 33%;
}

.custom-style {
  color: pink;
}
</style>

<style lang="css">
.el-foo-bar {
  transform: rotate(-3deg);
}
</style>

<style scoped>
.custom-style {
  color: green;
}
.vue2-consumer h1 {
  font-size: 26px;
  text-decoration: underline;
  font-style: italic;
}
</style>
