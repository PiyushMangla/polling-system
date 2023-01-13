<template>
  <div class="poll">
    <h3 @click="viewPolls">{{ poll.title }}</h3>
    <div class="pollOptions" v-for="option in poll.optionList" :key="option.Id">
      <input
        type="checkbox"
        value="true"
        v-model="option.isState"
        :disabled="option.isState"
        @change="
          countVote(
            poll.options.indexOf(option),
            polls.indexOf(poll),
            isChecked
          )
        "
      />
      <span>{{ option.optionTitle }} </span>
      <span>Votes: {{ option.voteCount.length }} </span>
    </div>
  </div>
</template>

<script>
import { pollApi } from "../composables/pollApi.js";
export default {
  name: "showPoll",
  setup() {
    return { ...pollApi() };
  },
};
</script>
