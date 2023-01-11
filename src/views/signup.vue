<template>
  <div class="formWrapper">
    <div class="wrap"></div>
    <form @submit.prevent="handleSignup">
      <h3>Signup for new User</h3>

      <label class="formLabel">First Name:</label>
      <input
        type="text"
        class="formInput"
        placeholder="Enter firstname"
        v-model="userName"
        required
      />

        <label class="formLabel">Last Name:</label>
      <input
        type="text"
        class="formInput"
        placeholder="Enter lastname"
        v-model="userName"
        required
      />

       <label class="formLabel">Email:</label>
      <input
        type="email"
        class="formInput"
        placeholder="Enter lastname"
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

      <label for="userName" class="formLabel">Role:</label>
      <select class="formRole">
        <option >Select A Role</option>
        <template v-for="role in roles" :key="role.id">
        <option >{{role.name}}</option>
        </template>
      </select>

      <button class="formBtn">Sign Up</button>
    </form>
    <div class="wrap"></div>
  </div>
</template>

<script>
import { loginApi } from "../composables/loginApi";
export default {
  name: "signIn",
  setup() {
    return { ...loginApi() };
  },
};
</script>
