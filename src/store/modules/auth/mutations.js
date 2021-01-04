import { request, silenceRequest } from '@utils/request'

export default {
  SET_CURRENT_USER (state, newValue) {
    state.currentUser = newValue
    saveState('auth.currentUser', newValue)
    setDefaultAuthHeaders(state)
  }
}

function saveState (key, state) {
  window.localStorage.setItem(key, JSON.stringify(state))
}

function setDefaultAuthHeaders (state) {
  const token = state.currentUser ? state.currentUser.access_token : ''
  request.defaults.headers.common['Access-Token'] = token
  silenceRequest.defaults.headers.common['Access-Token'] = token
}
