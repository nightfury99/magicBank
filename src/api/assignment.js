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
