import request from '@/utils/request'

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
