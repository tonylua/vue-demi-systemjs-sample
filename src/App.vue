<template>
  <div id="app">
    <h1>Vue 2.x Host Page</h1>
    <h2>-- Weather Provider</h2>

    <!-- <vue3-compo city="南京" :temperature="15" @msg="onMsg" /> -->

    <div class="mod-box">
      <mod-container
        src="/vue2-weather-consumer.umd.js"
        city="石家庄"
        :temperature="3"
        @msg="onMsg"
      />
      <mod-container
        src="/vue3-weather-consumer.umd.js"
        city="北京"
        :temperature="5"
        @msg="onMsg"
      />
    </div>
    <!-- <mod-container src="/non-composition.umd.js" /> -->
    <!-- <local-sample city="蚌埠" :temperature="9" @msg="onMsg" /> -->
  </div>
</template>

<script>
import ModContainer from "./components/ModContainer.vue";
// import LocalSample from "./components/LocalSample.js";

export default {
  name: "App",
  components: {
    ModContainer,
    // LocalSample,
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
</style>
