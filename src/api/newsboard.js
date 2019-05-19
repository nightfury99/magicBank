import request from '@/utils/request'

export function getNewsboardIndex(query) {
  return request({
    url: `/newsboard/all?page=${query.page}`,
    method: 'get'
  })
}

export function getNewsboardFavourite(query) {
  return request({
    url: `/newsboard/favourite/all?page=${query.page}`,
    method: 'get'
  })
}

export function deleteNewsboard(id) {
  return request({
    url: `/newsboard/${id}/delete`,
    method: 'delete'
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
