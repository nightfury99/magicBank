import request from '@/utils/request'
import qs from 'qs'

export function getCustomers(query) {
  return request({
    url: `/customers?page=${query.page}`,
    method: 'get'
  })
}

export function createCustomer(param) {
  return request({
    url: '/customers',
    method: 'post',
    data: param,
  })
}

export function searchCustomer(q) {
  return request({
    url: '/customers/search',
    method: 'post',
    data: {
      query: q,
    },
  })
}
