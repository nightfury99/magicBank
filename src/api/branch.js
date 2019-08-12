import request from '@/utils/request'

export function fetchBranch(query) {
  return request({
    url: '/branches',
    method: 'get',
    params: query
  })
}

export function getBranch() {
  return request({
    url: '/branches',
    method: 'get'
  })
}

export function createBranch(data) {
  return request({
    url: '/branches',
    method: 'post',
    data
  })
}

export function updateBranch(data) {
  return request({
    url: `/branches/${data.id}`,
    method: 'put',
    data
  })
}
