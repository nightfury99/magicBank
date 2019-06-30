import request from '@/utils/request'
import qs from 'qs'

export function getQuestionIndex(query) {
  return request({
    url: `/kyc/question?page=${query.page}`,
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
    data: qs.stringify({
      question: {
        field_name: question.field_name,
        display_text: question.display_text,
        section: question.section,
        description: question.description,
        origin: question.origin,
        category_id: question.category_id,
        type_id: question.type_id,
        default_data: question.default_data,
        only_default: question.only_default,
        input_type: question.input_type,
        fields: question.fields,
        is_hidden: question.is_hidden,
        is_mandatory: question.is_mandatory
      }

    })
  })
}
export function deleteQuestion(id) {
  return request({
    url: `/kyc/question/${id}`,
    method: 'delete'
  })
}
