import request from '@/utils/request'

export function getQuestionIndex(query) {
  return request({
    url: `/kyc/question?page=${query.page}`,
    method: 'get'
  })
}

export function getQuestionSet(type, section) {
  return request({
    url: `/kyc/question-set/${type}/${section}`,
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
