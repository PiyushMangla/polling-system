import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    role: null,
    user: null,
    polls: null,
    poll: null,
    signupError : null
  },
  mutations: {
    setRole: (state, payload) => {
      state.role = payload
    },
    setUser: (state, payload) => {
      state.user = payload
      console.log("user state changed", state.user)
    },
    countVote: (state, { keyA, keyB }) => {
      state.polls[keyB].options[keyA].vote += 1
    },
    setPoll: (state, key) => {
      state.poll = state.polls[key]
    }
  },
  actions: {

    //for role
    async getRole({ commit }) {
      try {
        const res = await axios.get("https://pollapi.innotechteam.in/role/list")
        const data = res.data
        commit('setRole', data)
      } catch (error) {
        console.log(error)
      }
    },

    //for signup
    async signup({state},{ email, firstName, lastName, roleId, password }) {
      try {
        await axios.post("https://pollapi.innotechteam.in/user/register",
          { email: email, firstName: firstName, lastName: lastName, roleId: roleId, password: password })
      } catch (error) {
        state.signupError =error
      }
    },
    //for login
    async login({state},{ email, password }) {
      try {
       await axios.post("https://pollapi.innotechteam.in/user/login",
          { email: email, password: password })       
      } catch (error) {
       console.log(error,state)
      }
    }
  },
})

export default store