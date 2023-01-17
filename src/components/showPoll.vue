<template>
  <div class="poll" v-if="poll">
    <div class="pollBackIcon">
      <span @click="viewPolls"
        ><i class="fa-sharp fa-solid fa-arrow-left"></i
      ></span>
    </div>
    <div class="pollHead">
      <h3>{{ poll.title }}</h3>
    </div>
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
  <div v-else class="showLoader">
    <i class="fa fa-spinner fa-spin"></i>
  </div>
</template>

<script>
import { pollApi } from "../composables/pollApi.js";
import { onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  name: "showPoll",
  setup() {
    const { poll, viewPolls } = pollApi();
    const store = useStore();
    const route = useRoute();

    const { id } = route.params;

    onMounted(async () => {
      await store.dispatch("getSinglePoll", {
        pollId: id,
      });
    });
    return { poll, viewPolls };
  },
};
</script>

<style scoped>
.pollBackIcon {
  font-size: 30px;
  color: #9cada9;
  transition: margin-left 2s, font-size 2s;
  margin-left: 20px;
}
.pollBackIcon:hover {
  color: #2c3e50;
  font-size: 35px;
  margin-left: 0px;
}
.showLoader {
  margin-left: 100px;
  margin-top: 100px;
  font-size: 60px;
  color: #2c3e50;
}
</style>
