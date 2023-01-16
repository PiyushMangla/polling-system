<template>
  <div class="container">
    <navBar />
    <router-view />
  </div>
</template>

<script>
import navBar from "./components/navbar.vue";
import axios from "axios";
export default {
  name: "App",
  components: { navBar },
  created() {
    axios.interceptors.request.use((config) => {
      config.headers.token = JSON.parse(localStorage.getItem("userToken"));
      return config;
    });
  },
};
</script>
