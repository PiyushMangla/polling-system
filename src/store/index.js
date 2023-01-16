import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    roles: null,
    user: null,
    userToken: null,
    polls: null,
    poll: null,
    signupError: null,
    signErr: null,
    loginError: null,
    pollPage: 3
  },
  mutations: {
    setRoles: (state, payload) => {
      state.roles = payload
    },
    setUser: (state) => {
      state.user = JSON.parse(localStorage.getItem('user'))
    },
    setToken: (state) => {
      state.userToken = JSON.parse(localStorage.getItem('userToken'))
    },
    setPolls: (state, payload) => {
      state.polls = payload
    },
    setpollPage: (state) => {
      state.pollPage += 1
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
    async login({ state }, { email, password }) {
      state.loginError = null
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
    async getPolls({ commit }, { pollPage }) {
      try {
        await axios.get(process.env.VUE_APP_BASE_URL + process.env.VUE_APP_POLLLIST_API + pollPage).then(res => {
          commit('setPolls', res.data.rows)
        })
      } catch (error) {
        console.log(error)
      }
    },

    //for adding poll
    async addPoll({ state }, { title, options }) {
      try {
        await axios.post(process.env.VUE_APP_BASE_URL + process.env.VUE_APP_POLLADD_API,
          {
            title: title,
            options: options
          }, {
          headers: {
            'token': state.userToken
          }
        })
      } catch (error) {
        console.log(error)
      }
    },

    //for delteing poll 
    async deletePoll({ state }, { pollId }) {
      try {
        await axios.delete(process.env.VUE_APP_BASE_URL + process.env.VUE_APP_DELETEPOLL_API + pollId)
      } catch (error) {
        console.log(error, state.pollId)
      }
    }
  },
})

export default store