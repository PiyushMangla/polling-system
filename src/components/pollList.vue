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
            @change="countVote(option.id, isChecked)"
            @click="option.voteCount.length += 1"
          />
          <span>{{ option.optionTitle }} </span>
          <span>Votes: {{ option.voteCount.length }} </span>
          <span
            @click="showPollOpt(option.id, option.optionTitle)"
            class="optIcon"
            ><i class="fas fa-edit"></i
          ></span>
          <span
            class="optIcon"
            @click="deletePollOpt(option.id)"
            v-if="poll.optionList.length > 3"
            ><i class="fas fa-trash"></i
          ></span>
        </div>
      </div>
    </div>
    <div class="addPoll" v-if="showAddBtn">
      <button class="addPollBtn" @click="showAddPoll">Add a new poll</button>
    </div>
  </div>
  <div v-else class="showLoader">
    <h3>Reload the page or try again loging in</h3>
    <i class="fa fa-spinner fa-spin"></i>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";
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
      countVote,
      showPollOpt,
      deletePollOpt,
    } = pollApi();
    const store = useStore();
    const showAddBtn = ref(false);

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    //to show polls
    onMounted(async () => {
      store.state.polls = [];
      store.state.pollPage = 1;
      store.state.scrollState = true;
      await store.dispatch("getPolls", {
        pollPage: pollPage.value,
      });
      console.log(polls.value);
    });

    onMounted(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.roleId === 1) {
        showAddBtn.value = true;
      }
    });

    return {
      polls,
      showAddPoll,
      isState,
      showPoll,
      scrollComponent,
      deletePoll,
      showUpdatePoll,
      countVote,
      showPollOpt,
      deletePollOpt,
      showAddBtn,
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
.optIcon {
  margin-left: 12px;
  color: lightsteelblue;
  transition: font-size 1s;
}
.optIcon:hover {
  font-size: 25px;
  color: #2c3e50;
}
</style>