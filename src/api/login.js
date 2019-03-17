import request from '@/utils/authrequest'

export function login(username, password) {
  return request({
    url: '/auth/local',
    method: 'post',
    data: {
      'identifier': username,
      'password': password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/me',
    method: 'get'
  })
}

export function logout() {
  // return request({
  //   url: '/user/logout',
  //   method: 'post'
  // })
}
