import Vue from 'vue'
import Vuex from 'vuex'
import {logs, resolutions, agents} from './data'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
      resolutions: resolutions,
      agents: agents,
      logs: logs,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

export default store;
