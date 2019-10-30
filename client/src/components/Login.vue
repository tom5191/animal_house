<template>
  <div class="md-layout">
    <h1>Animal House</h1>
    <div class="md-layout-item">
      <form @submit="submitLogin">
        <md-field>
          <label>Username:</label>
          <md-input type="text" v-model="username" id="username" placeholder="username" required></md-input>
        </md-field>
        <md-field>
          <label>Password:</label>
          <md-input type="password" v-model="password" id="password" required></md-input>
        </md-field>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    username: "",
    password: ""
  })
};
</script>

<style scoped>
div {
  margin: auto;
  text-align: center;
  background: #00f;
}
h1 {
  text-align: center;
}
form {
  width: 20rem;
}
</style>