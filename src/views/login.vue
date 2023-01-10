<template>
  <div class="formWrapper">
    <form>
      <h3>Log In</h3>

      <label class="formLabel">User Name:</label>
      <input type="text" class="formInput" required />

      <label for="userName" class="formLabel">Password:</label>
      <input type="password" class="formInput" required />

      <button class="formBtn">Log In</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "logIn",
  setup() {},
};
</script>
