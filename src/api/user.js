import request from '@/utils/authrequest'
import qs from 'qs'

export function getUsers() {
    return request({
        url: '/user?_limit=3000',
        method: 'get'
    })
}

export function getUser(id) {
    return request({
        url: `/user/${id}`,
        method: 'get'
    })
}

export function updateUser(id, opt) {
    return request({
        url: `/user/${id}`,
        method: 'put',
        data: qs.stringify(opt)
    })
}

export function setUserOutlet(userId, outletId) {

    return request({
        url: '/useroutlet',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify({
            user: userId,
            outlet_id: outletId
        })
    })
}

export function removeUserOutlet(userOutletId) {
    
    return request({
        url: `/useroutlet/${userOutletId}`,
        method: 'delete'
    })
}