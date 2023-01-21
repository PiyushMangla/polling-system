<template>
  <div class="formWrapper">
    <div class="wrap"></div>
    <form @submit.prevent="handleLogin">
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
      <span class="errors">{{ loginError }} </span>
      <button class="formBtn" :disabled="loginBtn">
        Log In
        <span v-if="isLoading"><i class="fa fa-spinner fa-spin"></i></span>
      </button>
    </form>
    <div class="wrap"></div>
  </div>
</template>

<script>
import { loginApi } from "../composables/loginApi.js";
import { watchEffect } from "vue";
export default {
  name: "logIn",
  setup() {
    const { loginBtn, isLoading, loginError, handleLogin, signUser } =
      loginApi();

    watchEffect(() => {
      if (signUser.email && signUser.password) {
        loginBtn.value = false;
      } else {
        loginBtn.value = true;
      }
    });

    return { loginBtn, isLoading, loginError, handleLogin, signUser };
  },
};
</script>
