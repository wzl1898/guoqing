import * as all from '@/utils'
const request = all.request

export function getData (status) {
  return request({
    url: '/lic/message/v1.0/list',
    method: 'get',
  })
}
