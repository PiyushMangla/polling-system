import { createStore } from 'vuex'
import axios from 'axios'
console.log(process.env.VUE_APP_BASE_URL + process.env.VUE_APP_POLLLIST_API)
const store = createStore({
  state: {
    roles: null,
    user: null,
    userToken: null,
    polls: null,
    poll: null,
    signupError: null,
    signErr: null,
    loginError: null
  },
  mutations: {
    setRoles: (state, payload) => {
      state.roles = payload
    },
    setUser: (state) => {
      state.user = JSON.parse(localStorage.getItem('user'))
    },
    setToken: (state) => {
      state.user = JSON.parse(localStorage.getItem('userToken'))
    },
    setPolls: (state, payload) => {
      state.polls = payload
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
    async getRoles({ commit }) {
      try {
        const res = await axios.get(process.env.VUE_APP_BASE_URL + process.env.VUE_APP_ROLEAPI)
        const data = res.data
        commit('setRoles', data)
      } catch (error) {
        console.log(error)
      }
    },

    //for signup
    async signup({ state }, { email, firstName, lastName, roleId, password }) {
      try {
        state.signErr = null
        state.signupError = null
        await axios.post(process.env.VUE_APP_BASE_URL + process.env.VUE_APP_SiGNUP_API,
          { email: email, firstName: firstName, lastName: lastName, roleId: roleId, password: password })
      } catch (error) {
        if (error.response.data.errors) {
          state.signupError = error.response.data.errors
        }
        else {
          state.signErr = error.response.data
          state.signupError = null
        }
      }
    },

    //for login
    async login({ state}, { email, password }) {
      try {
        await axios.post(process.env.VUE_APP_BASE_URL + process.env.VUE_APP_LOGIN_API,
          { email: email, password: password }).then(res => {
            localStorage.setItem('userToken', JSON.stringify(res.data.token))
            localStorage.setItem('user', JSON.stringify(res.data.user))
            state.loginError = null
          })
      } catch (error) {
        state.loginError = error.response.data.message
      }
    },

    //for polls list
    async getPolls({ state, commit },) {
      try {
        await axios.get(process.env.VUE_APP_BASE_URL + process.env.VUE_APP_POLLLIST_API,
          {
            headers: {
              'token': state.userToken
            }
          }).then(res => {
            commit('setPolls', res.data)
            console.log(state.polls)
          })
      } catch (error) {
        console.log(error)
      }
    }
  },
})

export default store