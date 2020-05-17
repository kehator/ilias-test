import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nav: false
  },
  mutations: {
    TOGGLE_NAV (state) {
      state.nav = !state.nav
    }
  },
  actions: {
    toggleNav (context) {
      context.commit('TOGGLE_NAV')
    }
  }
  // getters: {
  //   nav: state => {
  //     return state.nav
  //   }
  // }
})
