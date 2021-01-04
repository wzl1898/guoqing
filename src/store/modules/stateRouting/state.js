export const state = {
  currentRouting: getSavedState('stateRouting.currentRouting')
}

function getSavedState (key) {
  if (window.localStorage.getItem(key) !== 'undefined') {
    return JSON.parse(window.localStorage.getItem(key))
  }
}

export default state
