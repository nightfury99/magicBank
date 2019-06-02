import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: {
      email: username,
      password: password
    }
  })
}

export function getInfo() {
  return request({
    url: 'users/me',
    method: 'get'
  })
}

export function logout() {
  // return request({
  //   url: '/user/logout',
  //   method: 'post'
  // })
}
