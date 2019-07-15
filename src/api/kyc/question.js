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
export function putQuestion(data) {
  return request({
    url: `/kyc/question/${data.id}`,
    method: 'put',
    data
  })
}
export function deleteQuestion(id) {
  return request({
    url: `/kyc/question/${id}`,
    method: 'delete'
  })
}
