<template>
  <div class="pollHome">
    <div class="pollList" ref="scrollComponent">
      <div class="poll" v-for="poll in polls" :key="poll.id">
        <div class="pollHead">
          <h3>{{ poll.title }}</h3>
          <div class="pollIcons">
            <span @click="deletePoll(poll.id)"
              ><i class="fa fa-trash"></i
            ></span>
            <span @click="showPoll(polls.indexOf(poll))"
              ><i class="fa fa-pen"></i
            ></span>
          </div>
        </div>
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
      <button class="addPollBtn" @click="showAddPoll">Add a new poll</button>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from "vue";
import { pollApi } from "../composables/pollApi.js";
export default {
  name: "pollList",
  setup() {
    const {
      polls,
      showAddPoll,
      isState,
      showPoll,
      handleScroll,
      scrollComponent,
      deletePoll,
    } = pollApi();

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      polls,
      showAddPoll,
      isState,
      showPoll,
      scrollComponent,
      deletePoll,
    };
  },
};
</script>