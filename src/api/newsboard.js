import request from '@/utils/request'
import qs from 'qs'

export function getNewsboardIndex(query) {
  return request({
    url: `/newsboards?page=${query.page}`,
    method: 'get'
  })
}

export function getNews(id) {
  return request({
    url: `/newsboards/${id}`,
    method: 'get'
  })
}

export function getNewsboardFavourite(query) {
  return request({
    url: `/newsboards/favourites/me?page=${query.page}`,
    method: 'get'
  })
}

export function deleteNewsboard(id) {
  return request({
    url: `/newsboards/${id}`,
    method: 'delete'
  })
}

export function postNewsboardStore(data) {
  return request({
    url: '/newsboards',
    method: 'post',
    data: data
  })
}

export function updateNewsboard(data) {
  return request({
    url: '/newsboards',
    method: 'put',
    data: qs.stringify(data)
  })
}

export function addComment(query) {
  return request({
    url: `/newsboards/${query.id}/comment`,
    method: 'post',
    data: {
      body: query.body
    }
  })
}

export function deleteComment(id) {
  return request({
    url: `/newsboards/${id}/comment`,
    method: 'delete'
  })
}

export function favourite(id) {
  return request({
    url: `/newsboards/${id}/favourite`,
    method: 'get',
  })
}

export function like(id) {
  return request({
    url: `/newsboards/${id}/like`,
    method: 'get',
  })
}
