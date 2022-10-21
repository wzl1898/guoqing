import * as all from '@/utils'
const request = all.request

export function getData (id) {
  console.log("apdsadias")
  return request({
    url: '/lic/process/v1.0/getProcess/' + id,
    method: 'get',
  })
}
