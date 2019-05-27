import request from '@/utils/request'

export function getAssignments(query) {
  return request({
    url: `/assignment/all?page=${query.page}`,
    method: 'get'
  })
}

export function createAssignment(param) {
  return request({
    url: '/assignment/store',
    method: 'post',
    data: param,
  })
}

export function getUsers() {
  return request({
    url: '/user/all',
    method: 'get'
  })
}