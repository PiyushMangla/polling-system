<template>
  <div class="pollWrapper">
    <div class="wrap"></div>
    <div class="pollForm" v-if="poll">
      <div class="pollwrap"></div>
      <label class="pollLabel" :for="poll">Update the title of the poll:</label>
      <input type="text" class="pollInput" v-model="poll.title" />
      <span class="errors">{{ titleUpdateErr }} </span>
      <div>
        <button class="pollButton" @click="updateTitle(poll.title, id)">
          Update poll
        </button>
        <button class="pollButton" @click="viewPolls">Cancel</button>
      </div>
    </div>
    <div class="wrap"></div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { pollApi } from "../composables/pollApi.js";
import { useStore } from "vuex";
export default {
  name: "updatePoll",
  setup() {
    const { poll, viewPolls, updateTitle , titleUpdateErr } = pollApi();
    const store = useStore();
    const route = useRoute();
    const { id } = route.params;

    onMounted(async () => {
      await store.dispatch("getSinglePoll", {
        pollId: id,
      });
      console.log(poll.value);
    });

    return { poll, viewPolls, updateTitle, id ,titleUpdateErr };
  },
};
</script>

<style lang="scss" scoped>
</style>