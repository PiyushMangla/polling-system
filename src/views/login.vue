<template>
  <div class="formWrapper">
    <div class="wrap"></div>
    <form>
      <h3>Log In</h3>

      <label class="formLabel">User Name:</label>
      <input
        type="text"
        class="formInput"
        placeholder="Enter user Name"
        v-model="userName"
        required
      />

      <label for="userName" class="formLabel">Password:</label>
      <input
        type="password"
        class="formInput"
        placeholder="Enter password"
        v-model="password"
        required
      />

      <button class="formBtn">Log In</button>
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
