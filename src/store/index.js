import { createStore } from 'vuex'

const store = createStore({
  state: {
    user: null
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload
      console.log("user state changed", state.user)
    },
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
    signin: ({ commit }, { username, password, role, id }) => {
      console.log("user signed in")
      commit('setUser', { username, password, role, id })
    }
  },
})

export default store