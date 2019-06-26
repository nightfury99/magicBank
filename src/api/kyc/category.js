import request from '@/utils/request'

export function getCategory() {
  return request({
    url: `/kyc/category`,
    method: 'get'
  })
}
