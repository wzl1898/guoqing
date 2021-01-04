import request from '@utils/request'

export function login (username, password) {
  // return request.post('/api/session', { username, password })
  return request.post('/api/login', null, { params: { username, password } })
}

export function tokenRefresh (refreshToken) {
  return request.post('/api/token/refresh', null, {
    params: { refreshToken }
  })
}
