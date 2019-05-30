import request from '@/utils/request'
import qs from 'qs'

export function getUserIndex(query) {
  return request({
    url: `/user/all?page=${query.page}`,
    method: 'get'
  })
}

export function getUserShow(userId) {
  return request({
    url: `/user/${userId}`,
    method: 'get'
  })
}

export function getRoleIndex() {
  return request({
    url: '/role/all',
    method: 'get'
  })
}

export function getBranchIndex() {
  return request({
    url: '/branch/all',
    method: 'get'
  })
}

export function putUser(user) {
  return request({
    url: `/user/${user.id}/update`,
    method: 'put',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify({
      name: user.name,
      phone_no: user.phone_no,
      nickname: user.nickname,
      email: user.email,
      role_id: user.role_id,
      branch_id: user.branch_id,
      is_active: user.status

    })
  })
}

export function postUserStore(new_user) {
  return request({
    url: '/user/create',
    method: 'post',
    data: {
      name: new_user.name,
      email: new_user.email,
      role_id: new_user.role_id,
      branch_id: new_user.branch_id
    }
  })
}

export function deleteUser(id) {
  return request({
    url: `/user/${id}/delete`,
    method: 'delete'
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