<template>
  <nav>
    <h1 class="title">Polling System</h1>
    <div class="home">
      <router-link to="/">Home</router-link>
    </div>
    <div class="logins">
      <router-link to="/login">Login</router-link>
      <router-link to="/signin">Signin</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navBar",
  setup() {},
};
</script>