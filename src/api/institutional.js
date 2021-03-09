import request from '@utils/request'

export function getInstitutional (id = 1) {
  return request({
    url: `/api/system/office/${id}/treeData`,
    method: 'GET',
    data: null
  })
}

export function getInstitutionalType (typeRes) {
  return request({
    url: `/api/system/dictionary?type=${typeRes}`,
    method: 'GET'
  })
}

export function getInstitutionalLevel (LevelRes) {
  return request({
    url: `/api/system/dictionary?type=${LevelRes}`,
    method: 'GET'
  })
}

export function addInstitutional (source) {
  return request({
    url: '/api/system/office',
    method: 'POST',
    data: source
  })
}

export function getInstitutionalInfo (id) {
  return request({
    url: `/api/system/office/${id}`,
    method: 'GET'
  })
}

export function updataInstitutional (id, source) {
  return request({
    url: `/api/system/office/${id}`,
    data: source,
    method: 'PUT'
  })
}

export function deleteInstitutional (id) {
  return request({
    url: `/api/system/office/${id}`,
    method: 'DELETE',
    params: {}
  })
}

export function getRegion (id = 1) {
  return request({
    url: `/api/system/area/${id}/treeData`,
    method: 'GET',
    data: null
  })
}

export function getRegionType (typeRes) {
  return request({
    url: `/api/system/dictionary?type=${typeRes}`,
    method: 'GET'
  })
}

export function addRegion (source) {
  return request({
    url: '/api/system/area',
    method: 'POST',
    data: source
  })
}

export function getRegionInfo (id) {
  return request({
    url: `/api/system/area/${id}`,
    method: 'GET',
    data: null
  })
}

export function updataRegion (id, source) {
  return request({
    url: `/api/system/area/${id}`,
    data: source,
    method: 'PUT'
  })
}

export function deleteRegion (id) {
  return request({
    url: `/api/system/area/${id}`,
    method: 'DELETE',
    params: {}
  })
}

/**
 * 根据类型，获取对应的字典表
 * @param {string} type 字典类型
 */
export function getDictionaryListByType (type) {
  return request({
    url: `/api/system/dictionary/${type}/list`,
    method: 'GET'
  })
}
