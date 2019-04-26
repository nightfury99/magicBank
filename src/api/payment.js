import request from '@/utils/apirequest'

export function getDepositList(from, to, is_completed, query) {
  return request({
    url: `payments/deposit?from=${from}&to=${to}&is_completed=${is_completed}&limit=${query.limit}&page=${query.page}`,
    method: 'get'
  })
}

export function getReloadList(from, to, is_completed, query) {
    return request({
        url: `payments/reload?from=${from}&to=${to}&is_completed=${is_completed}&limit=${query.limit}&page=${query.page}`,
        method: 'get'
    })
}

export function getPromoList(from, to, query) {
    return request({
        url: `payments/promo?from=${from}&to=${to}&limit=${query.limit}&page=${query.page}`,
        method: 'get'
    })
}

export function getDepositCount(from, to) {
    return request({
        url: `payments/deposit/count?from=${from}&to=${to}`,
        method: 'get'
    })
}

export function getPromoCount(from, to) {
    return request({
        url: `payments/promo/count?from=${from}&to=${to}`,
        method: 'get'
    })
}

export function getReloadCount(from, to) {
    return request({
        url: `payments/reload/count?from=${from}&to=${to}`,
        method: 'get'
    })
}