<template>
  <div class="pollWrapper">
    <div class="wrap"></div>
    <div class="pollForm">
      <div class="pollwrap"></div>
      <label class="pollLabel">Poll Title :</label>
      <input
        type="text"
        class="pollInput"
        placeholder="add a poll title"
        v-model="newPoll.title"
      />
      <label class="pollLabel">Poll options : </label>
      <div class="inputWrap">
        <input
          type="text"
          class="pollInput"
          placeholder="add option for poll"
          v-model="option"
        />
        <div class="pollIcon" @click="addOptions">
          <i class="fa fa-add"></i>
        </div>
      </div>

      <div v-for="option in newPoll.options" :key="option" class="pollOption">
        <h4>{{ option }} 
          <span @click="deleteNewopt(option)"><i class="fa fa-trash" ></i></span>
          <span @click="updateNewopt(option)"><i class="fa fa-pen" ></i></span>
        </h4>
      </div>

      <h4 class="Error">{{ addError }}</h4>

      <div>
        <button class="pollButton" @click.prevent="addNewPoll">Add New Poll</button>
        <button class="pollButton" @click.prevent="viewPolls">Cancel</button>
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
