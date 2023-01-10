<template>
  <div class="formWrapper">
    <form @submit.prevent="handleSignin">
      <h3>Signin for new User</h3>

      <label class="formLabel">User Name:</label>
      <input
        type="text"
        class="formInput"
        placeholder="Enter username"
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

      <label class="formLabel">Role:</label>
      <div class="formRadio">
        <input type="radio" value="guest" id="guest" v-model="role" /><label
          >Guest</label
        >
      </div>

      <div class="formRadio">
        <input type="radio" value="admin" id="admin" v-model="role" />
        <label>Admin</label>
      </div>

      <button class="formBtn">Sign In</button>
    </form>
  </div>
</template>

<script>
import { loginApi } from "../composables/loginApi";
export default {
  name: "signIn",
  setup() {
    const { userName, password, role, handleSignin } = loginApi();

    return { userName, password, role, handleSignin };
  },
};
</script>
