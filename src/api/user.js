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

// export function getBranchIndex() {
//   return request({
//     url: '/branches',
//     method: 'get'
//   })
// }

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

export function searchUser(term) {
  return request({
    url: `/users/search`,
    method: 'post',
    data: {
      query: term
    }
  })
}

// export function getUsers() {
//     return request({
//         url: '/user?_limit=3000',
//         method: 'get'
//     })
// }

// export function getUser(id) {
//     return request({
//         url: `/user/${id}`,
//         method: 'get'
//     })
// }

// export function updateUser(id, opt) {
//     return request({
//         url: `/user/${id}`,
//         method: 'put',
//         data: qs.stringify(opt)
//     })
// }

// export function setUserOutlet(userId, outletId) {

//     return request({
//         url: '/useroutlet',
//         method: 'post',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         data: qs.stringify({
//             user: userId,
//             outlet_id: outletId
//         })
//     })
// }

// export function removeUserOutlet(userOutletId) {

//     return request({
//         url: `/useroutlet/${userOutletId}`,
//         method: 'delete'
//     })
// }
