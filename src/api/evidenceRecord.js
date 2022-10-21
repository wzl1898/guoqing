import * as all from '@/utils'
import store from '../store'
const request = all.request

export function getData (status) {
  if (status != -1)
  {
    return request({
      url: '/lic/record/v1.0/list',
      method: 'get',
      params: {
        leaderId: store.state.user.id,
        status: status
      }
    })
  }else{
    return request({
      url: '/lic/record/v1.0/list',
      method: 'get',
      params: {
        leaderId: store.state.user.id
      }
    })
  }

}
