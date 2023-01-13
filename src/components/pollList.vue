<template>
  <div class="pollHome">
    <div class="pollList">
      <div class="poll" v-for="poll in polls" :key="poll.id">
        <h3>
          {{ poll.title }}
          <span class="pollIcons">
            <span><i class="fa fa-trash"></i></span>
            <span @click="showPoll(polls.indexOf(poll))"
              ><i class="fa fa-pen"></i
            ></span>
          </span>
        </h3>
        <div
          class="pollOptions"
          v-for="option in poll.optionList"
          :key="option.Id"
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
          <span>{{ option.optionTitle }} </span>
          <span>Votes: {{ option.voteCount.length }} </span>
        </div>
      </div>
    </div>
    <div class="addPoll">
      <button class="addPollBtn" @click.prevent="showAddPoll">
        Add a new poll
      </button>
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