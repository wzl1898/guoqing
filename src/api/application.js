
import * as all from '@/utils'
const request = all.request

export function getData (status) {
  if(status == -1){
    return request({
      url: '/lic/approval/v1.0/list',
      method: 'get',
    })
  }else{
    return request({
      url: '/lic/approval/v1.0/list',
      method: 'get',
      params: {
        status: status
      }
    })
  }

}
