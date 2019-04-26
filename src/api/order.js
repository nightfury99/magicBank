import request from '@/utils/apirequest'

export function getActiveOrderList(from, to, query) {
  return request({
    url: `orders/all?from=${from}&to=${to}&is_errored=false&is_returned=false&is_admin_closed=false&limit=${query.limit}&page=${query.page}`,
    method: 'get'
  })
}

export function getReturnOrderList(from, to, query) {
    return request({
      url: `orders/all?from=${from}&to=${to}&is_returned=true&limit=${query.limit}&page=${query.page}`,
      method: 'get'
    })
}

export function getErrorOrderList(from, to, query) {
    return request({
      url: `orders/all?from=${from}&to=${to}&is_errored=true&limit=${query.limit}&page=${query.page}`,
      method: 'get'
    })
}

export function getAdminOrderList(from, to, query) {
    return request({
      url: `orders/all?from=${from}&to=${to}&is_admin_closed=true&limit=${query.limit}&page=${query.page}`,
      method: 'get'
    })
}

export function getOrderCount(from, to) {
    return request({
      url: `orders/count?from=${from}&to=${to}`,
      method: 'get'
    })
}

export function setCloseOrder(orderId) {
    return request({
      url: `orders/${orderId}/close/force`,
      method: 'post'
    })
}
