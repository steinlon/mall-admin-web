import request from '@/utils/request'

export function apiDocs() {
  return request({
    url: '/v2/api-docs',
    method: 'get'
  })
}
