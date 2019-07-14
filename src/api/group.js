import request from '@/utils/request'

export function fetchGroup(query) {
  return request({
    url: '/groups',
    method: 'get',
    params: query
  })
}

export function showGroup(id) {
  return request({
    url: `/groups/${id}`,
    method: 'get'
  })
}

export function createGroup(name) {
  return request({
    url: '/groups',
    method: 'post',
    data: { name }
  })
}

export function deleteGroup(id) {
  return request({
    url: `/groups/${id}`,
    method: 'delete'
  })
}

export function addUser(groupId, userId) {
  return request({
    url: `/groups/${groupId}/add-user`,
    method: 'put',
    data: { user_id: userId }
  })
}
