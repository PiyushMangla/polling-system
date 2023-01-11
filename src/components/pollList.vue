<template>
hello
  <div class="home">
    <div class="pollList">
      <div class="poll" v-for="poll in polls" :key="poll.id">
        <h3 @click="showPoll(polls.indexOf(poll))">{{ poll.title }}</h3>
        <div
          class="pollOptions"
          v-for="option in poll.options"
          :key="option.vote"
        >
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
          <span>{{ option.option }} </span>
          <span>Votes: {{ option.vote }} </span>
        </div>
      </div>
    </div>
    <div class="addPoll">
      <button class="addPollBtn" @click="showAddPoll">Add a new poll</button>
    </div>
  </div>
</template>

<script>
import { pollApi } from "../composables/pollApi.js";
export default {
  name: "pollList",
  setup() {
    return { ...pollApi() };
  },
};
</script>