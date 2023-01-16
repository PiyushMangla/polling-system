<template>
  <div class="formWrapper">
    <div class="wrap"></div>
    <form @submit.prevent="handleSignup">
      <h3>Signup for new User</h3>

      <label class="formLabel">First Name:</label>
      <input type="text" class="formInput" placeholder="Enter firstname" v-model="signUser.firstName" required />

      <label class="formLabel">Last Name:</label>
      <input type="text" class="formInput" placeholder="Enter lastname" v-model="signUser.lastName" required />

      <label class="formLabel">Email:</label>
      <input type="email" class="formInput" placeholder="Enter Email" v-model="signUser.email" required />

      <label for="userName" class="formLabel">Password:</label>
      <input type="password" class="formInput" placeholder="Enter password" v-model="signUser.password" required />

      <label for="userName" class="formLabel">Role:</label>
      <select class="formRole" v-model="signUser.roleId" required>
        <option>Select A Role</option>
        <template v-for="role in roles" :key="role.id">
          <option :value="role.id">{{ role.name }}</option>
        </template>
      </select>
      <span class="errors">{{ signUpErr }}</span>
      <button class="formBtn">
        Sign Up
        <span v-if="isLoading"><i class="fa fa-spinner fa-spin"></i></span>
      </button>
    </form>
    <div class="wrap"></div>
    <successToast class="successToast" v-if="isSubmitted">
      <template v-slot:content>You have successfully registered</template>
    </successToast>
  </div>
</template>

<script>
import { loginApi } from "../composables/loginApi";
import successToast from "../components/successToast.vue";
export default {
  name: "signIn",
  components: { successToast },
  setup() {
    return { ...loginApi() };
  },
};
</script>
