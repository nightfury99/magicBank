import request from '@/utils/request'
import qs from 'qs'

export function getLanguageIndex(query) {
  return request({
    url: `/language?page=${query.page}`,
    method: 'get'
  })
}

export function getLanguageShow(languageId) {
  return request({
    url: `/language/${languageId}`,
    method: 'get'
  })
}

export function getLanguage() {
  return request({
    url: '/language',
    method: 'get'
  })
}

export function updateLanguage(data) {
  return request({
    url: '/language',
    method: 'put',
    data: qs.stringify(data)
  })
}

export function createLanguage(data) {
  return request({
    url: '/language',
    method: 'post',
    data: data
  })
}
  
export function deleteLanguage(id) {
  return request({
    url: `/language/${id}`,
    method: 'delete'
  })
}

export function searchLanguage(data) {
  return request({
    url: `/language/search`,
    method: 'post',
    data: {
      query: data
    }
  })
}
