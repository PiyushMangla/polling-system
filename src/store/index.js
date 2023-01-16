import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    roles: null,
    polls: [],
    poll: null,
    signupError: null,
    signErr: null,
    loginError: null,
    scrollState: true,
    pollPage: 1,
    pollLimit: 3
  },
  mutations: {
    setRoles: (state, payload) => {
      state.roles = payload
    },
    setPolls: (state, payload) => {
      state.polls = state.polls.concat(payload)
    },
    filterPolls: (state, payload) => {
      state.polls = state.polls.filter(poll => {
        return poll.id != payload
      })
    },
    setPollPage: (state) => {
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
        const res = await axios.get(`${process.env.VUE_APP_BASE_URL}role/list`)
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
        await axios.post(`${process.env.VUE_APP_BASE_URL}user/register`,
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
        await axios.post(`${process.env.VUE_APP_BASE_URL}user/login`,
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
    async getPolls({ state, commit }, { pollPage }) {
      try {
        await axios.get(`${process.env.VUE_APP_BASE_URL}poll/list/${pollPage}?limit=${state.pollLimit}`)
          .then(res => {
            if (res.data.rows.length) {
              commit('setPolls', res.data.rows)
            }
            else {
              state.scrollState = false
            }
          })
      } catch (error) {
        console.log(error)
      }
    },

    //for adding poll
    async addPoll({ state }, { title, options }) {
      try {
        await axios.post(`${process.env.VUE_APP_BASE_URL}poll/add`,
          {
            title: title,
            options: options
          },)
      } catch (error) {
        console.log(error, state.pollId)
      }
    },

    //for delteing poll 
    async deletePoll({ state, commit }, { pollId }) {
      try {
        await axios.delete(`${process.env.VUE_APP_BASE_URL}poll/${pollId}`)
        commit('filterPolls', pollId)
      } catch (error) {
        console.log(error, state.pollId)
      }
    }
  },
})

export default store