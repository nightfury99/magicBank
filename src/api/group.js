import request from '@/utils/authrequest'
import qs from 'qs'

export function getGroups() {
    return request({
        url: '/group',
        method: 'get'
    })
}

export function getUserGroups(id) {
    return request({
        url: `/group?user=${id}`,
        method: 'get'
    })
}

export function getUsersGroupOutlet() {
    return request({
        url: '/group/5c8ed7028d767d7d573e7322',
        method: 'get'
    })
}

export function getUsersGroupAgent() {
    return request({
        url: '/group/5c8ed6ee8d767d7d573e7321',
        method: 'get'
    })
}