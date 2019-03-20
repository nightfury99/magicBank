import request from '@/utils/apirequest'

export function getRevenueOutlet(outlet_id, from, to) {
  return request({
    url: 'revenues/outlet/' + outlet_id + "?from=" + from + '&to=' + to,
    method: 'get'
  })
}

export function getRevenueBranch(branch_id, from, to) {
  return request({
    url: 'revenues/branch/' + branch_id + "?from=" + from + '&to=' + to,
    method: 'get'
  })
}