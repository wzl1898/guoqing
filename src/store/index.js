import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})


export default new Vuex.Store({
  namespaced: true,
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger(),vuexLocal.plugin] : [vuexLocal.plugin]
})
