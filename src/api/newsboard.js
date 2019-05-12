import request from '@/utils/request'

export function getNewsboardIndex() {
  return request({
    url: '/newsboard',
    method: 'get'
  })
}

export function postNewsboardStore(new_post) {
  return request({
    url: '/newsboard/store',
    method: 'post',
    data: {
      description: new_post
    }
  })
}

export function pacthNewsboardEdit() {
  return request({
    url: '/newsboard',
    method: 'patch'
  })
}
