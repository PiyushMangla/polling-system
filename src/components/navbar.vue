<template>
  <nav>
    <h1 class="title">Polling System</h1>
    <div class="home" v-if="user">
      <router-link to="/home">Logged in as {{ user.firstName }} </router-link>
      <button @click="logout">logout</button>
    </div>
    <div class="logins" v-if="!user">
      <router-link to="/">Login</router-link>
      <router-link to="/signup">Signup</router-link>
    </div>
  </nav>
</template>

<script>
import { loginApi } from "../composables/loginApi.js";
export default {
  name: "navBar",
  setup() {
    return { ...loginApi() };
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