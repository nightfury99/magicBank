import request from '@/utils/request'
import qs from 'qs'

export function getNewsboardIndex(query) {
  return request({
    url: `/newsboards?page=${query.page}`,
    method: 'get'
  })
}

export function getNewsboardFavourite(query) {
  return request({
    url: `/newsboards/${query.newsboardId}/favourite?page=${query.page}`,
    method: 'get'
  })
}

export function deleteNewsboard(id) {
  return request({
    url: `/newsboards/${id}`,
    method: 'delete'
  })
}

export function postNewsboardStore(new_post) {
  return request({
    url: '/newsboards',
    method: 'post',
    data: {
      description: new_post
    }
  })
}

export function updateNewsboard(data) {
  return request({
    url: '/newsboards',
    method: 'put',
    data: qs.stringify(data)
  })
}
