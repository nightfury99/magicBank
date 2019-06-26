import request from '@/utils/request'

export function getType() {
  return request({
    url: '/kyc/type',
    method: 'get'
  })
}
