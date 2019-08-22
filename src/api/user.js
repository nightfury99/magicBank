import request from '@/utils/request'
import qs from 'qs'

export function getUserIndex(query) {
  return request({
    url: `/users?page=${query.page}`,
    method: 'get'
  })
}

export function getUserShow(userId) {
  return request({
    url: `/users/${userId}`,
    method: 'get'
  })
}

export function getUsers() {
  return request({
    url: '/users',
    method: 'get'
  })
}

export function getRoleIndex() {
  return request({
    url: '/role',
    method: 'get'
  })
}

export function putUser(user) {
  return request({
    url: `/users/${user.id}`,
    method: 'put',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify({
      password: user.password

    })
  })
}

export function postUserStore(new_user) {
  return request({
    url: '/users',
    method: 'post',
    data: {
      email: new_user.email
    }
  })
}

export function deleteUser(id) {
  return request({
    url: `/users/${id}`,
    method: 'delete'
  })
}

export function searchUser(data) {
  return request({
    url: `/users/search`,
    method: 'post',
    data: {
      query: data
    }
  })
}
