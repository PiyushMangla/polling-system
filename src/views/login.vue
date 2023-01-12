<template>
  <div class="formWrapper">
    <div class="wrap"></div>
    <form>
      <h3>Log In</h3>

      <label class="formLabel">Email Id:</label>
      <input
        type="email"
        class="formInput"
        placeholder="Enter Email"
        v-model="signUser.email"
        required
      />

      <label for="userName" class="formLabel">Password:</label>
      <input
        type="password"
        class="formInput"
        placeholder="Enter password"
        v-model="signUser.password"
        required
      />
      <span class="Error">{{ loginError }} </span>
      <button class="formBtn" @click.prevent="handleLogin">Log In</button>
    </form>
    <div class="wrap"></div>
  </div>
</template>

<script>
import { loginApi } from "../composables/loginApi.js";
export default {
  name: "logIn",
  setup() {
    return { ...loginApi() };
  },
};
</script>
