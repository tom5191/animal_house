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
* {
  padding: 0;
  margin: 0;
}
body {
  padding:0;
  margin:0;
}
#app {
  width: 100%;
}
</style>
