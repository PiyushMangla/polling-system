<template>
  <div class="formWrapper">
    <form>
      <h3>Signin for new User</h3>

      <label class="formLabel">User Name:</label>
      <input type="text" class="formInput" required />

      <label for="userName" class="formLabel">Password:</label>
      <input type="password" class="formInput" required />

      <label class="formLabel">Role:</label>
      <div class="formRadio">
        <input type="radio" value="guest" /><label>Guest</label>
      </div>

      <div class="formRadio">
        <input type="radio" value="admin" /> <label>Admin</label>
      </div>

      <button class="formBtn">Sign In</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "signIn",
  setup() {},
};
</script>
