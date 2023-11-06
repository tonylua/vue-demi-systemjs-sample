<template>
  <div id="app">
    <h1>This is a Vue 2.x Weather Provider</h1>
    <!-- <vue3-compo city="南京" :temperature="15" @msg="onMsg" /> -->
    <mod-container
      src="/vue3-component/dist/vue3-weather-consumer.umd.js"
      city="北京"
      :temperature="5"
      @msg="onMsg"
    />
  </div>
</template>

<script>
import ModContainer from "./components/ModContainer.vue";
// import Vue3Compo from "./vue3-weather-consumer.umd";

export default {
  name: "App",
  components: {
    ModContainer,
    // Vue3Compo,
  },
  methods: {
    onMsg(msg) {
      alert(msg);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
