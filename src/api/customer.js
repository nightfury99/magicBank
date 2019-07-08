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

export function getCallLog(customerId) {
  return request({
    url:`/customers/${customerId}/call-logs`,
    method: 'get'
  })
}

export function getPicContact(customerId) {
  return request({
    url:`/customers/${customerId}/pic-contacts`,
    method: 'get'
  })
}


