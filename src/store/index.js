import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    roles: null,
    user: null,
    polls: [],
    poll: null,
    signupError: null,
    signErr: null,
    loginError: null,
    scrollState: true,
    pollPage: 1,
    pollLimit: 3,
    titleUpdateErr: null,
    optionId: [],
    countState: JSON.parse(localStorage.getItem('optionId'))
  },
  mutations: {
    setRoles: (state, payload) => {
      state.roles = payload
    },
    setUser: (state) => {
      state.user = JSON.parse(localStorage.getItem('user'))
    },
    setPolls: (state, payload) => {
      state.polls = state.polls.concat(payload)
    },
    setCountState: (state) => {
      if (state.countState) {
        for (let i = 0; i < state.countState.length; i++) {
          for (let j = 0; j < state.polls.length; j++) {
            for (let k = 0; k < state.polls[j].optionList.length; k++) {
              if (state.polls[j].optionList[k].id == state.countState[i]) {
                state.polls[j].optionList[k].isState = true
              }
            }
          }
        }
      }
    },
    filterPolls: (state, payload) => {
      state.polls = state.polls.filter(poll => {
        return poll.id != payload
      })
    },
    setPollPage: (state) => {
      state.pollPage += 1
    },
    setPoll: (state, payload) => {
      state.poll = payload
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
    async login({ state, commit }, { email, password }) {
      state.loginError = null
      try {
        await axios.post(`${process.env.VUE_APP_BASE_URL}user/login`,
          { email: email, password: password }).then(res => {
            localStorage.setItem('userToken', JSON.stringify(res.data.token))
            localStorage.setItem('user', JSON.stringify(res.data.user))
            state.loginError = null
          })
        commit('setUser')
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
              commit('setCountState')
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
    },

    //for getting single poll
    async getSinglePoll({ commit }, { pollId }) {
      try {
        await axios.get(`${process.env.VUE_APP_BASE_URL}poll/${pollId}`)
          .then(res => {
            commit('setPoll', res.data)
          })
      } catch (error) {
        console.log(error)
      }
    },

    //for updating poll title
    async updatePollTitle({ state }, { title, createdBy, pollId }) {
      try {
        await axios.put(`${process.env.VUE_APP_BASE_URL}poll/${pollId}`, {
          title: title,
          createrBy: createdBy
        })
      } catch (error) {
        console.log(error, state.pollLimit)
      }
    },

    //for votecount
    async countVote({ state }, { keyA }) {
      if (localStorage.getItem('optionId')) {
        state.optionId = JSON.parse(localStorage.getItem('optionId'))
      } else {
        state.optionId = [keyA]
      }
      try {
        await axios.post(`${process.env.VUE_APP_BASE_URL}vote/count`, {
          optionId: keyA
        })
        if (!state.optionId.includes(keyA)) {
          state.optionId.push(keyA)
        }
        localStorage.setItem('optionId', JSON.stringify(state.optionId))
        console.log(state.polls)
      } catch (error) {
        console.log(error, state.pollLimit)
      }
    },

    //delete poll option
    async deletePollOpt({ state }, { optId }) {
      try {
        await axios.delete(`${process.env.VUE_APP_BASE_URL}option/delete/${optId}`)
      } catch (error) {
        console.log(error, state.pollPage)
      }
    },

    //update poll option
    async updatePollOpt({ state }, { optId, title }) {
      try {
        await axios.put(`${process.env.VUE_APP_BASE_URL}option/edit/${optId}`, {
          optionTitle: title
        })
      } catch (error) {
        console.log(error, state.pollPage)
      }
    }
  },
})

export default store