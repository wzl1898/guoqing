import request from '@utils/request'

export function getmenu () {
  return request({
    url: '/api/user/current/menus/treeData',
    method: 'get'
  })
}

export function readUser (params) {
  return request({
    url: '/api/user/list',
    params: params,
    method: 'get'
  })
}

export function adduser (params) {
  return request({
    url: '/api/user',
    data: params,
    method: 'post'
  })
}
export function rolelist () {
  return request({
    url: '/api/user/current/roles',
    params: {},
    method: 'get'
  })
}

export function getroles (id) {
  return request({
    url: `/api/user/${id}/roles`,
    params: {},
    method: 'get'
  })
}

export function getUser (id) {
  return request({
    url: `/api/user/${id}`,
    params: {},
    method: 'get'
  })
}
export function editUser (id, params) {
  return request({
    url: `/api/user/${id}`,
    data: params,
    method: 'put'
  })
}
export function deluser (id) {
  return request({
    url: `/api/user/${id}`,
    params: {},
    method: 'delete'
  })
}

export function readrole (params) {
  return request({
    url: '/api/system/role/open/list',
    params: params,
    method: 'get'
  })
}
export function roledict (type = 'data_scope') {
  return request({
    url: '/api/system/dictionary/list',
    params: {
      type
    },
    method: 'get'
  })
}
export function addrole (params) {
  return request({
    url: '/api/system/role',
    data: params,
    method: 'post'
  })
}
export function assignrole (id) {
  return request({
    url: `/api/system/role/${id}/users/page`,
    params: {},
    method: 'get'
  })
}
export function userrole (uid, rid) {
  return request({
    url: `/api/user/${uid}/role/${rid}`,
    params: {},
    method: 'delete'
  })
}

export function assign (id, userIds) {
  return request({
    url: `/api/system/role/${id}/assign`,
    data: userIds,
    method: 'post'
  })
}

export function delrole (id) {
  return request({
    url: `/api/system/role/${id}`,
    params: {},
    method: 'delete'
  })
}
export function getrole (id) {
  return request({
    url: `/api/system/role/${id}`,
    params: {},
    method: 'get'
  })
}
export function updaterole (id, params) {
  return request({
    url: `/api/system/role/${id}`,
    data: params,
    method: 'put'
  })
}

export function readlog (params) {
  return request({
    url: '/api/system/test/systemLog',
    params: params,
    method: 'get'
  })
}

export function readdict (params) {
  return request({
    url: '/api/system/dictionary/list',
    params: params,
    method: 'get'
  })
}
export function createdict (params) {
  return request({
    url: '/api/system/dictionary',
    data: params,
    method: 'post'
  })
}
export function updatedict (id, params) {
  return request({
    url: `/api/system/dictionary/${id}`,
    data: params,
    method: 'put'
  })
}

export function getdict (id) {
  return request({
    url: `/api/system/dictionary/${id}`,
    params: {},
    method: 'get'
  })
}
export function deldict (id) {
  return request({
    url: `/api/system/dictionary/${id}`,
    params: {},
    method: 'delete'
  })
}
export function office (type, id = 1) {
  return request({
    url: `/api/system/office/${id}/treeData?type=${type}`,
    method: 'get'
  })
}
