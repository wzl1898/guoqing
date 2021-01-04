import { getmenu } from '@/api/table'

export const SetRouting = context => {
  return getmenu().then((data) => {
    const routingData = data
    if (routingData) {
      context.commit('SET_ROUTING', routingData)
      return data
    }
  })
}
