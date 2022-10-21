// import * as types from './mutation-types'

// export const addBarrageList = ({ commit, state }, barrageInfo) => {
//   const list = lang.cloneDeep(state.barrageList)
//   const newList = list.filter(item => !item.isEnd)
//   newList.push(barrageInfo)
//   commit(types.SET_BARRAGE_LIST, newList)
// }
export default {
  setUser(context, val){
    context.commit("SETUSER", val);
  },
  setToken(context, val){
    context.commit("SETTOKEN", val);
  }
}
