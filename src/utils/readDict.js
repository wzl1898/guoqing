import request from '@utils/request'
export function readDict (type) {
  return request({
    url: '/api/system/dictionary?type=' + type,
    method: 'get'
  })
}
