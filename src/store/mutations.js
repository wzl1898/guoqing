// import * as types from './mutation-types'

const mutations = {
  // [types.SET_BARRAGE_LIST] (state, barrageList) {
  //   state.barrageList = barrageList
  // }
  SETUSER(state, val) {
    state.user = val;
  },
  SETTOKEN(state, val) {
    state.token = val;
  }
}

export default mutations
