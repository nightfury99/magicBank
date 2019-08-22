import request from '@/utils/request'
import qs from 'qs'

export function getExpertiseIndex(query) {
  return request({
    url: `/expertises?page=${query.page}`,
    method: 'get'
  })
}

export function getExpertiseShow(expertiseId) {
  return request({
    url: `/expertises/${expertiseId}`,
    method: 'get'
  })
}

export function getExpertise() {
  return request({
    url: '/expertises',
    method: 'get'
  })
}

export function updateExpertise(data) {
  return request({
    url: '/expertises',
    method: 'put',
    data: qs.stringify(data)
  })
}

export function createExpertise(data) {
  return request({
    url: '/expertises',
    method: 'post',
    data: data
  })
}
  
export function deleteExpertise(id) {
  return request({
    url: `/expertises/${id}`,
    method: 'delete'
  })
}

export function searchExpertise(data) {
  return request({
    url: `/expertises/search`,
    method: 'post',
    data: {
      query: data
    }
  })
}
