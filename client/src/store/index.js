import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    user: {},
    role: '',
    authToken: ''
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
