import request from '@/utils/request'

export function fetchBranch(query) {
  return request({
    url: '/branch/all',
    method: 'get',
    params: query
  })
}

export function getBranch() {
  return request({
    url: '/branch/all',
    method: 'get',
  })
}

export function createBranch(data) {
  return request({
    url: '/branch/store',
    method: 'post',
    data
  })
}

export function updateBranch(data) {
  return request({
    url: `/branch/${data.id}/update`,
    method: 'post',
    data
  })
}
