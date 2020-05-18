import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    overlay: false
  },
  mutations: {
    SET_OVERLAY (state, payload) {
      state.overlay = payload
    }
  },
  actions: {
    setOverlay (context, payload) {
      context.commit('SET_OVERLAY', payload)
    }
  }
  // getters: {
  //   overlay: state => {
  //     return state.overlay
  //   }
  // }
})
