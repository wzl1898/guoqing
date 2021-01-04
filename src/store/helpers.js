import { mapState, mapGetters, mapActions } from 'vuex'

export const authComputed = {
  ...mapState('auth', {
    currentUser: (state) => state.currentUser
  }),
  ...mapState('stateRouting', {
    currentRouting: (state) => state.currentRouting
  }),

  ...mapGetters('auth', ['loggedIn'])
}

export const authMethods = mapActions('auth', ['logIn', 'logOut', 'refresh'])
export const stateRoutingMethods = mapActions('stateRouting', [
  'stateRoutingMethods'
])
