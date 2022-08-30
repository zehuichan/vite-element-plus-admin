import request from '@/api/request'

export function menu() {
  return request({
    url: '/sys/menu',
    method: 'get'
  })
}
