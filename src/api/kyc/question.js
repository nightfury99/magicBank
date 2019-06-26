import request from '@/utils/request'

export function createQuestion(data) {
  return request({
    url: '/kyc/question',
    method: 'post',
    data
  })
}