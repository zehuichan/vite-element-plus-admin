import request from '@/utils/request'

export function menu() {
  return request({
    url: '/sys/menu',
    method: 'get'
  })
}