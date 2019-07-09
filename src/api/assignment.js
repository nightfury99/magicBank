import request from '@/utils/request'

export function getAssignments(query) {
  return request({
    url: `/assignments?page=${query.page}`,
    method: 'get'
  })
}

export function createAssignment(param) {
  return request({
    url: '/assignments',
    method: 'post',
    data: param,
  })
}

export function getUsers() {
  return request({
    url: '/users',
    method: 'get'
  })
}

export function addComment(id, query) {
  return request({
    url: `/assignments/${id}/comment`,
    method: 'post',
    data: {
      body: query.body
    }
  })
}

export function toggleStatus(id, query) {
  return request({
    url: `/assignments/${id}/status`,
    method: 'post',
    data: {
      status: query.status
    }
  })
}
