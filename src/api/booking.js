import request from '@/utils/request'
import qs from 'qs'

export function getBookingIndex(query) {
  return request({
    url: `/bookings?page=${query.page}`,
    method: 'get'
  })
}

export function getBookingShow(bookingId) {
  return request({
    url: `/bookings/${bookingId}`,
    method: 'get'
  })
}

export function getBooking() {
  return request({
    url: '/bookings',
    method: 'get'
  })
}

export function updateBooking(data) {
  return request({
    url: '/bookings',
    method: 'put',
    data: qs.stringify(data)
  })
}

export function createBooking(data) {
  return request({
    url: '/bookings',
    method: 'post',
    data: data
  })
}
  
export function deleteBooking(id) {
  return request({
    url: `/bookings/${id}`,
    method: 'delete'
  })
}

export function searchBooking(data) {
  return request({
    url: `/bookings/search`,
    method: 'post',
    data: {
      query: data
    }
  })
}
