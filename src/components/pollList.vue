<template>
  <div class="pollHome" v-if="polls">
    <div class="pollList" ref="scrollComponent">
      <div class="poll" v-for="poll in polls" :key="poll.id">
        <div class="pollHead">
          <h3>{{ poll.title }}</h3>
          <div class="pollIcons">
            <span @click="deletePoll(poll.id)"
              ><i class="fa fa-trash"></i
            ></span>
            <span @click="showUpdatePoll(poll.id)"
              ><i class="fas fa-edit"></i
            ></span>
            <span @click="showPoll(poll.id)"
              ><i class="fa-solid fa-arrow-right"></i
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
  <div v-else class="showLoader">
    <h3>Reload the page</h3>
    <i class="fa fa-spinner fa-spin"></i>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from "vue";
import { pollApi } from "../composables/pollApi.js";
import { useStore } from "vuex";
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
      pollPage,
      showUpdatePoll,
    } = pollApi();
    const store = useStore();

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    // to show polls
    onMounted(async () => {
      await store.dispatch("getPolls", {
        pollPage: pollPage.value,
      });
      console.log(polls.value);
    });

    return {
      polls,
      showAddPoll,
      isState,
      showPoll,
      scrollComponent,
      deletePoll,
      showUpdatePoll,
    };
  },
};
</script>

<style scoped>
.showLoader {
  margin-left: 100px;
  margin-top: 100px;
  font-size: 60px;
  color: #2c3e50;
}
</style>