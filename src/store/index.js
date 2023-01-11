import { createStore } from 'vuex'
import { v4 } from 'uuid'

const store = createStore({
  state: {
    user: null,
    polls: [
      {
          title: "first Poll",
          options: [{ option: 'opt1', vote: 0 }, { option: 'opt2', vote: 4 }, { option: 'opt3', vote: 5 }, { option: 'opt4', vote: 9 }],
          id: v4()
      },
      {
          title: "second Poll",
          options: [{ option: 'opt1', vote: 7 }, { option: 'opt2', vote: 6 }, { option: 'opt3', vote: 4 }, { option: 'opt4', vote: 2 }],
          id: v4()
      },
      {
          title: "third Poll",
          options: [{ option: 'opt1', vote: 6 }, { option: 'opt2', vote: 2 }, { option: 'opt3', vote: 4 }, { option: 'opt4', vote: 3 }],
          id: v4()
      }
  ]
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload
      console.log("user state changed", state.user)
    },
    countVote: (state, {keyA , keyB}) => {
      state.polls[keyB].options[keyA].vote += 1
    }
  },
  actions: {

    //for login

    // try {
    //   const res = await axios.post("https://secure-refuge-14993.herokuapp.com/login?username=admin&password=admin")
    //   const data = res.data
    //   data.map(dat => {
    //     if (username == dat.username && password == dat.password) {
    //       commit('setUser', { username, password })
    //       console.log('user logged in')
    //     }
    //     else {
    //       throw new Error('user not registered')
    //     }
    //   })
    // } catch (error) {
    //   console.log(error)

    // }

    //sigin api
    signup: ({ commit }, { username, password, role, id }) => {
      console.log("user signed in")
      commit('setUser', { username, password, role, id })
    }
  },
})

export default store