import request from '@/utils/request'

export function getQuestionIndex(query) {
  return request({
    url: `/kyc/question?page=${query.page}`,
    method: 'get'
  })
}

export function createQuestion(data) {
  return request({
    url: '/kyc/question',
    method: 'post',
    data
  })
}
