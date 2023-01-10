<template>
  <nav>
    <h1 class="title">Polling System</h1>
    <div class="home" v-if="user">
      <router-link to="/home">Logged in as {{ user.username }}</router-link>
      <button @click.prevent="logout">logout</button>
    </div>
    <div class="logins" v-if="!user">
      <router-link to="/">Login</router-link>
      <router-link to="/signin">Signin</router-link>
    </div>
  </nav>
</template>

<script>
import { loginApi } from "../composables/loginApi.js";
export default {
  name: "navBar",
  setup() {
    const { user, logout } = loginApi();

    return { user, logout };
  },
};
</script>

<style scoped>
button {
  background-color: #6ca2d3;
  padding: 10px 20px;
  color: white;
  border-radius: 20px;
  border: none;
  cursor: pointer;
}
</style>