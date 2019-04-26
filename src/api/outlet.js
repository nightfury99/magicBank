import request from '@/utils/apirequest'

export function getOutlets() {
  return request({
    url: '/outlets?limit=1000',
    method: 'get'
  })
}

export function getOutlet(outlet_id) {
  return request({
    url: `/outlet/${outlet_id}`,
    method: 'get'
  })
}

export function getOutletBranches(outlet_id) {
  return request({
    url: `/outlets/${outlet_id}/branches`,
    method: 'get'
  })
}

export function getBranchAgent(user_id) {
  return request({
    url: `/branch/agent/${user_id}`,
    method: 'get'
  })
}