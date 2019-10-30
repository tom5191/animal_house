<template>
  <div id="app">
    <Login />
  </div>
</template>

<script>
import Login from "./components/Login";

export default {
  name: "app",
  components: {
    Login
  }
};
</script>

<style>
#app {
  margin: auto;
  height: auto;
  width: 100%;
}
</style>
