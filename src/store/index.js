import { createStore } from 'vuex'
import axios from 'axios'
// import { v4 } from 'uuid'

const store = createStore({
  state: {
    role:null,
    user: null,
    polls: null,
    poll: null
  },
  mutations: {
    setRole: (state ,payload) => {
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
    async getRole(){
      try {
        const res = await axios.get("https://pollapi.innotechteam.in/role/list")
        const data = res.data
        store.commit('setRole',data)   
      } catch (error) {
        console.log(error)
      }
    },

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