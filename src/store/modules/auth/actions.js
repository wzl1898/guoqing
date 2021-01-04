import { login, tokenRefresh } from '@api/login'
import router from '@router/index'

export const logIn = ({ commit, dispatch, getters }, { username, password } = {}) => {
  // if (getters.loggedIn) return dispatch('validate')
  return login(username, password).then((data) => {
    const user = data.item.token
    const id = data.item.user.id
    const userInfo = data.item.user
    localStorage.setItem('id', id)
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    commit('SET_CURRENT_USER', user)
    return user
  })
}

export const logOut = ({ commit }) => {
  commit('SET_CURRENT_USER', null)
  window.localStorage.setItem('stateRouting.currentRouting', null)
  window.localStorage.setItem('userInfo', null)
  // debugger
}

export const refresh = ({ commit, state }) => {
  if (!state.currentUser) return Promise.resolve(null)
  return tokenRefresh(state.currentUser.refresh_token)
    .then((data) => {
      const user = data.item.token
      commit('SET_CURRENT_USER', user)
      return user
    })
    .catch((error) => {
      // 发生任何异常直接跳转到登录界面
      commit('SET_CURRENT_USER', null)
      router.push({
        name: 'login',
        query: {
          redirectFrom: router.currentRoute.path,
          time: Date.now()
        }
      })
      return Promise.reject(error)
    })
}
