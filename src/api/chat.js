import request from '@/utils/request'
import qs from 'qs'

export function getChat() {
  return request({
    url: '/chat',
    method: 'get'
  })
}

// export function getChatShow(chatId) {
//   return request({
//     url: `/chat/${chatId}`,
//     method: 'get'
//   })
// }

export function createChat(user_id) {
  return request({
    url: '/chat/create',
    method: 'post',
    data: qs.stringify({
      user_id
    })
  })
}

export function sendChatMessage(conversation_id, message) {
  return request({
    url: '/chat/send',
    method: 'post',
    data: qs.stringify({
      message,
      conversation_id
    })
  })
}
