<template>
  <div class="pollWrapper">
    <div class="wrap"></div>
    <div class="pollForm">
      <div class="pollwrap"></div>
      <label class="pollLabel">Update the option of the poll:</label>
      <input type="text" class="pollInput" v-model="title" />
      <span class="errors">{{ titleUpdateErr }} </span>
      <div>
        <button class="pollButton" @click="updatePollOpt(id, title)">
          Update Option
        </button>
        <button class="pollButton" @click="viewPolls">Cancel</button>
      </div>
    </div>
    <div class="wrap"></div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { pollApi } from "../composables/pollApi.js";
export default {
  name: "updatePoll",
  setup() {
    const { poll, viewPolls, updatePollOpt, titleUpdateErr } = pollApi();
    const route = useRoute();
    const { id } = route.params;
    const { title } = route.params;

    return { poll, viewPolls, title, id, updatePollOpt, titleUpdateErr };
  },
};
</script>

<style lang="scss" scoped>
</style>