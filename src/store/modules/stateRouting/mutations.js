export default {
  SET_ROUTING (state, newValue) {
    state.currentRouting = newValue
    saveState('stateRouting.currentRouting', newValue)
  }
}

function saveState (key, state) {
  window.localStorage.setItem(key, JSON.stringify(state))
}
