import request from '@/utils/request'
import qs from 'qs'

export function getQuestionIndex(query) {
  return request({
    url: `/kyc/question?page=${query.page}`,
    method: 'get'
  })
}

export function getQuestionAll() {
  return request({
    url: `/kyc/question/no-paginate`,
    method: 'get'
  })
}

export function getQuestionShow(questionId) {
  return request({
    url: `/kyc/question/${questionId}`,
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
export function putQuestion(question) {
  return request({
    url: `/kyc/question/${question.id}`,
    method: 'put',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(question)
  })
}
export function deleteQuestion(id) {
  return request({
    url: `/kyc/question/${id}`,
    method: 'delete'
  })
}
