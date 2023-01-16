<template>
  <div class="toastWrap">
    <div class="toastContent"><slot name="content"></slot></div>
    <button class="toastBtn" @click="formSubmit">OK</button>
  </div>
</template>

<script>
import { loginApi } from "../composables/loginApi.js";
export default {
  name: "successToast",
  setup() {
    return { ...loginApi() };
  },
};
</script>

<style lang="scss" scoped>
</style>