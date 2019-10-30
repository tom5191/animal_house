<template>
  <div id="container">
    <div >
      <h1>Animal House</h1>
    </div>
      <form @submit="submitLogin">
        <md-field>
          <label >Username:</label>
          <md-input type="text" v-model="username" id="username" placeholder="username" required></md-input>
        </md-field>
        <md-field>
          <label>Password:</label>
          <md-input type="password" v-model="password" id="password" required></md-input>
        </md-field>
        <div>
          <md-button class="md-dense">Login</md-button>
        </div>
        <div>
          <a>Forgot password?</a>
        </div>
      </form>
    </div>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    username: "",
    password: ""
  }),
  methods: {
    submitLogin() {
      
    }
  }
};
</script>

<style scoped>
#container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height:50rem;
  width:100%;
  text-align: center;
}

#container > form {
  width:25rem;
}
</style>