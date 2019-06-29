import request from '@/utils/request'

export function sendAnswer(data) {
  return request({
    url: '/kyc/answer',
    method: 'post',
    data
  })
}
