import request from '@/utils/apirequest'
import qs from 'qs'

export function getWallet(user_id) {
  return request({
    url: 'wallet/' + user_id,
    method: 'get'
  })
}

export function getWalletsCount() {
  return request({
    url: 'wallet/transactions/count',
    method: 'get'
  })
}

export function updateWallet(user_id, opt) {
    return request({
      url: `wallet/${user_id}`,
      method: 'post',
      data: qs.stringify(opt)
    })
  }