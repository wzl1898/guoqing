import request from '@utils/request'

export function getMenuTreeTable (id = 1) {
  return request({
    url: `/api/system/menu/${id}/treeData`,
    method: 'GET',
    data: null
  })
}

export function createMenu (resouce) {
  return request({
    url: '/api/system/menu',
    data: resouce,
    method: 'post'
  })
}

export function getMenuInfo (id) {
  return request({
    url: `/api/system/menu/${id}`,
    method: 'GET',
    data: null
  })
}

export function updataMenu (id, resouce) {
  return request({
    url: `/api/system/menu/${id}`,
    data: resouce,
    method: 'put'
  })
}

export function deleteMenu (id) {
  return request({
    url: `/api/system/menu/${id}`,
    method: 'DELETE',
    params: {}
  })
}

// POST /api/system/test/systemLog      创建系统日志
export function systemLog (params) {
  return request({
    url: '/api/system/test/systemLog',
    method: 'post',
    params: params
  })
}
