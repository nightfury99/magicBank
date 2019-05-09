import request from '@/utils/request'

export function getNewsboardIndex() {
  return request({
    url: '/newsboard',
    method: 'get'
  })
}

export function postNewsboardStore() {
  return request({
    url: '/newsboard',
    method: 'post'
  })
}

export function pacthNewsboardEdit() {
  return request({
    url: '/newsboard',
    method: 'patch'
  })
}
