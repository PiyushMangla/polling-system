<template>
  <div class="pollWrapper">
    <div class="wrap"></div>
    <div class="pollForm">
      <label class="pollLabel">Poll Title :</label>
      <input
        type="text"
        class="pollInput"
        placeholder="add a poll title"
        v-model="newPoll.title"
      />

      <label class="pollLabel">Poll options : </label>
      <input
        type="text"
        class="pollInput"
        placeholder="add option for poll"
        v-model="option"
        @keyup="addOptions"
      />

      <h4 class="addError">{{ addError }}</h4>

      <div>
        <button class="pollButton" @click="addNewPoll">Add New Poll</button>
        <button class="pollButton" @click="viewPolls">Cancel</button>
      </div>
    </div>
    <div class="wrap"></div>
  </div>
</template>

<script>
import { pollApi } from "../composables/pollApi.js";
export default {
  name: "addPoll",
  setup() {
    return { ...pollApi() };
  },
};
</script>
