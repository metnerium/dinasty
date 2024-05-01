import { createStore } from 'vuex'

const store = createStore({
  state: {
    jwtToken: localStorage.getItem('jwtToken') || null,
  },
  mutations: {
    setJwtToken(state, token) {
      if (token === null || token === '') {
        state.jwtToken = null
        localStorage.removeItem('jwtToken')
      } else {
        state.jwtToken = token
        localStorage.setItem('jwtToken', token)
      }
    }
  }
})

export default store
